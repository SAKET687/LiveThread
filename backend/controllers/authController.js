const login = (req, res) => {
	const { username } = req.body;
	if (!username)
		return res.status(400).json({ error: "Username is required" });
	const randomString = Math.random().toString(36).substring(2, 9);
	const sessionId = `${username}_${randomString}`;
	res.json({ sessionId });
};

module.exports = { login };
