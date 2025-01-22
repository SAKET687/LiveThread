import * as React from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";

const CommentList = ({ comments }) => {
	return (
		<List>
			{comments.map((comment, index) => (
				<ListItem key={index}>
					<Box
						sx={{
							padding: "12px",
							marginBottom: "8px",
							borderRadius: "8px",
							backgroundColor: "#f5f5f5",
							boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
						}}
					>
						<Typography level="body2">
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
								}}
							>
								<Typography
									component="span"
									sx={{
										fontWeight: "bold",
										fontSize: "1.1rem",
										marginBottom: "4px",
										color: "#9c27b0",
									}}
								>
									{comment.username}
								</Typography>
								<Typography
									component="span"
									sx={{
										fontStyle: "italic",
										fontSize: "0.875rem",
										color: "#757575",
										marginBottom: "8px",
									}}
								>
									(
									{new Date(
										comment.timestamp
									).toLocaleString()}
									)
								</Typography>
								<Typography
									component="span"
									sx={{
										fontSize: "1rem",
										color: "#333",
									}}
								>
									{comment.comment}
								</Typography>
							</Box>
						</Typography>
					</Box>
				</ListItem>
			))}
		</List>
	);
};

export default CommentList;
