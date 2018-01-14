const request = require("request");

const weather = (geometry, callback) => {
  request({
    url: `https://api.darksky.net/forecast/aabd6bcd035b5da21a84ea63fd70eaa1/${geometry.lat},${geometry.lng}`,
    json: true
  }, (error, response, body) => {
    if(body.currently){
      callback(body.currently);
    }
    else{
      callback(body.error);
    }
  });
}

module.exports.weather = weather;
