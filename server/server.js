import express from "express";
import cors from "cors";
import router from "./router/routes.js";
import connectDatabase from "./database/connect.js";




const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api", router);


// API routes






const port = 8080;



// Start the server when we have a valid DB connection
try {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
  });
} catch (error) {
  console.log("Cannot connect to the server");
}

