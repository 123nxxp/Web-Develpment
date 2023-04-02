const express = require("express");
const http = require("https");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.use(bodyParser.urlencoded({extended:true}));

app.post("/", function(req, res){

    // console.log(req.body.cityName) ;
    const city = req.body.cityName ;
    const apiKey = "384c188f81adee31aa2b69e53015be1a";
    const unit = "metric" ;

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city+"&appid="+ apiKey+"&units="+ unit+"" ;
    http.get(url, function(response){
        console.log(response.statusCode);
    
        response.on("data", function(data){
            const weatherData = JSON.parse(data) ;
            // console.log(weatherData);
            const temperature = weatherData.main.temp ;
            const details = weatherData.weather[0].description ;
            const icon = weatherData.weather[0].icon ;
            const imageUrl = "https://openweathermap.org/img/wn/"+ icon+"@2x.png" ;
            // console.log(temperature);
            // console.log(details) ;
            
            res.write("<h1>Temperature at "+ city +" is " + temperature + " degree Celcius</h1>");
            res.write(" <p> The weather is currently " + details + "</p>") ;
            res.write("<img src="+ imageUrl+" >");
            res.send() ;
    
    
       
        })
    }) 

   
    // console.log("Post received successfully");
    // res.send("Server is running");

})


app.listen(3000, function(){
    console.log("server is running at 3000");
})

