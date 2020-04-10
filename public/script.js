;
((d,c,io)=>{
 const alias = prompt('Ingrese un alias:')
 if(alias != null && alias.length>0){
  const chatForm = d.getElementById('chat-form'),
   chatMessage = d.getElementById('chat-message'),
   chat = d.getElementById('chat')

  io.emit('user connect', {name:alias})
  
  chatForm.addEventListener('submit',e=>{
   e.preventDefault()
   chat.insertAdjacentHTML('beforeend',`<li class="primary">${chatMessage.value}</li>`)
   io.emit('new message', {user:alias,message:chatMessage.value})
   chatMessage.value=null
   return false
  })

  io.on('new user',newUser=>alert(newUser.message))

  io.on('user message',messageUser=>{
   if(messageUser.user!=alias) 
    chat.insertAdjacentHTML('beforeend',`<li class="secondary">${messageUser.user}: ${messageUser.message}</li>`)
  })

  io.on('bye user',byeUser=>{
   alert(byeUser.message)
  })
 }else{
  location.reload(true)
 }
})(document,console.log,io());
