import https from 'https';
import fs from 'fs';
import path from 'path';
import { app } from '../index';

const port = process.env.PORT || 5050;

const server = https.createServer(
  {
    key: fs.readFileSync(path.join(process.cwd(), 'ssl', 'key.pem')),
    cert: fs.readFileSync(path.join(process.cwd(), 'ssl', 'cert.pem')),
  },
  app
);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
