import {Button,Form,Col,Container,Row} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './Login.module.css'
import login from '../../Media/IconLogin.svg'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth-services"


export function Login() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))


  const [inputs, setinputs] = useState({
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



  const handleSumbit = async (e) => {
    
    e.preventDefault();
    


   
    try {
   
      await authService.signup(inputs).then((response) => {
       console.log(response)
        alert('Usuario Logeado Correctamante')
          navigate("/balance");
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
        <Col  lg={12}  md={12}sm={12}>
      <img src={login} className={style.imglogin} alt="login-icon" />

        <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    
    <Form.Control onChange={handleChange} className={style.inputs} type="email" name='email' placeholder="Enter email" />
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
  
    <Form.Control onChange={handleChange} className={style.inputs} type="password" name='password' placeholder="Password" />
  </Form.Group>
  <div className="d-grid gap-2">
  <Button onClick={(e)=>handleSumbit(e)} className={style.btn} variant="primary" size="lg" type="submit">
Login
  </Button>
  </div>
</Form>
        
        </Col>

        

            </Row>

            </Container>
        </>
    )
}
