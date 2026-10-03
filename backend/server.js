import server from "./index.js";
import os from "os";

const getNetworkAddress = () => {
	const interfaces = os.networkInterfaces();
	for (const name of Object.keys(interfaces)) {
		for (const iface of interfaces[name]) {
			// Skip internal (loopback) and non-IPv4 addresses
			if (iface.family === "IPv4" && !iface.internal) {
				return iface.address;
			}
		}
	}
	return "localhost";
};

const PORT = process.env.PORT || 3100;
const networkIP = getNetworkAddress();

//  Pass '0.0.0.0' to listen on your local network, not just localhost
server.listen(PORT, "0.0.0.0", () => {
	console.log(`  Local:            http://localhost:${PORT}`);
	console.log(`  On Your Network:  http://${networkIP}:${PORT}`);
});

// Graceful shutdown: close Mongo connection on Ctrl+C
// process.on("SIGINT", async () => {
// 	await closeMongoDBConnection();
// 	process.exit(0);
// });
