import express from "express";
import { auth } from "../middleware/auth.js";
import {
  renewBook,
  addBook,
  deleteBook,
  updateBook,
  getAllBooks,
  getBook,
  borrowBook,
  returnBook,
  commentBook,
  replyComment,
  removeCommentBook,
  editCommentBook,
  removeReplyComment,
  editReplyComment,
} from "../controllers/bookController.js";
import {
  bookLimitCheck,
  bookDuesCheck,
  checkAccess,
} from "../middleware/borrow.js";
export const bookRoute = express.Router();

bookRoute.post("/", auth(["Employee"]), addBook);
bookRoute.delete("/:id", auth(["Employee"]), deleteBook);
bookRoute.put("/:id", auth(["Employee"]), updateBook);
bookRoute.get("/", auth(["Employee", "lecteur"]), getAllBooks);
bookRoute.get("/:id", auth(["Employee", "lecteur"]), getBook);
bookRoute.post(
  "/:id",
  [auth(["lecteur"]), checkAccess, bookLimitCheck, bookDuesCheck],
  borrowBook
);
bookRoute.put("/:id/return", auth(["lecteur"]), returnBook);
bookRoute.put("/:id/renew", [auth(["lecteur"]), checkAccess], renewBook);

//comment section and reply

bookRoute.post("/:id/comments", auth(["lecteur"]), commentBook);
bookRoute.delete("/:id/comments", auth(["lecteur"]), removeCommentBook);
bookRoute.put("/:id/comments", auth(["lecteur"]), editCommentBook);

bookRoute.post("/comments/:id", auth(["lecteur"]), replyComment);
bookRoute.delete("/comments/:id", auth(["lecteur"]), removeReplyComment);
bookRoute.put("/comments/:id", auth(["lecteur"]), editReplyComment);
