

import { Server, createServer } from 'http';
import app from './app';

const server: Server = createServer(app);
const hostname = '0.0.0.0';
const port = 4000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
