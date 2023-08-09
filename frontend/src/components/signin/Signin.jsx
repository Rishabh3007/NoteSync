import React from 'react'

const Signin = () => {
  return (
    <div>
        <form >
            <input type="text" placeholder="email" name='email' id='email'></input>
            <input type="text" placeholder="password" name='password' id='password'></input>
            <button type="submit" name='signin' id='signin'>Sign In</button>
        </form>
    </div>
  )
}

export default Signin