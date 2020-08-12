const express = require("express");
const path = require("path");
const hbs = require("hbs");
const request = require("request");
const forecast = require("./Utils/foreCast");
const geoCode = require("./Utils/geoCode");

const app = express();
//define path to express
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../views/views");
const partialDirectoryPath = path.join(__dirname, "../views/partials");

//setup handlebar n view folder
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
hbs.registerPartials(partialDirectoryPath);

//setup static directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Pranesh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Pranesh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "Help Message",
    title: "Help",
    name: "Pranesh",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "Please Provide Address",
    });
  } else {
    geoCode(
      req.query.address,
      (error, { longitude, latitude, location } = {}) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        forecast(latitude, longitude, (error, foreCastData) => {
          if (error) {
            return res.send({
              error: error,
            });
          }
          res.send({
            forcast: foreCastData,
            location: location,
            address: req.query.address,
          });
        });
      }
    );
  }
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "Please Provide Search value",
    });
  } else {
    res.send({
      products: [],
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "pranesh",
    errormessage: "Help Article Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "pranesh",
    errormessage: "page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is Up");
});
