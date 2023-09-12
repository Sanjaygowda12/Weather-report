const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apiKey = "f74d6d5b6b8c92d9bcd58ddefd186c7a";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit

    https.get(url,function(response){
        console.log(response.statusCode+" "+response.statusMessage);

        response.on("data", function(data){

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

            
            res.write("<h1>Temperature in "+query+" is now "+temp+" degrees Celsius </h1>");
            res.write("<p> The Weather currently is "+weatherDescription+ "</p>");
            res.write("<img src="+imageURL+">");
            
            res.send();

            // console.log(temp);
            // console.log(weatherDescription);
        });

    });

});

app.listen(3000,function () {
   console.log("Server started on port 3000:"); 
});

