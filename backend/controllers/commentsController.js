const db = require("../database/dbconfig");

const getComments = (req, res) => {
	db.query(
		"SELECT * FROM comments_system ORDER BY timestamp DESC",
		(err, results) => {
			if (err)
				return res
					.status(500)
					.json({
						error: "Oops! Something went wrong while fetching comments. Please try again later.",
					});
			res.json(results);
		}
	);
};

const postComment = (req, res) => {
	const { username, comment } = req.body;
	const timestamp = new Date();

	if (!username || !comment) {
		return res
			.status(400)
			.json({
				error: "Please provide both a username and a comment to proceed.",
			});
	}

	const query =
		"INSERT INTO comments_system (username, comment, timestamp) VALUES (?, ?, ?)";
	db.query(query, [username, comment, timestamp], (err) => {
		if (err) {
			return res
				.status(500)
				.json({
					error: "Oh no! We couldn't save your comment. Please try again.",
				});
		}

		req.io.emit("new_comment", { username, comment, timestamp });
		res.status(201).json({
			message:
				"Your comment has been added successfully! Thank you for sharing.",
		});
	});
};

module.exports = { getComments, postComment };
