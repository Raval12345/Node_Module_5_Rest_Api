const libexpress = require('express')

const taskrouter = require('./router')

const app = libexpress();

app.use(libexpress.json());

app.use(taskrouter);



app.listen(4000,()=>{

  console.log("Server Staretd On Port 4000.....")

})