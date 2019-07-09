import '@babel/polyfill/noConflict'

import { GraphQLServer, PubSub } from 'graphql-yoga'
import prisma from './prisma'
import { resolvers, fragmentReplacements } from './resolvers/index'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context(request) {
        return {
            prisma,
            request
        }
    },
    fragmentReplacements
})

server.start({ port: process.env.PORT || 4000 }, () => {
    console.log('server listening')
})
