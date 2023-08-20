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
    <div className="container">
      <form method="POST">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="name"
            name="name"
            id="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            placeholder="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="text"
            placeholder="confirm password"
            name="cpassword"
            id="cpassword"
            value={user.cpassword}
            onChange={handleChange}
          />
        </div>
        <div className="button-container">
          <button type="submit" name="register" id="register" className='auth-button' onClick={postData}>
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register