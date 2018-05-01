import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    initialCenter: [153.012648, -27.484111],
    zoom: 15,
    greatPlaceCoords: { lat: 59.724465, lng: 30.080121 },
    style: {
      width: '100%',
      height: '100%'
    },
    selectedPlace: {
      name: "ingo"
    }
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
  onInfoWindowClose() {

  }

  render() {
    var points = [
      { lat: 42.02, lng: -77.01 },
      { lat: 42.03, lng: -77.02 },
      { lat: 41.03, lng: -77.04 },
      { lat: 42.05, lng: -77.02 }
    ]
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }

    return (
      <Map
        google={this.props.google}
        style={this.state.style}
        defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
        zoom={8}
        onClick={this.mapClicked}
        bounds={bounds} >
        <Marker
          onClick={this.onMarkerClick}
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{ lat: 37.778519, lng: -122.405640 }} />
        <Marker
          onClick={this.onMarkerClick}
          name={'Dolores park'}
          position={{ lat: 37.759703, lng: -122.428093 }} />
        <Marker />
        <Marker
          name={'Your position'}
          position={{ lat: 37.762391, lng: -122.439192 }}
          icon={{
            url: "/path/to/custom_icon.png",
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(64, 64)
          }} />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCSGUZtwqI8T3N-_qBhy8iJ6AEyrtuTqls",
})(MapContainer)