import http from "node:http";

import app from "./app.js";
import { startDB } from "./config/database.config.js";

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    startDB();
	console.log(`Listening on *:${PORT}`);
});
