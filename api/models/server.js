const express = require("express")
const cors = require("cors");
const db = require("../db/connection");
const User = require("../models/user")
const atm = require("../models/atm")
const asociations = require("../models/asociations")

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT

//Rutas
        this.userPath ='/users'
        this.authPath ='/auth'
        this.atmPath  ='/atm'


//Lectura y parseo a JSON
this.app.use(express.json())
//Ejecut base de datos 
        this.dbConnection()
//Middlewates
        this.middlewares()
//Rutas de mi aplicacion
        this.routes()

}

   async dbConnection(){
        try{
                await db.sync({force: false})
                console.log('DB ONLINE')
        }catch(error) {
                throw new Error(error)
        }
   
    }     

    middlewares(){
//Cors
        this.app.use(cors())
//Directorio publico
        this.app.use(express.static('public'));
}

    routes(){
        this.app.use(this.authPath,require('../routes/auth'))
        this.app.use(this.userPath,require('../routes/user'))
        this.app.use(this.atmPath,require('../routes/atm'))
  
}

    listen(){

        this.app.listen(this.port,()=>{
        console.log(`Server running on port`,this.port)
    });
}

}


module.exports = Server;