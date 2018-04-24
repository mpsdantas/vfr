#Verify Route - (VFR)

[![NPM](https://img.shields.io/badge/npm-v5.6.0-blue.svg?style=for-the-badge)](https://www.npmjs.com/) 
[![NODE](https://img.shields.io/badge/node-v9.0.0-blue.svg?style=for-the-badge)](https://nodejs.org/en//)

<p align="center"> 
 <img width="200px;" src="https://image.ibb.co/gVT7dc/68747470733a2f2f63646e2e706978616261792e636f6d2f70686f746f2f323031342f30342f30332f31302f30392f6865646765686f672d3330393935385f3634302e706e67.png">
</p>


##About
 
<div style="text-align: justify"> 
Vfr is middleware based on the jsonwebtoken module that has the intention of acting as a "blocker" of private routes. Exactly for this reason I decided to choose a thorn hog as a mascot of this module because it conveys an idea of "protection" by its carcass made of thorns preventing its natural predators from killing it.
</div>

## Install

To install vfr-module, execute the following command:

`$ npm install -i vfr-module --save-exact`

## Using

```js
const vfr = require('vfr-module');
vfr.use("mySecret");
module.exports = (application) => {
	
	//Router protected	
	application.get('/api/hello', vfr.analyzer, (req, res) =>{res.send('Hello');});	
	
        //Get token
	application.get('/api/token',(req,res)=>{
		const token = vfr.getToken({tipoUser:"admin",nomeUser:"mpsdantas"},36);
		res.status(200).json({token});
	});
	
	//Decoded one token
	application.get('/api/decoded/:token', (req,res)=>{
		const token = req.params.token;
		vfr.decoded(token,(err,decoded)=>{
			res.status(200).json(decoded);
			return;
		});	
	});

};
```

