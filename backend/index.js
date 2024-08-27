const express = require("express");
const cors = require("cors");
const connectToDb = require("./src/db/connect");
const { seedDatabase } = require("./src/controllers/places");
require("dotenv").config();
const placesRoutes = require("./src/routers/places");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1", placesRoutes);

const PORT = 5001;

const start = async () => {
  try {
    await connectToDb(process.env.DATABASE_URI);
    // await seedDatabase();
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  } catch (error) {
    throw error("unable to connect to db");
  }
};

start();
