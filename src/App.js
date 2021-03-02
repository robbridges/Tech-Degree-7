import logo from './logo.svg';
import './css/index.css';
import React, {Component} from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import axios from 'axios';
import apiKey from './config';
import SearchBar from './components/SearchBar';
import Navigation from './components/Navigation';
import PhotoContainer from './components/PhotoContainer'


class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: []
    };
  }
  
componentDidMount() {
  axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=ocean&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        photos: response.data.photos.photo
      });
    })
    .catch(error => {
      console.log('Error fetching data', error)
    });
}


getPhotos = (query) => {
  axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
  .then(response => {
    this.setState({
      photos: response.data.photos.photo,
      query:query
    });
  })
  .catch (error => {
    console.log('Error with the api request', error)
  });
}



  render() {
  console.log(this.state.photos);
  return (
    <BrowserRouter>
      <div className="App">
        <SearchBar onSearch={this.performSearch}/>
        <Navigation />
        <PhotoContainer data={this.state.photos} />
      </div>
    </BrowserRouter>

    
  );
  }
  
}


export default App;
