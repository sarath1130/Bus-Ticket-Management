var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/BusManagementSystem");
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});

var app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/sign_up", function (req, res) {
  var manager_id = req.body.manager_id;
  var manager_name = req.body.manager_name;
  var bus_number = req.body.bus_no;
  var bus_name = req.body.bus_name;
  var seat_count = req.body.seat_count;
  var from_place = req.body.from_place;
  var to_place = req.body.to_place;

  var data = {
    ManagerName: manager_name,
    ManagerID: manager_id,
    BusNumber: bus_number,
    BusName: bus_name,
    SeatCount: seat_count,
    Form: from_place,
    To: to_place,
  };
  db.collection("BusDetails").insertOne(data, function (err, collection) {
    if (err) throw err;
  });

  return res.redirect("index.html");
});

// login for manager--------------------------------------------
app.post("/manager_login", function (req, res) {
  var manager_username = req.body.manager_username;
  var manager_password = req.body.manager_password;

  db.collection("ManagerLogin").findOne(
    { UserName: manager_username, Password: manager_password },
    function (err, res_values) {
      if (err) throw err;
      if (res_values) return res.redirect("manager.html");
      else {
        return res.redirect("index.html");
      }
    }
  );
});
//-----------------------------------------------------------------------

// login for Passenger--------------------------------------------
app.post("/passenger_login", function (req, res) {
  var passenger_username = req.body.passenger_username;
  var passenger_password = req.body.passenger_password;

  db.collection("PassengerLogin").findOne(
    { UserName: passenger_username, Password: passenger_password },
    function (err, res_values) {
      if (err) throw err;
      if (res_values) return res.redirect("passenger.html");
      else {
        // res.sendFile(__dirname + "index.html")
        return res.redirect("index.html");
      }
    }
  );
});
//-----------------------------------------------------------------------

// signup for manager--------------------------------------------
app.post("/manager_signup", function (req, res) {
  var manager_username = req.body.name;
  var manager_password = req.body.password;

  var data = {
    UserName: manager_username,
    Password: manager_password,
  };

  db.collection("ManagerLogin").insertOne(data, function (err, collection) {
    if (err) throw err;
  });

  return res.redirect("index.html");
});
//-----------------------------------------------------------------------

// signup for Passenger--------------------------------------------
app.post("/passenger_signup", function (req, res) {
  var passenger_username = req.body.name;
  var passenger_password = req.body.password;

  data = {
    UserName: passenger_username,
    Password: passenger_password,
  };

  db.collection("PassengerLogin").insertOne(data, function (err, collection) {
    if (err) throw err;
  });

  return res.redirect("index.html");
});
//-----------------------------------------------------------------------

// retrieving a specific bus details.
app.post("/retrieve", function (req, res) {
  var bus_num = req.body.bus_num;

  db.collection("BusDetails").findOne(
    { BusNumber: bus_num },
    function (err, result) {
      if (err) throw err;
      if (result) {
        res.send(
          "<h1> BusNumber " +
            result.BusNumber +
            "</h1><br>" +
            "<h1>Location From" +
            result.Form +
            " to " +
            result.To +
            "<h1>"
        );
      } else res.send("<h1>No Buses Found");
    }
  );
});

app.post("/retrieve_all", function (req, res) {
  db.collection("BusDetails").find({}, function (err, result) {
    if (err) throw err;
    if (result) {
      var str = "";
      for (var i = 0; i < result.length; i++) {
        str =
          "<h1>" +
          1 +
          ".</h1><br>" +
          "<h3> BusNumber " +
          result.BusNumber +
          "</h3><br>" +
          "<h3>BusName" +
          result.BusName +
          "</h3><br>" +
          "<h3>Location From" +
          result.Form +
          " to " +
          result.To +
          "</h3> " +
          "<br><br><br>";
      }
      res.send("" + str);
    } else res.send("<h1>No Buses Found</h1>");
  });
});
app
  .get("/", function (req, res) {
    res.set({
      "Access-control-Allow-Origin": "*",
    });
    return res.redirect("index.html");
  })
  .listen(3000);

console.log("server listening at  http://localhost:3000/");
