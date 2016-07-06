const SESSION_SECRET_DEFAULT = 'IAmASecretPlzDontShareMeYouWillGetMyFamilyKilledOhGodHelpMe1265123!%@!$#!';
const SESSION_SECRET = process.env.SESSION_SECRET;

const SERVER_HOST_DEFAULT = 'http://localhost:1337';
const SERVER_HOST = process.env.SERVER_HOST;

function getSessionSecret () {
  if (!SESSION_SECRET) {
    console.error('WARNING: Undefined $SESSION_SECRET. Using default');
    return SESSION_SECRET_DEFAULT;
  }

  return SESSION_SECRET;
}

function getServerHost () {
  if (!SERVER_HOST) {
    console.error('WARNING: Undefined $SERVER_HOST. Using default');
    return SERVER_HOST_DEFAULT;
  }

  return SERVER_HOST;
}

module.exports = {
  SESSION_SECRET: getSessionSecret(),
  SERVER_HOST: getServerHost(),
  PORT: process.env.PORT || 3000
};
