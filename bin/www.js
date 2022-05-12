const http = require('http'); // Chunk1
const requestListener = require('../server')

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005)