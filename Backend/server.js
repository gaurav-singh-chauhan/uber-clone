const app = require("./app");
const http = require("http");
const { initializeSocket } = require('./socket');
const port = process.env.PORT;
const cors = require("cors");

const server = http.createServer(app);

app.use(cors());

initializeSocket(server);

server.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
});