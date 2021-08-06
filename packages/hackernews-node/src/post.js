const { Prisma } = require("@prisma/client");
const prisma = require("./prisma");

module.exports = {
  /**
   * Get all posts in descending order
   */
  getPosts() {
    return prisma.post.findMany({
      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
    });
  },

  /**
   * Get a single post by its id
   */
  getPost(id) {
    return prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });
  },

  createPost(url, title) {
    return prisma.post.create({
      data: {
        url,
        title,
      },
    });
  },

  updatePost(id, url, title) {
    return prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        url,
        title,
      },
    });
  },

  deletePost(id) {
    return prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
  }
};
