const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const resolvers = {
  Query: {
    configurations: async (parent, args, context) => {
      return await context.prisma.configuration.findMany({
        include: { tags: true },
      });
    },

    tags: async (parent, args, context) => {
      return context.prisma.tag.findMany();
    },
  },

  Mutation: {
    createTags: async (parent, args, context, info) => {
      const savedTags = [];
      for (let tagIndex = 0; tagIndex < args.tags.length; tagIndex++) {
        savedTags.push(
          await context.prisma.tag.create({
            data: { name: args.tags[tagIndex] },
          })
        );
      }
      return savedTags;
    },

    createConfiguration: async (parent, args, context, info) => {
      const createdConfiguration = await context.prisma.configuration.create({
        data: {
          name: args.name,
          description: args.description,
        },
      });

      await context.prisma.configuration.update({
        where: { id: createdConfiguration.id },
        data: {
          tags: {
            set: (args.tags || []).map((tag) => ({ id: tag })),
          },
        },
      });

      const findConfigurationsById =
        await context.prisma.configuration.findMany({
          where: { id: createdConfiguration.id },
          include: { tags: true },
        });

      return findConfigurationsById[0];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
