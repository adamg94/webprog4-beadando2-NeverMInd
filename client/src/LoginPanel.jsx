import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { setInStorage, getFromStorage } from './utils/storage'
import './sass/LoginPanel.sass' 
import './sass/UserPanel.sass' 

function ShowMessage (k) {
  k.style.visibility = "visible"

  setTimeout(() => {
    k.style.visibility = "hidden"
  }, 2000);
}

class LoginPanel extends React.Component{
    constructor(props)
    {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeInfo = this.onChangeInfo.bind(this);
        this.onChangeisVisible = this.onChangeisVisible.bind(this);
        this.onChangeisLoading = this.onChangeisLoading.bind(this);
        this.onChangeToken = this.onChangeToken.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onLogout = this.onLogout.bind(this);

        this.state = {
            isLoading: true,
            token: '',
            username: '',
            signedName: '',
            password: '',
            info: '',
            isVisible : false
        }

    }
    componentDidMount() {
      const obj = getFromStorage('web4_beadando2')
            if(obj && obj.token)
            {
              const data = {
                token: obj.token,
                username: obj.username
              }
              
                axios.post('http://localhost:5000/users/verify', data)
                  .then(res => {
                    
                    if(res.data.success)
                      { 
                               
                        this.setState({
                          isLoading : false,
                          token : res.data.token,
                          signedName : data.username
                          })

                         
                      }
                    else
                      {
                        
                        this.setState({
                          isLoading : false
                          })
                      }

                })
            }
            else
            {
              this.setState({
                isLoading : false
                })
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
          onChangeisLoading(e) {
            this.setState({
              isLoading: e.target.value
            })
          }
          onChangeToken(e) {
            this.setState({
              token: e.target.value
            })
          }

    
          onSubmit(e) {
            
            e.preventDefault()
            const User = {
                username: this.state.username,
                password: this.state.password
              }

              if(User.username.length < 4)
                {
                  
                  this.onChangeisVisible("Username minimum length 4!")
                }
                else if(User.password.length === 0)
                {
                  
                  this.onChangeisVisible("The passwords are empty!")
                }
                else{
                    this.setState({
                        isLoading: true
                    
                      })
                     
                          axios.post('http://localhost:5000/users/login', User)
                          .then(res => {
                            if(res.data.success)
                            {
                              
                                this.onChangeisVisible(res.data.message)
                                this.setState({
                                    isLoading : false,
                                    username: res.data.username,
                                    signedName : res.data.username,
                                    token: res.data.token
                                })
                                setInStorage('web4_beadando2',{ token: res.data.token, username: res.data.username})
                            }
                            else{
                              this.onChangeisVisible(res.data.message)
                              this.setState({
                                
                                isLoading : false
                            })
                            }

                          })
                     
                  }
                      

          }
          
          onLogout(e)
          {
            
            e.preventDefault()
            this.setState({
              isLoading : true
            })
            const obj = getFromStorage('web4_beadando2')
            if(obj && obj.token)
            {
              const data = {
                token: obj.token,
                username: obj.username
              }
              axios.post('http://localhost:5000/users/logout', data)
                .then(res => {
                  if(res.data.success)
                  {
                    this.setState({
                      token: '',
                      isLoading : false
                    })
                  }
                  else{
                    this.setState({
                      isLoading : false
                    })
                  }
                })
            }
            else{
              this.setState({
                isLoading : false
              })
            }
          }
    
    render () 
    {
      
        if (this.state.isLoading) 
        {
          
           
            return (
                <div><p>Loading...</p></div>
            )
        }
        
        
        if (!this.state.token){
        return (
            <form onSubmit={this.onSubmit}>
                <div id="info">{this.state.info}
                </div>
                
                <fieldset>
                    <legend>Login</legend>
                <label htmlFor="name">Username: </label>
                <input type="text" id="name" name="name" value={this.state.username} onChange={this.onChangeUsername} />
    
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" value={this.state.password} onChange={this.onChangePassword} />
    
                <input type="submit" value="Login" />
    
                <Link to="/register">Register</Link>
                </fieldset>
            </form>
        )
    }
    else
    {
        return (
            <form onSubmit={this.onLogout}>
                <div id="info">{this.state.info}</div>
                <fieldset>
                    <legend>Hello {this.state.signedName}!</legend>
                        <p>
                            You are logged in!
                        </p>
                    <input type="submit" value="Logout" />
                </fieldset>
            </form>
        )
    }
   
    }
 }

export default LoginPanel