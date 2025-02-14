var waitingList = {};


function joinFight(myUsername, myCardList) {
    const valuesArray = Object.values(waitingList);
    if (Object.keys(waitingList).length === 0) {
      waitingList["username"] = myUsername;
      waitingList["cardList"] = myCardList;
      // console.log("pass1")
    } else {
      console.log("WAITING", waitingList)
      const tempWaitingList = waitingList 
      waitingList = {}
      // console.log("pass2")

      return [tempWaitingList["username"], tempWaitingList["cardList"], myUsername, myCardList, true]
    }

    return [myUsername,myCardList,null,[],false]
}


// Export de la fonction joinFight
module.exports = { joinFight };