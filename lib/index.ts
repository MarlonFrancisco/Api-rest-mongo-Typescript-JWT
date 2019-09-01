import app from "./app";
import "dotenv/config";

app.listen(process.env.PORT, () => {
    console.log(`PORT: ${process.env.PORT}\nENV: ${process.env.NODE_ENV}`);
});
