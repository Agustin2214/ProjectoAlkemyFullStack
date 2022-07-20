import { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Button, Col, Container,Nav,Row } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import style from "./Balance.module.css"
import { NavBarBalance } from "../NavBarBalance/NavBarBalance";


export function Balance() {

const user = JSON.parse(localStorage.getItem("user"))
let valueFilter = localStorage.getItem("valueFilter")
const [balance, setBalance] = useState([]);
const [totalall, setTotalall] = useState([])


function getBalance(){
    axios.get(`http://localhost:3001/users/allatmuser?id=${user.user}` ).then((response) =>{setBalance(response)}).catch((err) => console.log("err", err))
}


//eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
    
    getTotal()
    getBalance()
    getTotalAll()
    
}, []);

function getTotalAll(){
  axios.get(`http://localhost:3001/users/total?id=${user.user}` ).then((response) =>{setTotalall(response)}).catch((err) => console.log("err", err))
}



function  handleDelete(e){
  let uid =  e.target.name

  
 axios.delete(`http://localhost:3001/atm?uid=${uid}`).then((response) => {
  alert(response.data)
  

    console.log(response.data)}).then(axios.get(`http://localhost:3001/users/allatmuser?id=${user.user}&type=${valueFilter}` ).then((response) =>{
      setBalance(response)
      getTotalAll()
    }).catch((err) => setBalance.data.atms([])))
    
  
 
    axios.get(`http://localhost:3001/users/allatmuser?id=${user.user}&type=${valueFilter}` ).then((response) =>{
      setBalance(response)
      getTotalAll()
    }).catch((err) => setBalance.data.atms([]))
}

function getTotal(){
    let total = 0
    balance?.data?.atms?.map(e=>{
        if(e.type === 'add'){
            total = total + e.value
        }else{
            total = total - e.value
        }
     })
     return total
}

let total = getTotal()


function handleClick(e){

let type = e.target.name==='all'?' ':e.target.name
localStorage.setItem('valueFilter', type)

  axios.get(`http://localhost:3001/users/allatmuser?id=${user.user}&type=${type}` ).then((response) =>{setBalance(response)}).catch((err) => { setBalance([])})

}

return (
    <div className={style.back}>

    <div >
    <NavBarBalance/>
    <h1 className={style.name}>{balance?.data?.name} balance</h1>
    </div>
    <nav>
    <Nav variant="pills" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link onClick={(e)=>handleClick(e)} name='all' eventKey="link-0">All</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={(e)=>handleClick(e)} name='add' eventKey="link-1">Add</Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link onClick={(e)=>handleClick(e)} name='substract' eventKey="link-2">Substract</Nav.Link>
      </Nav.Item>
    
    <Link to='/post'><Button className={style.btnpost} variant="outline-success">Post Transacction</Button>{' '}</Link>
    </Nav>
    
    </nav>
    
    
    
    {balance?.data?.atms.length>0?
        
    <Table size="lg" striped bordered hover variant="dark">
     
      <thead>
        <tr>
          <th>Value</th>
          <th>Name</th>
          <th>Type</th>
          <th>Date</th>
          <th size='sm'>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      
      <tbody>
      {balance?.data?.atms?.map(e=>{ 
    
        return <tr >
          <td className={e.type==='add'?style.tradd:style.trsub} >{e.value}</td>
          <td className={e.type==='add'?style.tradd:style.trsub} >{e.name}</td>
          <td className={e.type==='add'?style.tradd:style.trsub} >{e.type}</td>
          <td className={e.type==='add'?style.tradd:style.trsub} >{e.date}</td>
          
           <td> <Link  to={"/edit/" + e.uid}> <Button keys={e.uid} >Edit</Button></Link></td>  
          <td><Button keys={e.uid} name={e.uid} onClick={(e)=>handleDelete(e)} variant="danger">Delete</Button>{' '}</td>
        </tr>
        
     })}
     <tr>
     <th className={style.total} ></th>
     <th className={style.total} ></th>
     <th className={style.total} ></th>
     <th className={style.total} >Total of the last 10 transactions</th>
     <th size="sm" className={style.total}  >$ {total}
</th>
     <th className={style.total} ></th>
     </tr>
     <tr>
     <th className={style.total} class={"bg-info"}></th>
     <th className={style.total} class={"bg-info"}></th>
     <th className={style.total} class={"bg-info"}></th>
     <th className={style.total} class={"bg-info"}>Total of all transactions</th>
     <th size="sm" className={style.total} class={"bg-info"} >$ {totalall?.data?.totalF}</th>
     <th className={style.total} class={"bg-info"}></th>
     </tr>
      </tbody>
    </Table>:
    <div>
    <h1> Balance not found</h1>
    <h3>Your balance is without transactions. Please enter a transaction </h3>
    <div><Link to='/post'> <Button>Post first transaction</Button> </Link></div>
    </div>
    }
  
    
    </div>
  );
}
 




