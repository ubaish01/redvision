const app = require("./app");
const { ConnectDatabase } = require("./connection/db");
const PORT = process.env.PORT || 5000;


app.listen(PORT, async () => {
  console.log(`Server is running at ${PORT}`);
//   ConnectDatabase();
});
