const express = require("express")
const ejs =require("ejs")
const app = express()
const faker  = require("faker")
const https = require("http")
const server = https.createServer(app)
const Contenedor = require("./utilities/ContenedorArchivos")
const datos = new Contenedor("./views/db/mensaje.json")
const {normalizeM, proMath} = require("./utilities/normalize")
const {denormalize} =  require("normalizr")

const fs = require("fs")
/*-----------------------*/
//FAKER PRODUCTOS
let array = []
app.set("port",process.env.PORT || 8080)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("views", __dirname+"/views");
app.set("view engine","ejs")
for(let i = 0 ; i < 5; i++){
array.push( {
        nombre: faker.commerce.productName(),
        precio: faker.commerce.price(),
        img: faker.image.imageUrl()
    })
   // console.log(array)
}
/*-----------------------*/
//RUTAS 
app.get("/api/productos-test",async(req,res) =>{
res.render("index.ejs",{compresion:proMath,data:array,mensArr:normalizeM})
})

/*-----------------------*/
//SOCKET MESSAGES

const { Server } = require("socket.io");
const { deserialize } = require("v8")
const io = new Server(server)
io.on("connection", (socket) => {
 console.log("Usuario Conectado")

 
socket.on("data_client", async(data) => {  
      //console.log(data);  
     
     
        await datos.savea(data)

        const desnorm =  desnormalize(data)
        //console.log(desnorm)
        socket.emit("message_back", desnorm)   
  //console.log(normalizeM)
      
         


  });
socket.emit("productos",array)

})  

/*-----------------------*/
//ESCUCHAR SERVIDOR 
server.listen(`${app.get("port")}`,()=>{
    console.log(`Server on port ${app.get("port")}`)
})