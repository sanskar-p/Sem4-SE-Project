const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
    timestamps: true
});

const UserSession = mongoose.model('UserSession', UserSessionSchema);

module.exports = UserSession;