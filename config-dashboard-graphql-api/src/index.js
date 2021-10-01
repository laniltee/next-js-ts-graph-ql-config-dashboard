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
        include: { tags: { include: { tag: true } } },
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

    createConfiguration: async (parent, args, { prisma }, info) => {},
  },
};

// 3
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
