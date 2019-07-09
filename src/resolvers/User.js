import getUserId from '../utils/getUserId'

const User = {
    email: {
        fragment: 'fragment userId on User { id }',
        resolve(parent, args, { request }, info) {
            const userId = getUserId(request, false)
            if(userId && userId === parent.id) {
                return parent.email
            } else {
                return null
            }
        }
    },
    posts: {
        fragment: 'fragment userId on User { id }',
        async resolve(parent, args, { prisma, request }, info) {
                return prisma.query.posts({
                    where:  {
                        author: {
                            id: parent.id
                        },
                        published: true
                    }, 
                }, info)
        }
    }
}

export { User as default }
