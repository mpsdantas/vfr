var secret = "default";
const jwt = require('jsonwebtoken');
exports.analyzer = (req, res, next)  => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        return next();
    });
};
exports.decoded = (token,cb)=>{
    jwt.verify(token, secret, (err, decoded)=>{
        cb(err,decoded);
    });
}
exports.getToken = (informations=true,timeExpiresHours=24) => {
    timeExpiresHours = `${timeExpiresHours}h`;
    let token = jwt.sign(informations, secret, {expiresIn: timeExpiresHours});
    return token;
};
exports.use = (keySecret) =>{
    secret = keySecret;
};
