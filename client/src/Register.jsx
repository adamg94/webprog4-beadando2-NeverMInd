import React from 'react'
import axios from 'axios'
import './sass/LoginPanel.sass' 
import './sass/Register.sass' 


function ShowMessage (k) {
  k.style.visibility = "visible"

  setTimeout(() => {
    k.style.visibility = "hidden"
  }, 2000);
}

class Register extends React.Component{
    
    constructor(props)
    {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);
        this.onChangeInfo = this.onChangeInfo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeisVisible = this.onChangeisVisible.bind(this);
        this.onChangeisLoading = this.onChangeisLoading.bind(this);
       
        this.state = {
            username: '',
            password: '',
            password2:'',
            info: '',
            isVisible : false,
            isLoading: true
          }

    }
    componentDidMount()
    {
      this.setState({
        isLoading: false
      })
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
          onChangeisLoading(e) {
            this.setState({
              isLoading: e.target.value
            })
          }
          onChangeInfo(e) {
            this.setState({
              info: e
            }, () => {

              let d = document.getElementById('info')
              ShowMessage(d)
            })
              
          }
          onChangeisVisible(text)
          {
         
           let d = document.getElementById('info')
            if (d !== null)
            {
              
            
              this.onChangeInfo(text)
            }
            else{

              
                setTimeout(() => {
                  this.onChangeisVisible(text)
                }, 500); //500ms után már talán létre lett hozva a div, ha nem akkor azt írja ki hogy k = null
               }
            
          
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
                  this.onChangeisVisible("The passwords are different!")
                }
                if(newUser.password.length === 0) 
                {
                  this.onChangeisVisible("The passwords are empty!") 
                }
                else if(newUser.username.length < 4)
                {
                  this.onChangeisVisible("Username minimum length 4!")
                }
                else{
                  this.setState({
                    isLoading: true
                
                  })
                      axios.post('http://localhost:5000/users/add', newUser)
                        .then(res => {
                          this.setState({
                            isLoading: false,
                          })
                          this.onChangeisVisible(res.data.message)
                      })
              
                }

             


              //window.location = '/'
          }
    
    
    render () 
    {

      if (this.state.isLoading) 
      { 
          return (
              <div><p>Loading...</p></div>
          )
      }
        return (
          
        <form id="register" onSubmit={this.onSubmit}>
          <div id="info">{this.state.info}</div>
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