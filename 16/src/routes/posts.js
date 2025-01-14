import generateId from "../utils.js";

export default (app) => {
  const posts = [];

  app.get("/posts/new", (req, res) => res.view("src/views/posts/new"));

  app.get("/posts/:id", (req, res) => {
    const post = posts.find(({ id }) => id === req.params.id);

    if (!post) {
      res.status(404).send("Post not found");
      return;
    }
    res.view("src/views/posts/show", { post });
  });

  // BEGIN (write your solution here)
  app.get("/posts", (req, res) => {
    const flashMessage = req.session.flashMessage;
    const data = {
      posts,
      flashMessage,
    };
    req.session.flashMessage = null;
    res.view("src/views/posts/index", data);
  });

  app.post("/posts", (req, res) => {
    const { title, body } = req.body;

    const errors = {};
    if (!title || title.length < 2) {
      errors.title = "Title must be at least 2 characters long";
    }
    if (!body || body.trim() === "") {
      errors.body = "Body is required";
    }

    if (Object.keys(errors).length > 0) {
      req.session.flashMessage = "Ошибка создания поста!";

      return res.view("src/views/posts/new", { title, body, errors, flashMessage: req.session.flashMessage });
    }

    const post = {
      title,
      body,
      id: generateId(),
    };

    posts.push(post);

    req.session.flashMessage = "Пост был успешно создан!";

    res.redirect("/posts");
  });

  // END
};
