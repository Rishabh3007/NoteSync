import React from 'react'

const Register = () => {
  return (
    <div>
        <form >
            <input type="text" placeholder="name" name='name' id='name'></input>
            <input type="text" placeholder="email" name='email' id='email'></input>
            <input type="text" placeholder="password" name='password' id='password'></input>
            <input type="text" placeholder="confirm password" name='cpassword' id='cpassword'></input>
            <button type="submit" name='register' id='register'>Register</button>
        </form>
    </div>
  )
}

export default Register