import getUserId from '../utils/getUserId'

const Query = {
    users(parent, args, {  prisma }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }
        if(args.query) {
            opArgs.where = {
                name_contains: args.query
            }
        }
        return prisma.query.users(opArgs, info)
    },
    posts(parent, args, { prisma }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
            where: {
                published: true
            }
        }
        if(args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }
        return prisma.query.posts(opArgs, info)
    },
    comments(parent, args, { db, prisma }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }
        
        if(args.query) {
            opArgs.where = {
                    text_contains: args.query
            }
        }

        return prisma.query.comments(opArgs, info)
    },
    async me(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.query.user({
            where: {
                id: userId
            }
        }, info)
    },
    async myPosts(parent, { query, first, skip, after, orderBy }, { prisma, request }, info) {
        const userId = getUserId(request)
        const opArgs = {
            first,
            skip,
            after,
            orderBy,
            where: {
                author: {
                    id: userId
                }
            }
        }
        if(query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }
        return prisma.query.posts(opArgs, info)
    },
    async post(parent, { id }, { prisma, request }, info) {
        const userId = getUserId(request, false)
        const posts = await prisma.query.posts({
            where: {
                id,
                OR: [{
                    published: true
                }, {
                    author: {
                        id: userId
                    }
                }]
            }
        }, info)
        if(posts.length === 0) {
            throw new Error('Post not found')
        }
        return posts[0]
    }
}

export { Query as default } 
