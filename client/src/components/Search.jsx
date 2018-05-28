import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selectedGenre: ''
    };
    this.getGenres = this.getGenres.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searc = this.search.bind(this);
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('/genres')
    .then((resp) => {
      this.setState({genres: resp.data.genres});
    })
    .catch((error) => {
      console.log('Error in Search/getGenres ', error);
    });
  }

  componentDidMount() {
    this.getGenres();
  }

  search() {
    this.props.searchGenre(this.state.selectedGenre);
  }

  handleChange(e) {
    this.setState({
      selectedGenre: e.target.value
    })
  }
  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        <form>
        <select name='selectedGenre' value={this.state.value} onChange={this.handleChange}>
          {this.state.genres.map(genre => (<option value={genre.id.toString()} key={genre.id}>{genre.name}</option>))}
        </select>
      </form>
      <br/><br/>

      <button onClick={this.search}>Search</button>

      </div>
    );
  }
}

export default Search;