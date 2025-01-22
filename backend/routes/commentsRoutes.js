const express = require("express");
const router = express.Router();
const {
	getComments,
	postComment,
} = require("../Controllers/commentsController");

router.get("/", getComments);
router.post("/", postComment);

module.exports = router;
