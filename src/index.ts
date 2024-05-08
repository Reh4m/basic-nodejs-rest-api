import express from "express";
import routes from "./routes";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`🚀 Server ready at ${PORT}`);
});
