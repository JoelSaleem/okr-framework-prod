import { schema } from "nexus";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Token, getUserId } from "../utils";

export const TEMP_APP_SECRET = "das29ufwej"; // TODO: MAKE SECRET A SECRET

schema.objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("email");
    t.date("createdAt");
    t.list.field("objectives", {
      type: "Objective",
      resolve(root, args, ctx) {
        return ctx.db.user
          .findOne({
            where: {
              id: root.id,
            },
          })
          ?.objectives();
      },
    });
  },
});

schema.objectType({
  name: "AuthPayload",
  definition(t) {
    t.string("token");
    t.field("user", { type: "User" });
  },
});

schema.extendType({
  type: "Query",
  definition(t) {
    t.field("users", {
      type: "User",
      nullable: false,
      list: true,
      resolve(root, args, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        return ctx.db.user.findMany();
      },
    });
  },
});

schema.extendType({
  type: "Mutation",
  definition(t) {
    t.field("signup", {
      type: "AuthPayload",
      args: {
        email: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true }),
      },
      async resolve(root, args, ctx) {
        const existingUser = await ctx.db.user.findOne({
          where: {
            email: args.email,
          },
        });

        if (existingUser) {
          throw new Error("A user with that email already exists");
        }

        const hashedPassword = await hash(args.password, 10);
        const createdUser = await ctx.db.user.create({
          data: {
            email: args.email,
            password: hashedPassword,
            createdAt: new Date(),
          },
        });

        const createdId = (await createdUser).id;
        const token: string = sign({ userId: createdId }, TEMP_APP_SECRET);

        return { user: createdUser, token: token };
      },
    });
    t.field("login", {
      type: "AuthPayload",
      args: {
        email: schema.stringArg(),
        password: schema.stringArg(),
      },
      async resolve(root, { password, email }, ctx) {
        const errMsg = "Username or password is incorrect";

        if (!email || !password) {
          throw new Error(errMsg);
        }

        const foundUser = await ctx.db.user.findOne({
          where: {
            email,
          },
        });

        if (!foundUser) {
          throw new Error(errMsg);
        }

        const isCorrectPass = await compare(password, foundUser.password);

        if (!isCorrectPass) {
          throw new Error(errMsg);
        }

        const token: string = sign({ userId: foundUser.id }, TEMP_APP_SECRET);

        delete foundUser.password;

        return {
          user: foundUser,
          token,
        };
      },
    });
  },
});
