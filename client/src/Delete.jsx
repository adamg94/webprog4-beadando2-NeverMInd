import React from 'react'
import axios from 'axios'
import { getFromStorage } from './utils/storage'
import './sass/Delete.sass' 
const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}

let SELECTEDINDEX = -1

function ShowMessage (k) {
    k.style.visibility = "visible"
  
    setTimeout(() => {
      k.style.visibility = "hidden"
    }, 2000);
  }
  function MakeClickListener()
  {
    setTimeout(() => {
        let gombok = document.querySelectorAll('#changebutton')
            gombok.forEach((e, idx) => {
            e.addEventListener("click", () => {
                SELECTEDINDEX = idx
            })
    })
    }, 500);
    
  }
  const Movie = props => (    
        <table>
            <tbody>
                <tr>
                    <td colSpan="2"><span>Title:</span>{props.movie.name}</td>      
                </tr>
                <tr>
                    <td colSpan="2"><span >Release date:</span>{new Date(props.movie.creation_date).toLocaleDateString('hu', options)}</td>      
                </tr>
                <tr>
                    <td ><span >IMDb:</span>{props.movie.imdb_points}</td>
                    <td ><span >Length:</span>{props.movie.length_in_minutes + " minutes"}</td>
                </tr>
                <tr>
                    <td ><span >Director:</span>{props.movie.director}</td>
                    <td ><span >Writer:</span>{props.movie.writer}</td>
                </tr>
                <tr>
                    <td colSpan="2"><span >Stars:</span>{props.movie.stars}</td>
                </tr>
                <tr>
                    <td colSpan="2"><input id="deletebutton" type="submit" value="Delete" /></td>
                </tr>
            </tbody>
        </table>
)
class Delete extends React.Component{
   
    constructor(props)
    {
        super(props)

        this.onChangeisVisible = this.onChangeisVisible.bind(this)
        this.onChangeisLoading = this.onChangeisLoading.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.MovieList = this.MovieList.bind(this)
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
            signedName : '',
            info: '',
            movies: []
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
                              signedName : data.username,
                              level: res.data.level
                          })    
                          MakeClickListener()
                          if(res.data.level !== 1)
                          {
                            this.onChangeisVisible("You have no rights to see this page1!")
                          }
                          else
                          {
                            axios.get('http://localhost:5000/movies/')
                            .then(res2 => {
                                this.setState({
                                    movies: res2.data
                                })
                            })
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
    MovieList()
    {
        
        return this.state.movies.map(film => {
            return <Movie movie ={film} key={film._id} />
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
    
   
    onSubmit(e)
    {
      
        e.preventDefault()
        axios.post('http://localhost:5000/movies/delete/' + this.state.movies[SELECTEDINDEX]._id )
            .then(res => {
                console.log(res)
        })
        window.location = '/delete/'
        
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
    {
    
        return(
            <form onSubmit={this.onSubmit} id="list_table_div">
               { this.MovieList() }
               
            </form>
            
        )
       
    }
    
       else
       {
        return(
           
            <div id="info2">{this.state.info}</div>
            )
       }
       
   }
}
export default Delete