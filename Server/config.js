'use strict';

const JWT_SECRET_DEFAULT = 'MememememmememexkådkksokfopsekfskfdfpkapkdapwkdpakdpokpokkkKPOKPOKPKkPOkPkpkPkpkPOkPOkPkPkkpkpkpKpOKpOKPOKPkPokPkpKpkPkppkmememems';
const JWT_SECRET = process.env.JWT_SECRET;

const MONGO_URL_DEFAULT = 'mongodb://localhost:27017/WOIP-backend'
const MONGO_URL = process.env.MONGO_URL;

function getJWTSecret() {
  if (!JWT_SECRET){
    console.error("WARNING: Undefined $JWT_SECRET. Using default.")
    return JWT_SECRET_DEFAULT
  };

  return JWT_SECRET;
}

function getMongoUrl() {
  if (!MONGO_URL) {
    console.error("WARNING: Undefined $MONGO_URL. Using default")
    return MONGO_URL_DEFAULT;
  }

  return MONGO_URL;
}

module.exports = {
  JWT_SECRET: getJWTSecret(),
  MONGO_URL: getMongoUrl(),
  PORT: process.env.PORT || 1337
}
