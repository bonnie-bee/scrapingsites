const express = require("express");
const mongojs = require("mongojs");
const request = require("request");
const cheerio = require("cheerio");

const app = express();

const database = "scrapingTimes";
const collections = ["theTimes"];
const db = mongojs(database, collections);
db.on("error", function(error) {
    console.log("databse error: ", error);
});

app.get("/", function(req, res){
    res.send("WHAT TIME IS IT")
});


app.get("/api/scraping", function(req, res){
    request("https://www.timeanddate.com/worldclock/", function(error, response, html){
        const $ = cheerio.load(html);
        $("td.rbi").each(function(i, element){
            const title = $(element).text();
            // const link = $(element).children().attr("href");

            db.scrapedData.insert({article: title})
        })
    })
    res.send("Butts!")
})

app.get("/api/showMeTheScrapes", function(req, res){
    db.scrapedData.find({}, function(err, data){
        if(err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })
})

app.listen(3000, function() {
    console.log("Check out Port 3000")
});