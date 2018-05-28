import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };
    
    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  getMovies(genre) {
    // make an axios request to your server on the GET SEARCH endpoint
    axios.get('/search', {params: {genre: genre}})
    .then(resp => {
      this.setState({
        movies: resp.data.results
      })
    })
    .catch(error => console.log('Error retrieving ', error))
  }

  saveMovie(movie) {
    // same as above but do something diff
    axios.post('/save', movie)
    .then(resp => {
      console.log('Response from saving ', resp);
      this.getFaves();
    })
    .catch(error => console.log('Error saving ', error))
  }

  // fix later
  deleteMovie(movie) {
    // same as above but do something diff
    axios.post('/delete', movie)
    .then(resp => {
      console.log('Response from deleting ', resp);
      this.getFaves();
    })
    .catch(error => console.log('Error deleting movie ', error))
  }

    getFaves() {
      axios.get('/faves')
      .then(resp => {
        console.log('resp from getting faves is', resp.data);
        this.setState({
          favorites: resp.data
        }, () => console.log('current faves are', this.state.favorites))
      })
      .catch(err => console.log('error trying to get faves', err))
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  componentDidMount() {
    this.getMovies('12')
    this.getFaves()
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} searchGenre={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} saveFave={this.saveMovie} deleteFave={this.deleteMovie}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));