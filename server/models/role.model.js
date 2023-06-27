const monogoose = require('mongoose');

const roleSchema = new monogoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  value: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = monogoose.model('Role', roleSchema);