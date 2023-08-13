import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const {name,value} = e.target;
    if(name === 'email'){
      setEmail(value);
    }else if(name === 'password'){
      setPassword(value);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await fetch('/signin',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,password
      })
    })
    const data = await res.json();
    if(res.status === 400 || !data){
      window.alert("Invalid Signin");
      console.log("Invalid Signin");
    }else{
      window.alert("Signin Successful");
      console.log("Signin Successful");
      navigate("/");
    }
    
  }

  return (
    <div>
        <form method='POST'>
            <input type="text" placeholder="email" name='email' id='email' value={email} onChange={handleChange}></input>
            <input type="text" placeholder="password" name='password' id='password' value={password} onChange={handleChange}></input>
            <button type="submit" name='signin' id='signin' onClick={handleClick}>Sign In</button>
        </form>
    </div>
  )
}

export default Signin