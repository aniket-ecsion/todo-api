import mongoose from "mongoose"

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://aniketecsion:aniketecsion@cluster0.gucigbe.mongodb.net/todo?retryWrites=true&w=majority');
  console.log("connetced")
}

export default main;