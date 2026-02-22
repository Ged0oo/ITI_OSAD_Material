const fs = require('fs');
const path = require('path');
const http = require('http');

const invPath = path.join(__dirname, 'inventory.json');

if (!fs.existsSync(invPath)) {
  fs.writeFileSync(invPath, JSON.stringify([]));
}

const inv = JSON.parse(fs.readFileSync(invPath, 'utf-8'));

function list_inv(req, res) {
  const inv = JSON.parse(fs.readFileSync(invPath, "utf-8"));

  const rows = inv.map(item => `
    <tr>
      <td>${item.name}</td> <td>${item.quantity}</td> <td>${item.category}</td>
    </tr>
  `).join("");

  // console.log(rows)
  
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Inventory</title>
      </head>

      <body>
        <h1>Inventory List</h1>
        <table border="1" cellpadding="5" style="border-collapse: width: 60%;">
          <tr>
            <th>Name</th> <th>Quantity</th> <th>Category</th>
          </tr>
          ${rows}
        </table>
      </body>

    </html>
    `;

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}

function send_html(req, res, file) {
  const filePath = path.join(__dirname, file);
  const content = fs.readFileSync(filePath, 'utf-8')
  res.writeHead(200, {
    'content-type': 'text/html'
  })
  res.write(content)
  res.end();
}

function serveContent(req, res) {
  const filePath = path.join(__dirname, req.url);
  console.log(filePath)
  const ext = path.extname(filePath);
  console.log(ext)
  
  var contentType;
  if (ext === ".png") contentType = "image/png";
  else if (ext === ".jpg") contentType = "image/jpeg";
  else if (ext === ".css") contentType = "text/css";

  res.writeHead(200, {"Content-Type": contentType });
  const data = fs.readFileSync(filePath);
  res.write(data)
  res.end();
}

const server = http.createServer((req, res) => {
  const {method, url} = req;
  if (method === 'GET') {
    if(url === '/') list_inv(req, res, "list_inv.html");
    else if(url === '/astronomy') send_html(req, res, "astronomy.html");
    else if(url === '/serbel') send_html(req, res, "serbel.html");
    else serveContent(req, res);
  }
  else {
    res.writeHead(400);
    res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
});

server.listen(3000, () => {
  console.log("Server running ...");
})