// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


app.get('/api/:date', (req, res) => {
  let { date } = req.params;

  //if the date is undefined return the current date
  if (date === undefined) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  //lets check if the date is a valid ISO date or unix timestamp
  let parseDate = isNaN(date) ? new Date(date) : new Date(parseInt(date));

  //if the date is invalid
  if (parseDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  //Return the unix timestamp and UTC string
  return res.json({
    unix: parseDate.getTime(),
    utc: parseDate.toUTCString()
  });
});

app.get('/api', (req, res) => {
  const now = new Date();
  return res.json({ unix: now.getTime(), utc: now.toUTCString() });
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
