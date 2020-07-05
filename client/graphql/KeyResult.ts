import { schema } from "nexus";
import { getUserId } from "../utils";
import { decodeBase64 } from "bcryptjs";

schema.objectType({
  name: "KeyResult",
  definition(t) {
    t.int("id");
    t.string("title");
    t.string("description");
    t.int("target");
    t.int("current");
    t.string("createdAt");
    t.field("user", {
      type: "User",
      resolve(root, args, ctx) {
        if (!root.id) {
          return null;
        }
        return ctx.db.keyResult
          .findOne({
            where: {
              id: root.id,
            },
          })
          .user();
      },
    });
    t.field("objective", {
      type: "Objective",
      resolve(root, args, ctx) {
        if (!root.id) {
          return null;
        }

        return ctx.db.keyResult
          .findOne({
            where: {
              id: root.id,
            },
          })
          .objective();
      },
    });
  },
});

schema.extendType({
  type: "Query",
  definition(t) {
    t.field("keyResults", {
      type: "KeyResult",
      nullable: false,
      list: true,
      async resolve(root, args, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        return ctx.db.keyResult.findMany({
          where: {
            userId,
          },
        });
      },
    });
    t.field("keyResult", {
      type: "KeyResult",
      nullable: false,
      args: { id: schema.intArg() },
      async resolve(root, { id }, ctx) {
        const userId = getUserId(ctx);
        if (!userId || !id) {
          throw new Error("Not authorized");
        }

        const kr = await ctx.db.keyResult.findOne({
          where: {
            id,
          },
        });

        if (!kr || !kr?.userId) {
          throw new Error("KR does not exist");
        }

        if (kr?.userId !== userId) {
          throw new Error("Not authorized");
        }

        return kr;
      },
    });
    t.list.field("keyResultsOfObjective", {
      type: "KeyResult",
      nullable: false,
      args: { parent: schema.intArg() },
      async resolve(root, { parent }, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        if (!parent) {
          throw new Error("must provide an objective");
        }

        const krs = await ctx.db.keyResult.findMany({
          where: {
            user: {
              id: userId,
            },
            objective: {
              id: parent,
            },
          },
        });

        return krs;
      },
    });
  },
});

schema.extendType({
  type: "Mutation",
  definition(t) {
    t.field("createKeyResult", {
      type: "KeyResult",
      args: {
        title: schema.stringArg({ required: true }),
        description: schema.stringArg({ required: false }),
        target: schema.intArg({ required: true }),
        objective: schema.intArg({ required: true }),
      },
      resolve(root, args, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        return ctx.db.keyResult.create({
          data: {
            title: args.title,
            description: args.description,
            createdAt: new Date().toISOString(),
            current: 0,
            target: args.target,
            objective: {
              connect: {
                id: args.objective,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });
      },
    });
    t.field("updateKeyResult", {
      type: "KeyResult",
      args: {
        id: schema.intArg({ required: true }),
        title: schema.stringArg({ required: false }),
        description: schema.stringArg({ required: false }),
        target: schema.intArg({ required: false }),
        current: schema.intArg({ required: false }),
      },
      async resolve(root, args, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        const kr = await ctx.db.keyResult.findOne({
          where: {
            id: args.id,
          },
        });

        if (!kr || kr?.userId !== userId) {
          throw new Error("Could not find KR");
        }

        const data: any = {};
        // Todo: use a loop, but typing is difficult here
        if (args.title != null) {
          data.title = args.title;
        }
        if (args.current != null) {
          data.current = args.current;
        }
        if (args.description != null) {
          data.description = args.description;
        }
        if (args.target != null) {
          data.target = args.target;
        }

        return ctx.db.keyResult.update({
          where: {
            id: args.id,
          },
          data,
        });
      },
    });
    t.field("deleteKeyResult", {
      type: "Boolean",
      args: { id: schema.intArg({ required: true }) },
      async resolve(root, { id }, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        const kr = await ctx.db.keyResult.findOne({
          where: {
            id,
          },
        });

        if (!kr || kr.userId !== userId) {
          throw new Error("Could not find kr");
        }
        const deleted = await ctx.db.keyResult.delete({
          where: {
            id,
          },
        });

        return !!deleted;
      },
    });
  },
});
