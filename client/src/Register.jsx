import React from 'react'
import axios from 'axios'
import './sass/LoginPanel.sass' 
import './sass/Register.sass' 


class Register extends React.Component{
    
    constructor(props)
    {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);
        this.onChangeInfo = this.onChangeInfo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

       
        this.state = {
            username: '',
            password: '',
            password2:'',
            info: ''
          }

    }

          onChangeUsername(e) {
            this.setState({
              username: e.target.value
            })
          }
          onChangePassword(e) {
            this.setState({
              password: e.target.value
            })
          }
          onChangePassword2(e) {
            this.setState({
              password2: e.target.value
            })
          }
        
          onChangeInfo(e) {
            
            this.setState( {
              info: e           
            },
            ()=>{
              console.log(e)
            })   
          }
          
    
          onSubmit(e) {
            e.preventDefault()
            const newUser = {
                username: this.state.username,
                password: this.state.password,
                password2: this.state.password2
              }
              
                if(newUser.password !== newUser.password2)
                {
                  this.onChangeInfo("The passwords are different!")
                }
                if(newUser.password.length === 0) 
                {
                  this.onChangeInfo("The passwords are empty!") 
                }
                else if(newUser.username.length < 4)
                {
                  this.onChangeInfo("Username minimum length 4!") 
                }
                else{
                          axios.post('http://localhost:5000/users/add', newUser)
                          .then(res => {
                            this.onChangeInfo(res.data.message)

                          
                          })
              
                }

             


              //window.location = '/'
          }
    
    
    render () 
    {
        return (
          
        <form id="register" onSubmit={this.onSubmit}>
          <div value={this.state.info} onChange={this.onChangeInfo} id="info">{this.state.info}</div>
            <fieldset>
                <legend>Register</legend>
                <table>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td><input required type="text" name="username" id="username" value={this.state.username} onChange={this.onChangeUsername} /></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input required type="password" name="password" id="password" value={this.state.password} onChange={this.onChangePassword}/></td>
                        </tr>
                        <tr>
                            <td>Confirm password</td>
                            <td><input required type="password" name="password2" id="password2" value={this.state.password2} onChange={this.onChangePassword2}/></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input type="submit" value="Register" /></td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        </form>
        )
    }
 }

export default Register