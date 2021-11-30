const {normalize,schema} = require("normalizr")
const util = require("util")
const obj = require("../views/db/mensajes.json")

const AuthorsSchema = new schema.Entity("author")

const mensajesSchema = new schema.Entity("mensajes",{
    user: AuthorsSchema
})
const mensajesPack = new schema.Entity("chat",{
    author: AuthorsSchema,
    mensajes: [mensajesSchema]
   

   

})
const normalizeM = normalize(obj,mensajesPack)
function print(objeto){
    console.log(util.inspect(objeto,false,12,true))
}
//print(normalizeM)

console.log("Objeto 1"+" "  + JSON.stringify(normalizeM).length)
console.log("Objeto 2"+" "  + JSON.stringify(obj).length)
const procentaje  =  (JSON.stringify(obj).length / JSON.stringify(normalizeM).length -1) * 100
console.log(procentaje)
const proMath =  Math.floor(procentaje)+"%"
console.log(proMath)
module.exports = {normalize, proMath} 


