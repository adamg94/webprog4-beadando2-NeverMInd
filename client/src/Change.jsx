import React from 'react'
import axios from 'axios'
import { getFromStorage } from './utils/storage'
import './sass/Insert.sass' 


const URI = window.location.pathname.split('/change/')[1]


function ShowMessage (k) {
    k.style.visibility = "visible"
  
    setTimeout(() => {
      k.style.visibility = "hidden"
    }, 2000);
  }
class Change extends React.Component{
   
    constructor(props)
    {
        super(props)
        
        this.OnChangeTitle = this.OnChangeTitle.bind(this)
        this.OnChangeImdb = this.OnChangeImdb.bind(this)
        this.OnChangeRdate = this.OnChangeRdate.bind(this)
        this.OnChangeMlength = this.OnChangeMlength.bind(this)
        this.OnChangeDirector = this.OnChangeDirector.bind(this)
        this.OnChangeWriter = this.OnChangeWriter.bind(this)
        this.OnChangeStars = this.OnChangeStars.bind(this)
        this.onChangeInfo = this.onChangeInfo.bind(this)
        this.onChangeisVisible = this.onChangeisVisible.bind(this)
        this.onChangeisLoading = this.onChangeisLoading.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            title : '',
            imdb : 0,
            rdate : 0,
            mlength : 0,
            director : '',
            writer : '',
            stars : '',
            isLoading : true,
            level : 0,
            username : '',
            info: '',
            token: ''
        }
        
    }
    componentDidMount()
    {
        const obj = getFromStorage('web4_beadando2')
        if(obj && obj.token)
            {
                const data = {
                    token: obj.token,
                    username: obj.username
                }
            
                axios.post('http://localhost:5000/users/verify', data)
                    .then(res => {

                          this.setState({
                              isLoading : false,
                              username : data.username,
                              level: res.data.level,
                              token: res.data.token
                          })    
                         
                          

                          axios.get('http://localhost:5000/movies/' + URI)
                            .then(res => {
                                this.setState({
                                    title : res.data.name,
                                    imdb : res.data.imdb_points,
                                    rdate : res.data.creation_date.split('T')[0],
                                    mlength : res.data.length_in_minutes,
                                    director: res.data.director,
                                    writer : res.data.writer,
                                    stars : res.data.stars
                                })
                            })


                          if(res.data.level !== 1)
                          {
                            this.onChangeisVisible("You have no rights to see this page1!")
                          }
                })
            }
            else
            {
                this.setState({
                    isLoading : false
                })
                this.onChangeisVisible("You have no rights to see this page2!")
            }
        
            
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

          let d = document.getElementById('info2')
          ShowMessage(d)
        })
          
      }
      onChangeisVisible(text)
      {
     
       let d = document.getElementById('info2')
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
    OnChangeTitle(e){
        this.setState({
            title : e.target.value
        })
    }
    OnChangeImdb(e){
        this.setState({
            imdb : e.target.value
        })
    }
    OnChangeRdate(e){
        this.setState({
            rdate : e.target.value
        })
    }
    OnChangeMlength(e){
        this.setState({
            mlength : e.target.value
        })
    }
    OnChangeDirector(e){
        this.setState({
            director : e.target.value
        })
    }
    OnChangeWriter(e){
        this.setState({
            writer : e.target.value
        })
    }
    OnChangeStars(e){
        this.setState({
            stars : e.target.value
        })
    }
    
    onSubmit(e)
    {
        this.setState({
            isLoading : true
        })
        e.preventDefault()


        
        if(this.state.level !== 1)
        {
            this.setState({
                isLoading : false
            })
            this.onChangeisVisible("You have no rights to visit this page!")
        }
        else if(this.state.level === 1)
        {
            if(this.state.title < 1)
            {
                this.onChangeisVisible("Title must be given!")
            }
               else if(this.state.imdb === 0)
               {
                this.onChangeisVisible("IMDB Score must be given!")
               }
               else if (this.state.rdate === 0)
               {
                this.onChangeisVisible("Release date must be set!")
               }
               else if(this.state.mlength === 0)
               {
                this.onChangeisVisible("Movie length must be set!")
               }
               else if(this.state.director.length < 1)
               {
                this.onChangeisVisible("Director is empty!")
               }
               else if(this.state.writer.length < 1)
               {
                this.onChangeisVisible("Writer is empty!")
               }
               else if(this.state.stars.length < 1)
               {
                this.onChangeisVisible("There are no stars given!")
               }
                   
               const Movie = {
                id : URI,
                title : this.state.title,
                imdb : this.state.imdb,
                rdate : this.state.rdate,
                mlength : this.state.mlength,
                director : this.state.director,
                writer : this.state.writer,
                stars : this.state.stars,
                token: this.state.token,
                username: this.state.username
            }
               axios.post('http://localhost:5000/movies/update', Movie)
                .then(res => {
                    console.log(res.data.message)
                    this.onChangeisVisible(res.data.message)
                    this.setState({
                            isLoading : false
                        })     
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
    if (this.state.level === 1)
       return (
        <form onSubmit={this.onSubmit} id="insert_form">
            
            <table>
                <tbody>
                    <tr>
                        <td><label htmlFor="title">Movie title</label></td>
                        <td><input value={this.state.title} onChange={this.OnChangeTitle} required id="title" type="text" /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="imdb">IMDB Score</label></td>
                        <td><input value={this.state.imdb} onChange={this.OnChangeImdb} required step="0.1" id="imdb" type="number" /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="rdate">Release date</label></td>
                        <td><input value={this.state.rdate} onChange={this.OnChangeRdate} required id="rdate" type="date" /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="length">Length (minutes)</label></td>
                        <td><input value={this.state.mlength} onChange={this.OnChangeMlength} required id="length" type="number" /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="director">Director</label></td>
                        <td><input value={this.state.director} onChange={this.OnChangeDirector} required id="director" type="text" /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="writer">Writer</label></td>
                        <td><input value={this.state.writer} onChange={this.OnChangeWriter} required id="writer" type="text" /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="stars">Stars</label></td>
                        <td><textarea value={this.state.stars} onChange={this.OnChangeStars} required id="stars" placeholder="Separate by commas."></textarea></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><input type="submit" value="Update"/></td>
                    </tr>
                </tbody>
            </table>
            <div style={{position: "relative"}} id="info2">{this.state.info}</div>
        </form>
       )
       else
       {
        return(
           
            <div id="info2">{this.state.info}</div>
            )
       }
       
   }
}
export default Change