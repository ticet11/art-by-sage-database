if (process.env.NODE_ENV !== "production") require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(
    cors({
        credentials: true,
        origin: "https://art-by-sage.herokuapp.com",
    })
);
app.use(express.json());

const galleryRouter = require("./routes/gallery");
app.use("/gallery", galleryRouter);

const userRouter = require("./routes/users");
app.use("/users", userRouter);

const mailRouter = require("./routes/mail");
app.use("/mail", mailRouter);

app.listen(process.env.PORT || 3000, () =>
    console.log("Server Started")
);
