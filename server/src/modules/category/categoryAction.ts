import type { RequestHandler } from "express";
// Some data to make the trick
// Import access to data
import categoryRepository from "./categoryRepository";
// Declare the actions

/* Here you code */
const browse: RequestHandler = async (req, res) => {
  const categoriesFromDB = await categoryRepository.readAll();

  res.json(categoriesFromDB);
};
const read: RequestHandler = async (req, res) => {
  const parsedId = Number.parseInt(req.params.id);
  const category = await categoryRepository.read(parsedId);
  if (category) {
    res.json(category);
  } else {
    res.sendStatus(404);
  }
};
const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update a specific category based on the provided ID
    const category = {
      id: Number(req.params.id),
      name: req.body.name,
    };

    const affectedRows = await categoryRepository.update(category);

    // If the category is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the category in JSON format
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the category data from the request body
    const newCategory = {
      name: req.body.name,
    };

    // Create the category
    const insertId = await categoryRepository.create(newCategory);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Delete a specific category based on the provided ID
    const categoryId = Number(req.params.id);

    await categoryRepository.delete(categoryId);

    // Respond with HTTP 204 (No Content) anyway
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = (req, res, next) => {
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];

  const { name } = req.body;

  // put your validation rules here
  if (name === "") {
    errors.push({ field: "name", message: "The field is required" });
  }
  if (errors.length === 0) {
    next();
  } else {
    res.status(400).json({ validationErrors: errors });
  }
};

// Export them to import them somewhere else

export default {
  /* Here you export */
  browse,
  read,
  edit,
  add,
  destroy,
  validate,
};
