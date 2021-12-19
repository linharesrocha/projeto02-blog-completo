const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
    res.send("Testando rota home admin")
});

router.get("/admin/categories/new", (req, res) => {
    res.send("Testando rota home user")
});

module.exports = router;