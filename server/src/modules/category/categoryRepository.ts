import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
};

class CategoryRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "category" table
    const [rows] = await databaseClient.query<Rows>("select * from category");

    // Return the array of categories
    return rows as Category[];
  }
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * FROM category WHERE id = ${id}`,
    );
    return rows[0] as Category;
  }
  async update(category: Category) {
    // Execute the SQL UPDATE query to update an existing category in the "category" table
    const [result] = await databaseClient.query<Result>(
      "update category set name = ? WHERE id = ?",

      [category.name, category.id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
  async create(category: Omit<Category, "id">) {
    // Execute the SQL INSERT query to add a new category to the "category" table
    const [result] = await databaseClient.query<Result>(
      "insert into category (name) values (?)",
      [category.name],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }
  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing category from the "category" table
    const [result] = await databaseClient.query<Result>(
      "delete from category where id = ?",
      [id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}
export default new CategoryRepository();
