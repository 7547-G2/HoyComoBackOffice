import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Image , Input } from 'react-bootstrap'
import marcadorImage from './images/marcador.png'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

export class MapContainer extends React.Component { 
  constructor(props) {
    super(props)
    let draggable = props.draggable
    let width = props.width || '850px'
    let height = props.height || '90%'
    this.state = {
      width: width,
      height: height,
      lat: props.lat,
      lng: props.lng,
      draggable: draggable,
    }
    this.mapClicked = this.mapClicked.bind(this)
    this.getLatLng = this.getLatLng.bind(this)
  }
  
  onMarkerClick(event, other){
    console.log(event)
    console.log(other)
    
  }

  mapClicked(mapProps, map, clickEvent) {
    console.log(clickEvent.latLng.lat() + '     ' + clickEvent.latLng.lng())
    let lat = clickEvent.latLng.lat()
    let lng = clickEvent.latLng.lng()
    if(lng > -58.36139299426577)
      lng = -58.36139299426577
    if(lng < -58.52998543297872)
      lng = -58.52998543297872
    if(lat > -34.54287244012082)
      lat = -34.54287244012082 
    if(lat < -34.66297379990252)
      lat = -34.66297379990252
    this.setState({
      lat: lat,
      lng: lng,
    })
  }

  getLatLng(){
    return {
      lat:this.state.lat,
      lng:this.state.lng
    }
  }

  render() {
    return (
      <div>
        <Map
          draggable={this.state.draggable}
          style={{  width: this.state.width,
            height: this.state.height}}
          google={this.props.google} zoom={14}
          initialCenter={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
          disableDefaultUI={true}
          onClick={this.mapClicked}
        >
          <Marker onClick={this.onMarkerClick}
            position={{
              lat:this.state.lat,
              lng:this.state.lng
            }}
            disableDefaultUI={true}
            id='CurrentLocation'
            name='CurrentLocation' />
        </Map>
        <span  ref={(latitudSpan) => { this.latitudSpan = latitudSpan }} id='latitudSpan' name='latitudSpan'>{this.state.lat}</span>
        <span ref={(longitudSpan) => { this.longitudSpan = longitudSpan }} id='longitudSpan' name='longitudSpan'>{this.state.lng}</span>
      </div>
    )
  }
}

const WrappedContainer = GoogleApiWrapper({
  apiKey: ('AIzaSyC_rDpCs7Wgs5-qpnfx70_-LgvO89-zIDA')
})(MapContainer)

export default  GoogleApiWrapper({
  apiKey: ('AIzaSyC_rDpCs7Wgs5-qpnfx70_-LgvO89-zIDA')
})(connect(null, null, null, { withRef: true })(WrappedContainer))
