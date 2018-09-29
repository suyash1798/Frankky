module.exports = function(io,User,_){
    const userData = new User();
    io.on('connection',socket=>{
      socket.on('refresh',data=>{
         io.emit('refreshPage',{});
      });

      socket.on('online',data => {
          console.log('room',data.room);
          socket.join(data.room);
          userData.EnterRoom(socket.id,data.user,data.room);
          const list = userData.GetList(data.room);
          io.emit('usersOnline',_.uniq(list))
      });

      socket.on('disconnect',(data)=>{
          console.log('i m in disconnect',data.id);
          const user = userData.RemoveUser(data.id);
          if(user){
              const userArray = userData.GetList(user.room);
              const arr = _.uniq(userArray);
              _.remove(arr, n => n === user.name);
              console.log(arr);
              io.emit('usersOnline',arr);
          }
      })
    });
};