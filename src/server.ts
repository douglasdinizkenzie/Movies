import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database is connected!");
    app.listen(3000, () => {
      console.log("Server is running on PORT 3000!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
