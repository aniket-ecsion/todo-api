import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://aniketecsion:aniketecsion@cluster0.gucigbe.mongodb.net/todo?retryWrites=true&w=majority"
    );

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    connection.on("error", (error) => {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1); // Exit the application in case of a database connection error.
    });
  } catch (error) {
    console.error("Something went wrong while connecting to MongoDB:");
    console.error(error);
  }
}

export default main;
