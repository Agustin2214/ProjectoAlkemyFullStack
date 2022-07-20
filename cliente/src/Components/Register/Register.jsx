
import {Button,Form,Col,Container,Row} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './Register.module.css'
import login from '../../Media/file-sign-up-svg-1445116.png'
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import authService from "../services/auth-services";




export function Register() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))
 
  const [inputs, setinputs] = useState({
    name:"",
    email:"",
    password:"",

}); 

useEffect(() => {
  user?navigate("/balance"):console.log('ok')
}, []);


function handleChange(e){
  setinputs((previo) => {
        const newState ={ ...inputs,
         [e.target.name]: e.target.value
     }
     return newState
    })
   
  }

  function ValidateEmail(mail) {
    if (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  function ValidarName(name) {
    if (!/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(name)) {
      return false;
    } else {
      return true;
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();


   
    try {
   
      await authService.register(inputs).then((response) => {
       
        alert("Usuario Creado")
          navigate("/login");
        })
      
    } catch (error) {
      error.response.data.msg?alert(error.response.data.msg):
      alert(error.response.data.errors[0].msg)
    }
  }
  

    return (
        <>
            <Container className="mt-5">
            <Row>
        <Col className="text-center" lg={12}  md={12}sm={12}>
      <img src={login} className={style.imglogin} alt="login-icon" />

        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
    
    <Form.Control onChange={handleChange} name='name' className={style.inputs} type="name" placeholder="Enter name" />
    
  </Form.Group>


  <Form.Group className="mb-3" controlId="formBasicEmail">
    
    <Form.Control onChange={handleChange} name='email' className={style.inputs} type="email" placeholder="Enter email" />
    
  </Form.Group>
 

  <Form.Group onChange={handleChange} className="mb-3" controlId="formBasicPassword">
  
    <Form.Control name='password' className={style.inputs} type="password" placeholder="Password" />
  </Form.Group>

  <Form.Group onChange={handleChange} className="mb-3" controlId="formBasicPassword">
  
  <Form.Control name='passwordConfirm' className={style.inputs} type="password" placeholder="Password confirm" />
</Form.Group>
  <div className="d-grid gap-2">
  <Button onClick={(e)=>handleRegister(e)} className={style.btn} variant="primary" size="lg" type="submit">
Create Acount
  </Button>
  </div>
</Form>
        
        </Col>

        

            </Row>

            </Container>
        </>
    )
}
