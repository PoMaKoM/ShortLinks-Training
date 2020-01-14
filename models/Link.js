const { Schema, model, Types } = require('mongoose')


const schema = Schema({
  UrlLong: { type: String, require: true },
  UrlShort: { type: String, require: true },
  code: { type: String, require: true },
  date: { type: String, require: true, default: Date.now },
  redirects: { type: Number, require: true, default: 0 },
  owner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Link', schema)