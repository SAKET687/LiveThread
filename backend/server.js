const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");

const commentsRoutes = require("./routes/commentsRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
	req.io = io;
	next();
});

app.use("/api/comments", commentsRoutes);
app.use("/api", authRoutes);

io.on("connection", (socket) => {
	console.log("🎉 A new client has joined the party!");
	socket.on("disconnect", () => {
		console.log("👋 Client disconnected. Hope to see you again soon!");
	});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`🚀 Server is up and running on port ${PORT}. Let's do this!`);
});
