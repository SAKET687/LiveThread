"use client";
import { useState } from "react";
import HomeLayout from "../components/HomeLayout";

export default function Home() {
	const [username, setUsername] = useState("");
	const [sessionId, setSessionId] = useState("");
	const [comments, setComments] = useState([]);

	return (
		<HomeLayout
			username={username}
			setUsername={setUsername}
			sessionId={sessionId}
			setSessionId={setSessionId}
			comments={comments}
			setComments={setComments}
		/>
	);
}
