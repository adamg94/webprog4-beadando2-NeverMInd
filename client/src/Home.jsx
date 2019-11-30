import React from 'react'
import './sass/Home.sass' 
class Home extends React.Component{
   render () 
   {
       return (
        <div id="homediv">
            <p>This is a CRUD - Create Read Update Delete API. Or RESTful API.</p>
            <p>It uses the MERN Stack method: MongoDB, Express, React, NodeJS</p>
            <hr />
            <p>This application is based on a Movie database</p>
        </div>
       )
   }
}
export default Home