import { express } from "express";
import "dotenv";

const app = express();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server is running on", port);
});
