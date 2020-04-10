const c = console.log,
 express= require('express'),
 app= express(),
 http=require('http').createServer(app),
 io = require('socket.io')(http),
 port=process.env.PORT||3000,
 publicDir = express.static(`${__dirname}/public`)


app
 .use(publicDir)
 .get('/',(req,res)=>res.sendFile(`${__dirname}/index.html`))

http.listen(port,()=>c(`Start Chat in port: ${port}`))

io.on('connection',socket=>{
 socket.on(
  'user connect',
  user=> socket.broadcast.emit('new user',{message:`Ingreso el usuario ${user.name} al chat!`})
 )

 socket.on(
  'new message',
  messageUser=> io.emit('user message',messageUser)
 )

  socket.on(
   'disconnect',()=>{
    const message='Ha salido un usuario del chat'

    c('Ha salido un usuario del chat')

    socket.broadcast.emit(
     'bye user',{message})
   }
  )
})
