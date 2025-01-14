export default (app, db) => {
  app.get("/products/new", (req, res) => {
    res.view("src/views/products/new");
  });

  // BEGIN (write your solution here)
  app.get("/products", (req, res) => {
    const getProductsQuery = "SELECT * FROM products";
    db.all(getProductsQuery, [], (err, rows) => {
      if (err) {
        res.status(500).send("Ошибка при получении товаров");
      } else {
        res.view("src/views/products/index", { products: rows });
      }
    });
  });

  app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    const getProductQuery = "SELECT * FROM products WHERE id = ?";
    db.get(getProductQuery, [id], (err, row) => {
      if (err) {
        res.status(500).send("Ошибка при получении товара");
      } else if (!row) {
        res.status(404).send("Товар не найден");
      } else {
        res.view("src/views/products/show", { product: row });
      }
    });
  });

  app.post("/products", (req, res) => {
    const { title, description, price } = req.body;
    const insertProductQuery = `
      INSERT INTO products (title, description, price)
      VALUES (?, ?, ?)
    `;
    db.run(insertProductQuery, [title, description, price], function (err) {
      if (err) {
        res.status(500).send("Ошибка при добавлении товара");
      } else {
        res.redirect("/products");
      }
    });
  });
  // END
};
