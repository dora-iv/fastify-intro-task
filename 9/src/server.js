import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import formbody from "@fastify/formbody";
import yup from "yup";
import { generateId } from "./utils.js";

export default async () => {
  const app = fastify();

  const articles = [];

  await app.register(view, { engine: { pug } });
  await app.register(formbody);

  app.get("/", (req, res) => res.view("src/views/index"));

  app.get("/articles", (req, res) => {
    res.view("src/views/articles/index", { articles });
  });

  // BEGIN (write your solution here)
  const articleSchema = yup.object({
    title: yup.string().min(2, "Название не должно быть короче двух символов").required(),
    text: yup.string().min(10, "Статья должна быть не короче 10 символов").required(),
  });

  app.get("/articles/new", (req, res) => {
    res.view("src/views/articles/new", { errors: {} });
  });

  app.post("/articles", async (req, res) => {
    const { title, text } = req.body;

    try {
      await articleSchema.validate({ title, text }, { abortEarly: false });
    } catch (err) {
      const errors = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      return res.view("src/views/articles/new", { errors, title, text });
    }

    if (articles.find(article => article.title === title)) {
      return res.view("src/views/articles/new", { errors: { title: "Статья с таким названием уже существует" }, title, text });
    }

    const article = { id: generateId(), title, text };
    articles.push(article);

    res.redirect("/articles");
  });
  // END

  app.get("/articles/:id", (req, res) => {
    const article = articles.find(({ id }) => id === req.params.id);

    if (!article) {
      return res.status(404).send("article not found");
    }

    return res.view("src/views/articles/show", { article });
  });

  return app;
};
