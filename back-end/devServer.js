const app = require("./api/server.old"); // atau path sesuai isi `api/server.js`

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}`);
});
