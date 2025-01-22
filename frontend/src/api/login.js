import axios from "axios";

const apiUrl = "http://localhost:5000/api/login";

export const login = async (username, setError) => {
	try {
		const response = await axios.post(apiUrl, { username });
		return response.data.sessionId;
	} catch (error) {
		console.error(error);
		setError("Oops! We need a username to proceed.");
	}
};
