import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './register.css'

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name:"",email:"",password:"",cpassword:""
  })

  const handleChange = (e) => {
    const {name,value} = e.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]:value
      }
    })
  }

  const postData = async (e) => {
    e.preventDefault();
    const {name,email,password,cpassword} = user;
    const res = await fetch('/register',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,password,cpassword
      })
    })
    const data = await res.json();
    if(res.status === 422 || !data){
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    }else{
      window.alert("Registration Successful");
      console.log("Registration Successful");

      navigate("/signin");
    }
  }


  return (
    <div>
        <form method='POST'>
            <input type="text" placeholder="name" name='name' id='name' value={user.name} onChange={handleChange}></input>
            <input type="text" placeholder="email" name='email' id='email' value={user.email} onChange={handleChange}></input>
            <input type="text" placeholder="password" name='password' id='password' value={user.password} onChange={handleChange}></input>
            <input type="text" placeholder="confirm password" name='cpassword' id='cpassword' value={user.cpassword} onChange={handleChange}></input>
            <button type="submit" name='register' id='register' onClick={postData}>Register</button>
        </form>
    </div>
  )
}

export default Register