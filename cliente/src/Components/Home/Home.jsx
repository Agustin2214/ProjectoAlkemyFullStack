import { Link, useNavigate } from 'react-router-dom'
import style from './Home.module.css'
import img from '../../Media/img.jpeg'
import { Button } from 'react-bootstrap'
import { useEffect } from 'react'

export function Home() {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate();


useEffect(() => {
  user?navigate("/balance"):console.log('ok')
}, []);


    return (
      
     <div className={style.app}>
           <img className={style.img}  src={img} alt="asd" />
            
            <p className={style.txt}>Welcome to Balance</p>
<div className={style.btn}>
            <Link to= 'Login'> <Button variant="outline-secondary" size="lg">Login</Button>{' '}</Link>
          <Link to = 'Register'>  <Button variant="outline-secondary" size="lg">Register </Button>{' '}</Link>
            
          </div>
        </div>
        
    )
}
