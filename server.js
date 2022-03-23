const express = require("express");
const app = express();
app.use("/js", express.static(__dirname + "/js"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.listen(8888, () => {
    console.log("The server is up and running!");
});
