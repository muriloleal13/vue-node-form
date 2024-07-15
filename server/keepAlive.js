const http = require('http');
const https = require('https');

// Definindo a URL do servidor aqui mesmo para ser mais simples e não no .env
const PROD_SERVER_URL = 'https://vue-node-form.onrender.com';

const serverUrl = PROD_SERVER_URL;

const url = new URL(serverUrl);

const protocol = url.protocol === 'https:' ? https : http;

const options = {
  hostname: url.hostname,
  port: url.port || (url.protocol === 'https:' ? 443 : 80),
  path: url.pathname,
  method: 'GET',
};

function sendKeepAliveRequest() {
  try {
    const req = protocol.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
    });

    req.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
    });

    req.end();
  } catch (error) {
    console.error(`Caught exception: ${error.message}`);
  }
}

setInterval(sendKeepAliveRequest, 2 * 60 * 1000);

module.exports = sendKeepAliveRequest;
