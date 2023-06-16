const http = require("http");

const reqResHandler = (req, res) => {
  const url = req.url;
  switch (url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<head><title>Assignment 1</title></head>");
      res.write(
        '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
      );
      res.write("</html>");
      return res.end();

    case "/users":
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<head><title>Assignment 1</title></head>");
      res.write("<body><ul><li>User First</li><li>User Second</li></ul></body>");
      res.write("</html>");
      return res.end();

    case "/create-user":
      const body = [];
      const reqDataHandler = (chunk) => {
        body.push(chunk);
      };
      const reqEndHandler = () => {
        const parsedBody = Buffer.concat(body).toString();
        console.log(parsedBody.split("=")[1]);
      };
      req.on("data", reqDataHandler);
      req.on("end", reqEndHandler);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
      return;

    default:
      break;
  }
};
const server = http.createServer(reqResHandler);

server.listen(3000);
