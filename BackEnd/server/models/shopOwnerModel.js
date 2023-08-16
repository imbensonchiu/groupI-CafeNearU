const pool = require('../util/db');

module.exports = {
  basicInfoUpdate: () => {
    return 'basic info update';
  },
  menuUpdate: () => {
    return 'menu update';
  },
  statusUpdate: () => {
    return 'status update';
  },
  seatTypeUpdate: () => {
    return 'seat type update';
  },
  profilePub: ()  => {
    return 'profile publish';
  },
  profileUnpub: () => {
    return 'profile unpublish';
  },
};
