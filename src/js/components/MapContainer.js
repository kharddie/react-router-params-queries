import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { toTitleCase } from '../helper/index.js';
import renderHTML from 'react-render-html';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyCSGUZtwqI8T3N-_qBhy8iJ6AEyrtuTqls");
// Enable or disable logs. Its optional.
Geocode.enableDebug();

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
      showingInfoWindow: true,
      renderMakers: null
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

  renderMarkers = (requests) => {
    if (requests.length > 0) {
      return requests.map((thisMarker, key) => {
        console.log("thisMarker =" + thisMarker);
        return (
          <Marker
            onClick={this.onMarkerClick}
            key={key}
            title={thisMarker.title}
            body={thisMarker.content}
            address={thisMarker.address}
            position={{ lat: thisMarker.lat, lng: thisMarker.lng }}
            icon={{
              url: "../../images/placeholder_map.png",
              anchor: new google.maps.Point(32, 32)
            }} />
        )
      })
      this.props.markerDetails=[];
    }
  }


  render() {

    const {requests} = this.props;

    $(window).resize(() => {
      console.log("}}}}}}resize}}}}}}}this.props.markerDetails =" + this.props.markerDetails);
     // this.forceUpdate();
    });

    return (
      <Map
        google={this.props.google}
        style={this.state.style}
        initialCenter={{ lat: -27.467186, lng: 153.027658 }}
        zoom={10}
        onClick={this.mapClicked}
      >


        {this.renderMarkers(requests)}

        <InfoWindow
          className="info-window-holder"
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div className="info-window">
            <h3 className="font-weight-bold">{this.state.selectedPlace.title ? toTitleCase(this.state.selectedPlace.title) : this.state.selectedPlace.title}</h3>
            <div className="info-window-body">
            <div className="info-window-address font-weight-bold"><b>{this.state.selectedPlace.address}</b><br /><br /></div>
            <div className="info-window-content"> {this.state.selectedPlace.body ? renderHTML(this.state.selectedPlace.body) : this.state.selectedPlace.body}</div>
            </div>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCSGUZtwqI8T3N-_qBhy8iJ6AEyrtuTqls",
})(MapContainer)