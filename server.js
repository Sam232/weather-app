const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const geoCode = require("./httpRequest/geocode");
const weather = require("./httpRequest/weather");

var port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");

var app = express();
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var log = req.originalUrl;
  fs.appendFileSync("server.log", log + "\n", (error) => {
    console.log(`Error Message: ${error}`);
  });
  next();
});

app.get("/location/:name", (req, res) => {
  geoCode.geoCode(req.params.name, (geoCodeInfor, error) => {
    if(geoCodeInfor){
      var weatherResult = weather.weather(geoCodeInfor.geometry.location, (response) => {
        res.render("index.hbs", {
          imageURL: "http://www.noaa.gov/sites/default/files/styles/crop_394x394/public/thumbnails/image/FocusArea__Weather-02.jpg?itok=fO6wu2A8",
          location: geoCodeInfor.formatted_address,
          temperature: response.temperature,
          apparentTemperature: response.apparentTemperature,
          humidity: response.humidity,
          pressure: response.pressure,
          weatherSummary: response.summary
        });
      });
    }
    else{
      res.render("pageError", {
        error: error
      });
    }
  });


});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
