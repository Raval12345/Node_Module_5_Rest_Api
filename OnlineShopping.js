const libexpress = require('express')

const productsrouters = require('./router')

const app = libexpress();

app.use(libexpress.json());

app.use(productsrouters);



app.listen(4000,()=>{

  console.log("Server Staretd On Port 4000.....")

})