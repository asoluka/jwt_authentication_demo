const http = require("http");
const app = require("./src/app");
const { connectDB } = require("./src/db/connectDB");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
  });
}

startServer();
