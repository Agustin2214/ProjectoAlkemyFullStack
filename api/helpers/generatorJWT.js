const jwt = require('jsonwebtoken')


const generatorJWT = (uid = '') =>{
    return new Promise((resolve,reject)=>{
        const payload = {uid};

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'
        },(err,token)=>{
            if(err){
                console.log(err)
                reject('No se pudo genera el token')
            } else{
                resolve( token )
            }
        })



    })

}


module.exports = generatorJWT