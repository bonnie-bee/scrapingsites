const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const db = require("./models");


const app = express();


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGOLAB_BLUE_URI || "mongodb://localhost/scrapingSecrets";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// app.get("/", function (req, res) {
//     res.render("index");
// });


app.get("/api/scraping", function (req, res) {
    request("https://postsecret.com/", function (error, response, html) {
        const $ = cheerio.load(html);
        let getPic=1;
        $("img.alignnone").each(function (i, element) {
            const link = $(element).attr("src");
            db.Picture.create({ pictureSrc: link }, function(err){
                if(err){
                    let message= "You've already scraped all the secrets this week. Come back on Sunday for more.";
                    console.log("These already exist!");
                    res.send(message);
                    getPic=2;
                }
            })
            console.log(getPic);
            if(getPic=2)
            {return false};
        })
        

    })
})

app.get("/showMeTheScrapes", function (req, res) {
    db.Picture.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })
})

app.get("/showMeTheScrapes/:id", function(req, res){
    db.Picture.find({"_id": req.params.id}, function(err, data) {

    } )
})

app.listen(3001, function () {
    console.log("Run! Quickly! To port 3001!")
});