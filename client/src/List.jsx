import React, { Component } from 'react';
import axios from 'axios'
import './sass/List.sass'
const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
const Movie = props => (
            <table>
                <tbody>
                    <tr>
                        <td colSpan="2"><span>Title:</span>{props.movie.name}</td>      
                    </tr>
                    <tr>
                        <td colSpan="2"><span>Release date:</span>{new Date(props.movie.creation_date).toLocaleDateString('hu', options)}</td>      
                    </tr>
                    <tr>
                        <td><span>IMDb:</span>{props.movie.imdb_points}</td>
                        <td><span>Length:</span>{props.movie.length_in_minutes + " minutes"}</td>
                    </tr>
                    <tr>
                        <td><span>Director:</span>{props.movie.director}</td>
                        <td><span>Writer:</span>{props.movie.writer}</td>
                    </tr>
                    <tr>
                        <td colSpan="2"><span>Stars:</span>{props.movie.stars}</td>
                    </tr>
                </tbody>
            </table>
)
export default class List extends Component{
   
    constructor(props)
    {
        super(props)

        this.onChangeIsLoading = this.onChangeIsLoading.bind(this)
        this.MovieList = this.MovieList.bind(this)
        this.state = {

            isLoading: true,
            movies: []
        }
    }
   
    onChangeIsLoading(e){
        this.setState({
            isLoading: e.target.value
        })
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/movies/')
            .then(res => {
                this.setState({
                    movies: res.data
                })
            })
        this.setState({
            isLoading : false
        })
    }
    MovieList()
    {
        /*return this.state.movies.map(Movie => {
            return <Movie movie={Movie} />
        })*/
        return this.state.movies.map(film => {
            //console.log(Movie.name)
            return <Movie movie ={film} key={film._id} />
        })
       
    }
    render()
    {
        return(
            <div id="list_table_div">
               { this.MovieList() }
            </div>
            
        )
    }

}
