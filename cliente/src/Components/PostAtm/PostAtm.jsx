import {  useState } from "react";
import { useNavigate} from "react-router-dom"
import axios from "axios";
import {Button,Form,Col,Container,Row} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './PostAtm.module.css'




export function PostAtm() {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();
    const [inputs, setinputs] = useState({
        name:"",
        value:"",
        date:"",
        type:"",
        userUid: user.user
    }); 


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

            try{
            await  axios.post(`http://localhost:3001/atm/`,inputs).then((response)=>{alert(response.data)})
            navigate("/balance")
        } catch(error){
            error.response.data.msg?alert(error.response.data.msg):
            alert(error.response.data.errors[0].msg)

        }
            
        }

      










    return (
        <div>
                                   <Container className="mt-5">
            <Row>
        <Col className="text-center" lg={12}  md={12}sm={12}>
      

        <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    
    <Form.Control autoComplete="off" onChange={handleChange} className={style.inputs}  type="text" name='name' placeholder='name' />
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
  
    <Form.Control onChange={handleChange} className={style.inputs}  type="number" name='value' placeholder='value' />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
  
  <Form.Control  onChange={handleChange} className={style.inputs}  type="date" name='date' placeholder='date' />
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicPassword">
  
<Form.Select className={style.inputs} onChange={handleChange}  name='type' aria-label="Default select example">
        <option>Select Type</option>
        <option value="add">add</option>
        <option value="substract">substract</option>
    </Form.Select>
</Form.Group>
  <div className="d-grid gap-2">
  <Button onClick={(e)=>handleSumbit(e)} className={style.btn}  variant="primary" size="lg" type="submit">
Create 
  </Button>
  </div>
</Form>
        
        </Col>

        

            </Row>

            </Container> 
        </div>
    )
}
