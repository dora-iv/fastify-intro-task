import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import getUsers from "./utils.js";

export default async () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  app.register(view, {
    engine: {
      pug,
    },
  });
  app.get('/users', (req, res) => {
    res.view('src/views/users/index.pug', { users });
  });

  app.get("/users/:id", (req, res) => {
    const user = users.find(({ id }) => id === req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.view("src/views/users/show", { user });
  });
  // END

  return app;
};
