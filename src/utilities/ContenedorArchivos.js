
const fs = require("fs")





class ContenedorArchivos {
    constructor(ruta){
       this.ruta = "/Users/Cami/Desktop/Progrmación/Curso CoderHouse/Backend/Desafios/09/src/views/db/mensajes.json"
    }
     listAlla(){
     
let all =  fs.readFileSync(this.ruta,"utf-8")
console.log(all)
     return JSON.parse(all)
    console.log("No se pudo traer todo en 'ContedeorArchivos'")
       
    }
     listByida(id) {
        try{
            let all =  this.listAlla()
            let ItembyID =  all.find(o=> o.id = id)
            return ItembyID
        }

    catch{
        console.log("No se pudo traer por ID en 'ContedeorArchivos'")
    }
}
async savea(obj){
const all = await this.listAlla()
  
  
  try {
    let newObj  = {id:obj.id,obj}
  all.mensajes.push(newObj)
  console.log(all)
  await fs.writeFileSync(this.ruta, JSON.stringify(all, null,2))
    return newObj

  

  } catch (error) {
    console.log(error)
  }

}
/*async saveInto(id,id_prod) {


const idP =this.listByida(id_prod) 
const products = [
    {
    id: idP.id,
    timestamp: idP.timestamp,
    nombre: idP.nombre,
descripcion: idP.descripcion,
codigo: idP.codigo,
imagen: idP.imagen,
precio: idP.precio,
stock: idP.stock


  }
]
console.log(idP)
return products








}*/
async deleteAlla(){
    await fs.writeFileSync(this.ruta, JSON.stringify([], null, 2))
}
async deletebyIda(id){
    const all = await this.listAlla()
    const idF =  all.find(i => i.id == id)
    if(idF == -1){
      console.log("no se pudo encontrar el id")

    }

  console.log(idF)
try {
  await fs.writeFileSync(this.ruta, JSON.stringify(all, null,2))
} catch (error) {
  throw new Error(`No se pudo eliminar con el id ${error}:`)
}
  
}

}
console.log("Anda ")


module.exports = ContenedorArchivos