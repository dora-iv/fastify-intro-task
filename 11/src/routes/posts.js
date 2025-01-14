import _ from "lodash";
import generatePosts from "../utils.js";

export default (app) => {
  const posts = generatePosts();

  // BEGIN (write your solution here)
  const POSTS_PER_PAGE = 5;

  app.get("/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id === req.params.id);
    if (!post) {
      res.status(404).send("Page not found");
      return;
    }
    res.view("src/views/posts/show", { post });
  });

  app.get("/posts", (req, res) => {
    const currentPage = Math.max(1, Number(req.query.page) || 1);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

    const hasNextPage = startIndex + POSTS_PER_PAGE < posts.length;
    const hasPreviousPage = currentPage > 1;

    res.view("src/views/posts/index", {
      posts: currentPosts,
      hasNextPage,
      hasPreviousPage,
      nextPage: currentPage + 1,
      previousPage: currentPage - 1,
    });
  });
  // END
};
