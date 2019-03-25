const burger = require("../models/burger");
const express = require("express");

const router = express.Router();

router.get("/", function(req,res){
    burger.show(function(data){
        let handleObject = {
            burgers: data
        };
        res.render("index", handleObject);
    })
})

router.put("/api/burgers/:id", function(req,res){
    let condition = `id = ${req.params.id}`;
    let isDevoured = `devoured = ${req.body.devoured}`;
    burger.update(isDevoured, condition, function(result){
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.status(200).end();
          }
    })
})

router.post("/api/burgers", function(req,res){
    let col1 = 'burger_name'
    let burgerName = req.body.burger_name;
    console.log(burgerName);
    burger.add(col1,burgerName, function(result){
        res.json({ id: result.insertId });
    })
});

router.delete("/api/burgers/:id", function(req,res){
    let id = req.params.id;
    burger.delete('id', id, function(){
        res.end();
    })
});

module.exports = router;