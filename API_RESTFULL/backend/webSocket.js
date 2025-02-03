const usersToSend = [];
const users = [];
const helps = [];

// Este código estaba al final del todo pero me parecía que tenía más lógica arriba
function sendMessage(message) {
  users.forEach((user) => {
    user.ws.send(JSON.stringify(message));
  })
}

server.on('connection', (ws, incoming_request) => {
  const u = { username: incoming_request.url.split("=")[1]};
  ws.username = u.username;
  const userRef = { ws };
  usersToSend.push(userRef)
  users.push(u);
  console.log("create");
  console.log(users);

  sendMessage({
    users,
    helps
  })

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      // Checking if the message is a valid one
      if (typeof data.type !== 'string') {
        console.error('Invalid message, is not string message');
        return;
      }

      if(data.type == 'ask for help'){
        helps.push({
          helper: data.helper,
          helped: data.helped,
          timeStamp: data.timestamps
        })
      };

      if(data.type == 'next please'){
        for (let i = 0; i < helps.length; i++) {
          if(helps[i].helper == data.helper && helps[i].helped == data.helped) {
            helps.splice(i,1);
          }
        }
      };

      sendMessage({users, helps});
    } catch (e) { console.error('Error pasing message!', e)}
  })

  ws.on('close', (code, reason) => {
    for (let i = 0; i < users.length; i++) {
      console.log(users[i]);
      if(users[i].username === ws.username){
        users.splice(i,1);
        usersToSend.splice(i,1);
      }
    }
    console.log("final");
    console.log(users);
  });
});

module.exports = setUpWebSocket;