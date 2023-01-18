const express = require('express')
const request = require('request');
const path = require('path');
const dotenv = require('dotenv');

// Spotify API / PlayerSDK access token 
global.access_token = ''

dotenv.config()

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET
var spotify_redirect_uri = process.env.SPOTIFY_REDIRECT_URI

var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// Create Express App 
var app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Spotify Auth Redirect 
app.get('/auth/login', (req, res) => {

    var scope = "streaming \
    user-read-email \
    user-read-private"

    var state = generateRandomString(16);

    var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state
    })

    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());

});

// Spotify Auth Callback 
app.get('/auth/callback', (req, res) => {

    var code = req.query.code;

    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: spotify_redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        access_token = body.access_token;
        res.redirect('/')

        // console.log(access_token)
      }
    });

});

// Get Spotify Token 
app.get('/auth/token', (req, res) => {
    res.json({ access_token: access_token })
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


// Express Server Port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})