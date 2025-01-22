import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import { useState } from "react";

const CommentForm = ({ onPostComment }) => {
	const [comment, setComment] = useState("");

	const handlePostComment = () => {
		onPostComment(comment);
		setComment("");
	};

	return (
		<FormControl sx={{ width: "100%" }}>
			<FormLabel>Share your thoughts:</FormLabel>
			<Textarea
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				placeholder="Type something here…"
				minRows={4}
				endDecorator={
					<Box
						sx={{
							display: "flex",
							gap: "var(--Textarea-paddingBlock)",
							pt: "var(--Textarea-paddingBlock)",
							borderTop: "1px solid",
							borderColor: "divider",
							flex: "auto",
						}}
					>
						<Button
							sx={{ ml: "auto" }}
							onClick={handlePostComment}
							disabled={!comment}
						>
							Submit
						</Button>
					</Box>
				}
				sx={{ minWidth: 300 }}
			/>
		</FormControl>
	);
};

export default CommentForm;
