// userService.js
const users = {};

const userService = {
  addUser: (socketId, username) => {
    users[socketId] = { username, socketId };
  },

  removeUser: (socketId) => {
    delete users[socketId];
  },

  getUser: (socketId) => {
    return users[socketId];
  },

  getUserList: () => {
    return Object.values(users).map(user => user.username)
  },

  getIDbyName: (name) => {
    for (const [socketId, user] of Object.entries(users)) {
      if (user.username === name.login) {
        return socketId;
      }
    }
  },

};

module.exports = userService;