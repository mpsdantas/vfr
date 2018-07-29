# Verify Route - (VFR)

[![NPM](https://img.shields.io/badge/npm-v5.6.0-blue.svg?style=for-the-badge)](https://www.npmjs.com/) 
[![NODE](https://img.shields.io/badge/node-v9.0.0-blue.svg?style=for-the-badge)](https://nodejs.org/en//)

In the module I used these versions of the node and npm but nothing prevents you from using previous versions.

<p align="center"> 
 <img width="200px;" src="https://image.ibb.co/gVT7dc/68747470733a2f2f63646e2e706978616261792e636f6d2f70686f746f2f323031342f30342f30332f31302f30392f6865646765686f672d3330393935385f3634302e706e67.png">
</p>


## About
 
<div style="text-align: justify"> 
Vfr is middleware based on the jsonwebtoken module that has the intention of acting as a "blocker" of private routes. Exactly for this reason I decided to choose a thorn hog as a mascot of this module because it conveys an idea of "protection" by its carcass made of thorns preventing its natural predators from killing it.
</div>

## Install

To install vfr-module, execute the following command:

`$ npm install -i vfr-module --save-exact`

## Using

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/vfr-basic', { useNewUrlParser: true });
mongoose.Promise = global.Promise; // → Queremos que o mongoose utilize promises ES6
mongoose.connection.on('error', err => {
    console.log(`🙅 🚫 → ${err.message}`);
});

const bodyParser = require('body-parser');

const vfr = require('vfr-module');
vfr.use('myKeySecret');

const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* ROUTER FREE */
app.get('/', (req, res) => {
    res.send('Hello world');
});

/* GET ONE TOKEN */
app.get('/getToken', async (req, res) => {
    const tokenUser = vfr.getToken({user:'mpsdantas'}); // Get token of json {user: 'mpsdantas'}
    await vfr.saveToken(tokenUser); // Saving the token in database
    return res.status(200).json({token:tokenUser}); // send the token
});

/* BLOCK ROUTER */
app.get('/hiApi/:token', vfr.analyzer /* Analizer the router*/, async (req, res, next) => {
    const data = await vfr.decoded(vfr.getTokenRequest(req)); // Decoded token
    res.status(200).json({data: data}) //Send data
});

app.listen('3000', () => {
    console.log(`➡➡➡ The server is online: http://localhost:3000/ ☻`)
});

};
```
## Methods

`vfr.analyzer(req, res, next)`

This method is used to block the desired routes, it must be applied as a middleware of your route.

`vfr.getToken({data:"mydata},timeExpiresInHours)`

This method is responsible for generating valid tokens for application.

`await vfr.decoded(token)`

This method is responsible for decoding the token information. (Promisse)

`vfr.use(secret)`

This method is responsible for setting your secret key.

`vfr.getTokenRequest(request)`

This method returns the token sent by the user in the request.

`vfr.saveToken(token);`

This method saves the token in the database.

## Informations

Exemple: https://github.com/mpsdantas/vfr-basic

E-mail: mpsdantas15@gmail.com

GitHub: http://github.com/mpsdantas

Repo: http://github.com/mpsdantas/vfr
