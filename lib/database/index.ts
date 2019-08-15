import * as mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
});
mongoose.promise = global.Promise;

const db = mongoose.connection;

db.on("error", (err: Error) => console.log(err));
db.on("open", () => console.log("Connection open!"));

export default mongoose;
