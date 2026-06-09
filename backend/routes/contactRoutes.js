import express from "express";
import { protect } from "../middleware/authmiddleware.js";
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from "../controllers/contactControllers.js";

const contactRouter = express.Router();

contactRouter.use(protect);

contactRouter.post("/", createContact);

contactRouter.get("/", getContacts);

contactRouter.get("/:id", getContactById);

contactRouter.put("/:id", updateContact);

contactRouter.delete("/:id", deleteContact);

export default contactRouter;
