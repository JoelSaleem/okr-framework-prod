import { schema } from "nexus";
import { getUserId } from "../utils";
import { createLogicalAnd } from "typescript";

schema.objectType({
  name: "Objective",
  definition(t) {
    t.int("id");
    t.string("title");
    t.string("description");
    t.string("createdAt");
    t.field("parentObjective", {
      type: "Objective",
      resolve(root, args, ctx) {
        if (!root.id) {
          return null;
        }
        return ctx.db.objective
          .findOne({
            where: {
              id: root.id,
            },
          })
          .parentObjective();
      },
    }),
      t.field("user", {
        type: "User",
        resolve(root, args, ctx) {
          if (!root.id) {
            return null;
          }
          return ctx.db.objective
            .findOne({
              where: {
                id: root.id,
              },
            })
            .user();
        },
      });
  },
});

schema.extendType({
  type: "Query",
  definition(t) {
    t.field("objectives", {
      type: "Objective",
      nullable: false,
      list: true,
      async resolve(_root, _args, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        return ctx.db.objective.findMany({
          where: {
            user: {
              id: userId,
            },
          },
        });
      },
    });
    t.field("rootObjectives", {
      type: "Objective",
      nullable: false,
      list: true,
      async resolve(_root, _args, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        return ctx.db.objective.findMany({
          where: {
            user: {
              id: userId,
            },
            parentId: null,
          },
        });
      },
    });
    t.field("objective", {
      type: "Objective",
      nullable: true,
      args: { id: schema.intArg({ required: true }) },
      async resolve(_root, { id }, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        if (!id) {
          throw new Error("Must provide id");
        }

        const obj = await ctx.db.objective.findOne({
          where: {
            id,
          },
        });

        if (!obj || obj?.userId !== userId) {
          throw new Error("Could not find objective");
        }

        return obj;
      },
    });
    t.list.field("objectivesOfParent", {
      type: "Objective",
      nullable: true,
      args: { parent: schema.intArg({ required: true }) },
      async resolve(_root, { parent }, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        const obj = await ctx.db.objective.findMany({
          where: {
            user: {
              id: userId,
            },
            parentObjective: {
              id: parent,
            },
          },
        });

        return obj;
      },
    });
  },
});

schema.extendType({
  type: "Mutation",
  definition(t) {
    t.field("createObjective", {
      type: "Objective",
      args: {
        title: schema.stringArg({ required: true }),
        description: schema.stringArg({ required: true }),
        parentObjective: schema.intArg({ required: false }),
      },
      nullable: false,
      async resolve(_root, args, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        const data: any = {
          createdAt: new Date().toISOString(),
          description: args.description,
          title: args.title,
          user: {
            connect: {
              id: userId,
            },
          },
        };

        if (args.parentObjective != null) {
          data.parentObjective = {
            connect: {
              id: args.parentObjective,
            },
          };
        }

        return ctx.db.objective.create({ data });
      },
    });
    t.field("updateObjective", {
      type: "Objective",
      args: {
        id: schema.intArg({ required: true }),
        title: schema.stringArg({ required: false }),
        description: schema.stringArg({ required: false }),
      },
      nullable: false,
      async resolve(_root, { id, title, description }, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        const obj = await ctx.db.objective.findOne({
          where: {
            id,
          },
        });

        if (!obj || obj.userId !== userId) {
          throw new Error("Could not find objective");
        }

        const data: any = {};
        if (title) {
          data.title = title;
        }
        if (description) {
          data.description = description;
        }

        return ctx.db.objective.update({
          where: {
            id,
          },
          data,
        });
      },
    });
    t.field("deleteObjective", {
      type: "Boolean",
      args: { id: schema.intArg({ required: true }) },
      async resolve(root, { id }, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        const obj = await ctx.db.objective.findOne({
          where: {
            id,
          },
        });

        if (!obj || obj.userId !== userId) {
          throw new Error("Could not find objective");
        }

        const deleted = await ctx.db.objective.delete({
          where: {
            id,
          },
        });

        return !!deleted;
      },
    });
  },
});
