const {ApolloServer} = require('apollo-server');
const fs = require('fs');
const path = require('path')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany()
    },
 },
  // 3

  Mutation: {
    // 2
    post: (parent, args, context, info) => {
      return context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      })
    },
  },

}

// 3
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'),
      'utf8'
  ),
  resolvers,
  context: {
    prisma,
  }
})

server
    .listen()
    .then(({url}) =>
        console.log(`Server is running on ${url}`)
    );