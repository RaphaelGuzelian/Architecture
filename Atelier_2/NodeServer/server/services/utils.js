export  function excludeMyName(myUsername, users) {
    return users
      .filter(user => user !== myUsername)
      .map(username => ({
        key: username,
        text: username,
        value: username,
      }));
  }




  