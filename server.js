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
    res.send("SHOW ME THE MOVIES    ")
});


app.get("/api/scraping", function(req, res){
    request("http://www.afi.com/100Years/quotes.aspx", function(error, response, html){
        const $ = cheerio.load(html);
        let scrapeArr = [];
        // let quoteArr = [];
        // let movieArr = [];
        // let yearArr = [];
        $("td.lttext").each(function(i, element){
            const title = $(element).text();
            const link = $(element).find("p").text();
            scrapeArr.push(link);
        })
        scrapeArr.splice([0], 4);
        scrapeArr.pop();
        //scrape array division here
        // console.log("quotes: ", quoteArr);
        // console.log("movies: ", movieArr);
        // console.log("year", yearArr);

        // db.scrapedData.insert({test: practArr})

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