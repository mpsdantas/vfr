let secret = "default";

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('./Token');
const Token = mongoose.model('Tokens');

exports.getTokenRequest = (req) => {
    return req.body.token || req.query.token || req.headers['x-access-token'] || req.params.token;
};

exports.getToken = (informations = true, timeExpiresHours = 24) => {
    timeExpiresHours = `${timeExpiresHours}h`;
    let token = jwt.sign(informations, secret, { expiresIn: timeExpiresHours });
    return token;
};

exports.saveToken = async (token) => {
    if (!token) return { token: false, msg: "No token provided.." };
    const _token = new Token({
        token: token
    });
    await _token.save();
    return true;
}

exports.destroyToken = async (token) => {
    if (!token) return { token: false, msg: "No token provided.." };
    const _token = await Token.deleteOne({ token: token });
    if (_token.n !== 0) return true;
    else return false;
};

const decoded = exports.decoded = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded);
        });
    });
}

exports.analyzer = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.params.token;
    if (!token) return res.status(404).json({ token: false, msg: "No token provided.." });
    Token.findOne({ token: token }, (err, data) => {
        const _token = data;
        if (!_token) return res.status(203).json({ status: false, renovarToken: false, tokenTrue: false, msg: "Token not valid." });
        jwt.verify(token, secret, (err, decoded) => {
            const dataToken = decoded;
            const time = new Date().getTime();
            if (time > (dataToken.exp * 1000)) return res.status(203).json({ status: false, renovarToken: true, tokenTrue: false, msg: "User not authorized." });
            next();
        });
    });
};

exports.use = (keySecret) => {
    secret = keySecret;
};


