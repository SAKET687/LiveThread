import axios from "axios";

const apiUrl = "http://localhost:5000/api/comments";

export const getComments = async () => {
	try {
		const response = await axios.get(apiUrl);
		return response.data;
	} catch (error) {
		console.error("Error fetching comments:", error);
		throw new Error(
			"Oops! Something went wrong while fetching comments. Please try again later."
		);
	}
};

export const postComment = async (username, comment) => {
	try {
		await axios.post(apiUrl, { username, comment });
	} catch (error) {
		console.error("Error posting comment:", error);
		throw new Error(
			"Yikes! We couldn’t post your comment. Please check your input and try again."
		);
	}
};
