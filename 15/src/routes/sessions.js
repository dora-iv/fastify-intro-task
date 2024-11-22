import generateUsers, {decrypt, encrypt} from "../utils.js";

export default (app) => {
    const users = generateUsers();

    // BEGIN (write your solution here)
    app.get("/sessions/new", (req, res) => {
        res.view("src/views/sessions/new");
    });

    app.post("/sessions", (req, res) => {
        const {username, password} = req.body;

        const user = users.find(
            (u) => u.username === username
        );

        if (!user || password !== decrypt(user.password)) {
            return res.view("src/views/sessions/new", {error: "Wrong username or password"});
        }

        req.session.username = user.username;

        res.redirect("/");
    });

    app.post("/sessions/delete", (req, res) => {
        delete req.session.username;

        res.redirect("/");
    });

    // END
};
