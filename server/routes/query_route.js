const express = require("express");
const {
  create,
  reply,
  get_query,
  edit_query,
  delete_query,
  get_reply,
  edit_reply,
  delete_reply,
  upvote,
  check_liked,
  create_query,
} = require("../controllers/queryController");
const {authenticateToken} = require("../middleware/tokenMiddleware")

require("dotenv").config();

const queryRouter = express.Router();

queryRouter.use(express.json());

//create a query
queryRouter.post("/create", authenticateToken , create_query);

//add a reply to the query
queryRouter.post("/reply", authenticateToken, reply);

//get all queries
queryRouter.get("/get-query", authenticateToken, get_query);

//edit query
queryRouter.post("/edit-query", authenticateToken, edit_query);

//delete query
queryRouter.delete("/delete-query", authenticateToken, delete_query);

//get reply for a certain query
queryRouter.post("/get-reply", authenticateToken, get_reply);

//edit reply
queryRouter.post("/edit-reply", authenticateToken, edit_reply);

//delete reply
queryRouter.post("/delete-reply", authenticateToken, delete_reply);

//add like
queryRouter.post("/upvote", authenticateToken, upvote);

//check liked
queryRouter.post("/check", authenticateToken, check_liked);

module.exports = queryRouter;
