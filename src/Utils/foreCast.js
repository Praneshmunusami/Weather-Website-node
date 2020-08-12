const request = require("request");
const forecast = (latitude, lognitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=ca8dd78d9a6609ceb951295d87784fa5&query=" +
    latitude +
    "," +
    lognitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.error) {
      callback("Unable to find location.Try Search again", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is Currently " +
          body.current.temperature +
          " degree out.But it Feels like " +
          body.current.feelslike +
          " degree. The humidity is " +
          body.current.humidity
      );
    }
  });
};

module.exports = forecast;
