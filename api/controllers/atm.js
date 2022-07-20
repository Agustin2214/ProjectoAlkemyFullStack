const Atm = require("../models/atm")
var bcrypt = require('bcryptjs')
const { validationResult } = require("express-validator")

 
const atmGet = async (req,res)=>{

    const atms= await Atm.findAll()
    
    res.json(atms)
    }

 const atmGetId = async (req,res)=>{ 
      let {uid,id} = req.query
   
     console.log(id)

      const atm = await Atm.findOne({ where: { uid: uid } })

    
  if(atm.userUid === id){

      atm?res.json(atm):res.status(404).json({msg:'Not Found Transaction'})
      
    }else{
      res.status(404).json({msg:'Not Found Transaction'}) 
    }  
      }      
 
 
    const atmPost = async (req,res)=>{
        let  {name,type,userUid,value,date}  = req.body
        
        const errors = validationResult(req)
        if(!errors.isEmpty()){
          return res.status(400).json(errors)
        }
    
      try{
    
      const atm = new Atm({name, type,userUid,value,date}) 
    
    
    
      
        await atm.save();
      
      res.send("transaction created");
    }catch(error){
        console.log(error)
        res.send({msg: error})
      }
    }
    

    const atmPut = async (req,res)=>{
      let { uid,name,value,date} =req.body
      const atm = await Atm.findOne({ where: { uid: uid } });

      
      await atm.update({ 
                          name: name,
                          value: value,
                          date:date
                        })
     res.send("transaction edited");    
 }
  
 const atmDelete = async (req,res)=>{
   
  let {uid} =req.query  
  console.log(uid)
  await Atm.destroy({
    where: {
      uid: uid
    }})
 res.send("transaction destroy");    
}




    module.exports={
        atmGet,
        atmPost,
        atmPut,
        atmDelete,
        atmGetId
    }