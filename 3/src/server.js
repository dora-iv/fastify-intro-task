import _ from "lodash";
import fastify from "fastify";
import getUsers from "./utils.js";

export default () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  app.get('/users',(req, res) => {
    const page =  Number(req.query.page) || 1;
    const per = Number(req.query.per) || 5;
    const startIndex = (page - 1) * per;
    const endIndex = startIndex + per;
    const pagedUsers = _.slice(users, startIndex, endIndex);
    res.send(pagedUsers);
  });
  // END

  return app;
};
