const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
  body: {type: Object, required: true},
  created_at : { type : Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);