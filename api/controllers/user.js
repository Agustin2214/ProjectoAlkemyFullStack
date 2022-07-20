const User = require("../models/user")
var bcrypt = require('bcryptjs')
const { validationResult } = require("express-validator")
const atm = require("../models/atm")
const generatorJWT = require("../helpers/generatorJWT")
const e = require("express")




const userGet = async (req,res)=>{

const user= await User.findAll()

res.json(user)
} 

const userGetAtm = async (req,res)=>{
  const {id,type} = req.query 

  if(!type){
  const useratm= await User.findByPk(id,{
    include:{
      order: [['date', 'DESC']],
      limit: 10,
      model: atm,
      attributes:['name','type','value','date','uid']
    }
  })  
  if(useratm){
  res.json(useratm)}else{
    res.status(404).json({msg: 'Not found'})
  }
}else{
  const useratm= await User.findByPk(id,{
    include:{
       limit: 10 ,
      where:{type: type.toString()},
      model: atm,
      attributes:['name','type','value','date','uid']
    } 
  })
  if(useratm){
  res.json(useratm)}else{
    res.status(404).json({msg: 'Not found'})
  }
}

  }



const userPost = async (req,res)=>{
    let  {name, password,email}  = req.body;
    console.log(name)
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json(errors)
    } 

  try{

  const user = new User({name, password,email})

  const existsUser = await User.findOne({where:{email: email}})
  
  if(existsUser){
    return res.status(400).json({msg: 'correo ya registrado'})
  }

  const salt = bcrypt.genSaltSync()
  user.password = bcrypt.hashSync(password, salt)

  await user.save();
  const token = await generatorJWT(user.id)

  res.json({
            user,
            token
        });
}catch(error){
    console.log(error)
    res.json({msg: error})
  }
}

const userGetAtmTotal = async (req,res)=>{
  const {id} = req.query 

 const useratm= await User.findByPk(id,{
    include:{
      model: atm,
      attributes:['value','type']
    }
  })

console.log(useratm.atms)
  function getTotal(){
    let total = 0
    useratm.atms?.map(e=>{
      
        if(e.type === 'add'){
            total = total + e.value
        }else{
            total = total - e.value
        }
     })
     return total
}
let totalF = getTotal()
  res.json({totalF}) 
}

module.exports = {
    userGet,
    userPost,
    userGetAtm,
    userGetAtmTotal

}