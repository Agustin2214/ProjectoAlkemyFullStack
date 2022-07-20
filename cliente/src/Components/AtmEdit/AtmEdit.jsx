import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import {Button,Form,Col,Container,Row} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './AtmEdit.module.css'

export function AtmEdit() {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();
   
    const { id } = useParams()
    const [inputs, setinputs] = useState({
        name:"",
        value:"",
        date:"",
        type:"",
    
    }); 


    useEffect(() => {
      user?getId():navigate("/register")

   

    }, []);

let userAux = user?user.user:'not user'
console.log(2,inputs) 
   async function getId(){
      await  axios.get(`http://localhost:3001/atm/id?uid=${id}&id=${userAux}`).then((response) =>{setinputs(response.data)}).then().catch((err) => {
                                                                                                                      alert(err.response.data.msg)
                                                                                                                      navigate("/balance") })
    } 
 



function handleChange(e){
    setinputs((previo) => {
          const newState ={ ...inputs,
           [e.target.name]: e.target.value
       }
       return newState
      })
     
    }

async function handleSumbit(e){
    e.preventDefault();
    await  axios.put(`http://localhost:3001/atm/`,inputs).then((response)=>{alert(response.data)}).catch((err) => alert(err))
    navigate("/balance")
    
}

    return (
        <div>
                        <Container className="mt-5">
            <Row>
        <Col className="text-center" lg={12}  md={12}sm={12}>
      

        <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    
    <Form.Control autoComplete="off" onChange={handleChange} className={style.inputs} value={inputs.name}  type="text" name='name' />
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
  
    <Form.Control onChange={handleChange} className={style.inputs} value={inputs.value} type="text" name='value' />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
  
  <Form.Control  onChange={handleChange} className={style.inputs} value={inputs.date} type="date" name='date'  />
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicPassword">
  
  <Form.Control disabled='on' onChange={handleChange} className={style.inputs} value={inputs.type} type="text" name='type' />
</Form.Group>
  <div className="d-grid gap-2">
  <Button onClick={(e)=>handleSumbit(e)} className={style.btn}  variant="primary" size="lg" type="submit">
Update
  </Button>
  </div>
</Form>
        
        </Col>

        

            </Row>

            </Container>
        </div>
    )
}
