const express = require("express");
const app = express();
const connection = require("./database/database");

const CategoriesController = require("./categories/CategoriesController");
const ArticlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

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

    Article.findAll().then(articles => {
        res.render("index", {articles: articles});
    });
});


app.listen(8080, () => {
    console.log("Server UP!")
});