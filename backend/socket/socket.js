const db = require("../database/dbconfig");

const socketHandler = (socket, io) => {
	console.log("A new friend has joined the chat!");

	db.query(
		"SELECT * FROM comments_system ORDER BY timestamp DESC",
		(error, results) => {
			if (error) {
				console.error(
					"Something went wrong while fetching comments:",
					error
				);
				socket.emit("error", {
					message:
						"Oops! We couldn't load the comments. Please try again later.",
				});
				return;
			}
			socket.emit("load_comments", results);
		}
	);

	socket.on("new_comment", (data) => {
		const { username, comment, timestamp } = data;

		if (!username || !comment) {
			socket.emit("error", {
				message:
					"Both username and comment are needed to share your thoughts!",
			});
			return;
		}

		const query =
			"INSERT INTO comments_system (username, comment, timestamp) VALUES (?, ?, ?)";
		db.query(query, [username, comment, timestamp], (error, result) => {
			if (error) {
				console.error("Failed to save comment:", error);
				socket.emit("error", {
					message:
						"Sorry, we couldn't save your comment at the moment. Please try again later.",
				});
				return;
			}

			io.emit("new_comment", { username, comment, timestamp });
			console.log("New comment added successfully!");
		});
	});

	socket.on("disconnect", () => {
		console.log("A friend has left the chat. Hope to see you soon!");
	});
};

module.exports = socketHandler;
