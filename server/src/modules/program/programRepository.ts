import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
};

class ProgramRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "category" table
    const [rows] = await databaseClient.query<Rows>("select * from program");

    // Return the array of categories
    return rows as Program[];
  }
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * FROM program WHERE id = ${id}`,
    );
    return rows[0] as Program;
  }
  async update(program: Program) {
    // Execute the SQL UPDATE query to update an existing category in the "category" table
    const [result] = await databaseClient.query<Result>(
      "update program set title = ?, year = ?, synopsis = ?, country = ?, poster = ? WHERE id = ?",

      [
        program.title,
        program.year,
        program.synopsis,
        program.country,
        program.poster,
        program.id,
      ],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
  async create(program: Omit<Program, "id">) {
    // Execute the SQL INSERT query to add a new category to the "category" table
    const [result] = await databaseClient.query<Result>(
      "insert into program (title, year, synopsis, country, poster, category_id) values (?, ?, ?, ?, ?, 1)",
      [
        program.title,
        program.year,
        program.synopsis,
        program.country,
        program.poster,
      ],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }
  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing category from the "category" table
    const [result] = await databaseClient.query<Result>(
      "delete from program where id = ?",
      [id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new ProgramRepository();
