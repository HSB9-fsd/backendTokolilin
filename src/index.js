require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const router = require("./routes/router");
const handleError = require("../middlewares/handleError");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors({origin: true, credentials: true}));

app.use(express.static(path.join("upload")));

app.use("/", router);
app.use(handleError);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Oke Sip Lanjut ${process.env.SERVER_PORT}`);
});
