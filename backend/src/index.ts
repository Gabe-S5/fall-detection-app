import app from "./app";
import { sequelize } from "./config/db";

const PORT = process.env.PORT || 5000;
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync db:", err);
  });
