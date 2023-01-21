# Spotify WebPlayer SDK using Express and React JS

## Description

A Spotify WebPlayer built on Node.js with an Express.js server and React.js client. Built for usage within a [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview) in the [MultiPlaylists App](https://github.com/riverray121/MultiPlaylists).

Prepared for Heroku deployment if desired: see "heroku-postbuild" in package.json of root directorty.

## Usage

### Run Locally

1. Clone this repository and 'cd' into it
2. Create an app on the [Spotify Developer website](https://developer.spotify.com/dashboard/login)
3. Add <http://localhost:5000/auth/callback> to your redirect URI's of your new Spotify App (Dashbord->Your App->Edit Settings)
4. Copy your Client ID and Client Secret to the '.env' file in the root directory
5. Ensure you have 'nvm' installed and 'node LTS v16.x' installed
6. Run 'nvm use 16'
7. Create the react build:
    * 'cd' into 'client' directory
    * run 'npm install'
    * run 'npm run build'
    * 'cd' back to root directory
8. From the project root directory run 'npm install'
9. Run 'npm start'
10. Open <http://localhost:5000>

### Note for MacOS Users

If you are using a modern Mac you must turn off AirPlay reciever which normally runs on the 5000 port:
System Settings -> General -> AirDrop and Handoff -> AirPlay reciever

## Resources

Built based on [Spotify Tutorial](https://developer.spotify.com/documentation/web-playback-sdk/guide/) with modifications to simplify the proxy.

Infromation on [deployment to Heroku](https://devcenter.heroku.com/articles/deploying-nodejs).
