import { Age, Name } from './test'
import * as http from 'http';

import { EventEmitter2 } from './EventEmitter2';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req: any, res: any) => {
  res.statusCode = 200;

  const em = new EventEmitter2();
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

console.log(22222, Age, Name);
console.log(module);

