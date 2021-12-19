const express = require("express");
const app = express();
const connection = require("./database/database");

const CategoriesController = require("./categories/CategoriesController");
const ArticlesController = require("./articles/ArticlesController");

// View engine
app.set("view engine", "ejs");

// Static
app.use(express.static("public"));

// Body parser
app.use(express.urlencoded ({extended: true}));
app.use(express.json());

// Database
connection.authenticate().then(() => {
    console.log("Conection UP!")
}).catch((error) => {
    console.log(error)
    console.log("Conection DOWN!")
});


app.use("/", CategoriesController);
app.use("/", ArticlesController);

app.get("/", (req, res) => {
    res.render("index");
});


app.listen(8080, () => {
    console.log("Server UP!")
});