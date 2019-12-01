import React from 'react'
import { Link } from 'react-router-dom'
import './sass/Navigation.sass'
class Navigation extends React.Component{
   render () 
   {
       return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/list">List</Link></li>
                <li><Link to="/insert">Insert</Link></li>
                <li><Link to="/update">Update</Link></li>
                <li><Link to="/delete">Delete</Link></li>
            </ul>
        </nav>
       )
   }
}
export default Navigation