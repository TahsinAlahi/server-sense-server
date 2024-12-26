const app = require("./app");
const { client } = require("./database");
const port = process.env.PORT || 3000;

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(port, () => {
      console.log(`Server running on port http://localhost:${port}`);
    });
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));
