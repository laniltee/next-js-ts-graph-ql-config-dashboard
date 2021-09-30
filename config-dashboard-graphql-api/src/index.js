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
    organizations: async (parent, args, context) => {
      return context.prisma.organization.findMany();
    },
    users: async (parent, args, context) => {
      return context.prisma.user.findMany();
    },
    tags: async (parent, args, context) => {
      return context.prisma.tag.findMany();
    },
  },
  // 3

  Mutation: {
    // 2
    post: async (parent, args, { prisma }, info) => {
      return prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
    },

    createConfiguration: async (parent, args, { prisma }, info) => {
      let savedTags = [];
      if (args.tags && args.tags.length) {
        savedTags = await prisma.tag.findMany({
          where: {
            name: [args.tags],
          },
        });
        console.log("savedTags", savedTags);
      }
      return prisma.configuration.create({
        data: {
          name: args.name,
          description: args.description,
          tags: savedTags,
        },
      });
    },
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
