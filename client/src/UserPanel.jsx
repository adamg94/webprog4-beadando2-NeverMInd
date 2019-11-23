import React from 'react'
import { Link } from 'react-router-dom'
import './sass/LoginPanel.sass' 
import './sass/UserPanel.sass' 


class LoginPanel extends React.Component{
    render () 
    {
        return (
        <form>
            <fieldset>
                <legend>Login</legend>
             <label htmlFor="name">Username: </label>
             <input type="text" id="name" name="name" />
 
             <label htmlFor="password">Password: </label>
             <input type="password" id="password" name="password" />
 
             <input type="submit" value="Login" />
 
             <Link to="/register">Register</Link>
            </fieldset>
        </form>
        )
    }
 }


class UserPanel extends React.Component{
   render () 
   {
       return (
       <form>
           <fieldset>
            <legend>username</legend>
            
            <Link to="/logout">Logout</Link>
           </fieldset>
       </form>
       )
   }
}
export {LoginPanel, UserPanel}