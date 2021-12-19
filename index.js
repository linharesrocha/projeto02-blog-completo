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

    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        });      
    });
});


app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories});
            });  
        }else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
})

app.listen(8080, () => {
    console.log("Server UP!")
});