/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import {
	Container,
	Typography,
	Paper,
	Box,
	TextField,
	Button,
} from "@mui/material";
import { getComments, postComment } from "../api/comments";
import { login } from "../api/login";
import { subscribeToNewComments } from "../socket/socket";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const HomeLayout = ({
	username,
	setUsername,
	sessionId,
	setSessionId,
	comments,
	setComments,
}) => {
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const data = await getComments();
				setComments(data);
			} catch (error) {
				setError(
					"Oops! Something went wrong while loading the comments. Please try again later."
				);
			}
		};

		fetchComments();

		const unsubscribe = subscribeToNewComments((newComment) => {
			setComments((prevComments) => [newComment, ...prevComments]);
		});

		return () => {
			unsubscribe();
		};
	}, [setComments]);

	const handlePostComment = async (comment) => {
		try {
			await postComment(username, comment);
			setError("");
		} catch (error) {
			setError("Sorry, we couldn't post your comment. Please try again!");
		}
	};

	const handleLogin = async () => {
		try {
			const sessionId = await login(username, setError);
			setSessionId(sessionId);
		} catch (error) {
			setError(
				"Whoops! We couldn't log you in. Please check your username."
			);
		}
	};

	return (
		<Container maxWidth="sm">
			<Box mt={4}>
				<Typography variant="h4" gutterBottom>
					Real-Time Comments System
				</Typography>

				{error && <Typography color="error">{error}</Typography>}

				{!sessionId ? (
					<div>
						<TextField
							label="Enter your username here"
							variant="outlined"
							fullWidth
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
						<Button
							variant="contained"
							color="primary"
							onClick={handleLogin}
							fullWidth
							style={{ marginTop: "10px" }}
						>
							Log in
						</Button>
					</div>
				) : (
					<div>
						<Typography variant="h6">
							Welcome back, {username}! We're happy to see you.
						</Typography>
						<CommentForm onPostComment={handlePostComment} />
						<Paper
							elevation={3}
							style={{ marginTop: 20, padding: 16 }}
						>
							<Typography variant="h5">
								Here's what people are saying:
							</Typography>
							<CommentList comments={comments} />
						</Paper>
					</div>
				)}
			</Box>
		</Container>
	);
};

export default HomeLayout;
