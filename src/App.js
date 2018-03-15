import React, { Component } from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react';
import BeerSvg from './beer.svg';

const AnyReactComponent = ({ text }) => <div><img style={{height: 20}} src={BeerSvg}/><div>{text}</div></div>;
const FoureSquareUrl = "https://api.foursquare.com/v2/venues/search?categoryId=50327c8591d4c4b30a586d5d&ll=59.911491,10.757933&v=20170801&client_id=MK2REANUSAKWQDT0KNLPDYTHEALGX40PEM4X2ZRQHDDSDHA5&client_secret=SZCXCSEFNSDFA0F42QRKYYKQO0WBFRUOLUITXXQRDOGJLJ0N";

class App extends Component {
  constructor(){
    super();
    this.state = {venues: []}
  }
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };
  componentDidMount(){
    console.log("Hei");
    const that = this;
    fetch(FoureSquareUrl).then((res)=>{return res.json()}).then(function(myJson) {
      console.log(myJson);
      that.setState({venues: myJson.response.venues});
    });
  }
  render() {
      console.log(this.state);
      this.state.venues.forEach(function(venue){console.log(venue)});
      return (
        <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBAX1dhEDnFy4DJQ1cCixOklTa9W8r0AG0" }}
        defaultCenter={{lat: 59.911491, lng: 10.757933}}
        defaultZoom={11}
      >
        {this.state.venues.map(function(venue){return <AnyReactComponent
          lat={venue.location.lat}
          lng={venue.location.lng}
          text={venue.name}
        />})}
      </GoogleMapReact>
    );
  }
}

export default App;
