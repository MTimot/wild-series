import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

// Declaration of a "Welcome" route

import categoryAction from "./modules/category/categoryAction";
import programActions from "./modules/program/programActions";
import sayActions from "./modules/say/sayActions";

router.get("/", sayActions.sayWelcome);
router.get("/api/programs", programActions.browse);
router.get("/api/programs/:id", programActions.read);
router.put("/api/programs/:id", programActions.edit);
router.post("/api/programs", programActions.add);
router.delete("/api/programs/:id", programActions.destroy);
router.get("/api/categories", categoryAction.browse);
router.get("/api/categories/:id", categoryAction.category);
/* ************************************************************************* */

export default router;
