import * as mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/api", {
    useNewUrlParser: true,
    useCreateIndex: true,
});
mongoose.promise = global.Promise;

const db = mongoose.connection;

db.on("error", (err: Error) => console.log(err));
db.on("open", () => console.log("Connection open!"));

export default mongoose;
