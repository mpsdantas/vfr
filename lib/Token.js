const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token: 'String'
});

mongoose.model('Tokens', tokenSchema);