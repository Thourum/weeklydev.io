'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  admin: {
    type: Boolean,
    required: true
  },
  team: [{
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Team'
  }],
  project: [{
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Project'
  }],
  survey: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Survey'
  },
  is_searching: {
    type: Boolean,
    default: true,
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  token: {
    full: String,
    uuid: String,
    valid: Boolean
  },
  salt: String
});

UserModel
  .path('password')
  .validate(function (password) {
    return password.length;
  }, 'Password cannot be blank');

var validatePresenceOf = function (value) {
  return value && value.length;
};

UserModel
  .pre('save', function (next) {
    // Handle new/update passwords
    if (!this.isModified('password')) {
      return next();
    }

    if (!validatePresenceOf(this.password)) {
      return next(new Error('Invalid password'));
    }

    // Make salt with a callback
    this.makeSalt((saltErr, salt) => {
      if (saltErr) {
        return next(saltErr);
      }
      this.salt = salt;
      this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
        if (encryptErr) {
          return next(encryptErr);
        }
        this.password = hashedPassword;
        next();
      });
    });
  });

UserModel.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  authenticate(password, callback) {
    if (!callback) {
      return bcrypt.compareSync(password, this.password);
    }

    bcrypt.compare(password, this.password, (err, res) => {
      if (err) {
        return callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  /**
   * Make salt
   *
   * @param {Number} byteSize Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  makeSalt(rounds, callback) {
    var defaultRounds = 10;
    if (typeof arguments[0] === 'function') {
      callback = arguments[0];
      rounds = defaultRounds;
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    }

    if (!rounds) {
      rounds = defaultRounds;
    }

    if (!callback) {
      return bcrypt.genSaltSync(rounds);
    }

    return bcrypt.genSalt(rounds, (err, salt) => {
      if (err) {
        callback(err);
      } else {
        callback(null, salt);
      }
    });
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  encryptPassword(password, callback) {
    if (!password || !this.salt) {
      return null;
    }

    var salt = this.salt;

    if (!callback) {
      return bcrypt.hashSync(password, salt).toString('base64');
    }

    return bcrypt.hash(password, salt, (err, key) => {
      if (err) {
        callback(err);
      } else {
        callback(null, key.toString('base64'));
      }
    });
  }
};

module.exports = mongoose.model('User', UserModel, 'users');
