export default async (db) => {
    // BEGIN (write your solution here)
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Автоматически генерируемый идентификатор
      title TEXT NOT NULL,                   -- Название товара
      description TEXT NOT NULL,             -- Описание товара
      price REAL NOT NULL                    -- Цена товара
    );
  `;


    await db.run(createTableQuery, (err) => {
        if (err) {
            console.error("Ошибка при создании таблицы товаров:", err);
        } else {
            console.log("Таблица товаров успешно создана.");
        }
    });
    // END
};
