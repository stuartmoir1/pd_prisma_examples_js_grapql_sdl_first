
const Query = {
  feed: (parent, args, ctx) => {
    return ctx.prisma.post.findMany({
      where: { published: true },
    })
  },
  filterPosts: (parent, args, ctx) => {
    return ctx.prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: args.searchString } },
          { content: { contains: args.searchString } },
        ],
      },
    })
  },
  post: (parent, args, ctx) => {
    return ctx.prisma.post.findOne({
      where: { id: Number(args.where.id) },
    })
  }  
};

const Mutation = {
  createDraft: (parent, args, ctx) => {
    return ctx.prisma.post.create({
      data: {
        title: args.title,
        content: args.content,
        published: false,
        author: {
          connect: { email: args.authorEmail },
        },
      },
    })
  },
  deleteOnePost: (parent, args, ctx) => {
    return ctx.prisma.post.delete({
      where: { id: Number(args.where.id) },
    })
  },
  publish: (parent, args, ctx) => {
    return ctx.prisma.post.update({
      where: { id: Number(args.id) },
      data: { published: true },
    })
  },
  signupUser: (parent, args, ctx) => {
    return ctx.prisma.user.create(args)
  },
};

const User = {
  posts: (parent, args, ctx) => {
    return ctx.prisma.user
      .findOne({ where: { id: parent.id } })
      .posts()
  },
};

const Post = {
  author: (parent, args, ctx) => {
    return ctx.prisma.post
      .findOne({ where: { id: parent.id } })
      .author()
  },
};

const resolvers = {
  Query,
  Mutation,
  User,
  Post
};

module.exports = {
  resolvers
};
