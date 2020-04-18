// http-proxy-middleware looks for this file.
// If changes are made to this file, the server needs to be restarted.
// Helps to send a user over to the backend server from the client.
// Eg: relative links in the client HTML are prepended with the target below.
// What this does is forward requests from the react side of the app to
// the node/express server. Only for development.
// NOTE: This isn't needed on production because there is no create-react-app
// server on production. All our React/frontend code is bundled into a single
// file and dumped into the `public` directory as public assets, served along with
// the requested HTML entity.
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};