const request = require("request");

var geoCode = (location, callback) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}`,
    json: true
  }, (error, response, body) => {
    if(body.status === "OK"){
      callback(body.results[0], undefined);
    }
    else if(body.status === "ZERO_RESULTS"){
      callback(undefined, "Invalid address passed to url.");
    }
    else{
      callback(undefined, "Unable to make a request to the API Server.");
    }
  });
}

module.exports.geoCode = geoCode;
