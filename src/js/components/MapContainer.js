import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    initialCenter: [153.012648, -27.484111],
    zoom: 15,
    style: {
      width: '100%',
      height: '100%'
    },
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
        //showingInfoWindow: false,
        //activeMarker: null
      })
    }
  };

  onInfoWindowClose() {

  }



  renderMarkers() {
    return points.map((thisMarker, key) => {
      return (
        <Marker
          onClick={this.onMarkerClick}
          key={key}
          title={thisMarker.title}
          body={thisMarker.body}
          address={thisMarker.address}
          position={{ lat: thisMarker.lat, lng: thisMarker.lng }}
          icon={{
            url: "../../images/placeholder.png",
            anchor: new google.maps.Point(32, 32)
          }} />
      )
    })

  }

  render() {

    if (this.props.location.href.indexOf("browseRequests") > -1) {
      this.renderMarkers()
    }

    return (
      <Map
        google={this.props.google}
        style={this.state.style}
        initialCenter={{ lat: -27.467186, lng: 153.027658 }}
        zoom={8}
        onClick={this.mapClicked}
      >
        {this.renderMarkers()}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h3>{this.state.selectedPlace.title}</h3>
            <body>
              <b>{this.state.selectedPlace.address}</b><br /><br />
              {this.state.selectedPlace.body}
            </body>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCSGUZtwqI8T3N-_qBhy8iJ6AEyrtuTqls",
})(MapContainer)