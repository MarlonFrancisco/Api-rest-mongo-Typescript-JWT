import * as mongoose from "mongoose";

const { DB_URL } = process.env

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
});

mongoose.promise = global.Promise;

const db = mongoose.connection;

db.on("error", (err: Error) => console.log(err));
db.on("open", () => console.log("Connection open!"));

export default mongoose;
