import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { Button, Glyphicon } from 'react-bootstrap'
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
      calleInput:props.calleInput,
      numeroInput:props.numeroInput,
      codigoPostalInput:props.codigoPostalInput,
      onClick: props.onClick
    }
    this.mapClicked = this.mapClicked.bind(this)
    this.getLatLng = this.getLatLng.bind(this)
  }
  
  onMarkerClick(event, other){
    console.log(event)
    console.log(other)
  }

  componentWillReceiveProps(newProps){
    this.setState({...this.state,
      lat: newProps.lat,
      lng: newProps.lng,
    })
  }


  // obtenerPosicionSegunParametros(){
  //   let calle = ReactDOM.findDOMNode(this.calleInput).value
  //   let numero = ReactDOM.findDOMNode(this.numeroInput).value
  //   let codigoPostal = ReactDOM.findDOMNode(this.codigoPostalInput).value
  //   this.getPosicion(calle,numero,codigoPostal)
  // }

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
        <h5 key="posicionGeografica"><b>Posición Geográfica</b><i> (seleccione la ubicación en el mapa de su comercio dentro de capital federal)</i>            
          <Button bsStyle="success" bsSize="xsmall" className="pull-right" onClick={this.state.onClick}>
            <Glyphicon glyph="repeat" />Actualizar Posición
          </Button></h5>
        <div style={{ height: '40vh', width: '100%' }}>
          <Map
            draggable={this.state.draggable}
            style={{  width: this.state.width,
              height: this.state.height}}
            google={this.props.google} zoom={14}
            initialCenter={{
              lat:this.state.lat || -34.59378080536352,
              lng:this.state.lng || -58.44440356103553
            }}
            center={{
              lat:this.state.lat || -34.59378080536352,
              lng:this.state.lng || -58.44440356103553
            }}
            disableDefaultUI={true}
            onClick={this.mapClicked}
          >
            <Marker onClick={this.onMarkerClick}
              position={{
                lat: this.state.lat,
                lng: this.state.lng
              }}
              disableDefaultUI={true}
              id='CurrentLocation'
              name='CurrentLocation' />
          </Map>
          <span  ref={(latitudSpan) => { this.latitudSpan = latitudSpan }} id='latitudSpan' name='latitudSpan'>{this.state.lat}</span>
          <span ref={(longitudSpan) => { this.longitudSpan = longitudSpan }} id='longitudSpan' name='longitudSpan'>{this.state.lng}</span>
        </div>
      </div>
    )
  }
}


// const mapDispatch = (dispatch) => ({
//   getPosicion: (calle,numero,codigoPostal) => {
//     dispatch(getPosicion(nombreComercio, razonSocial, calle, numero, codigoPostal, email, verificarEmail, tipoComercio))
//   }
// })

const WrappedContainer = GoogleApiWrapper({
  apiKey: ('AIzaSyC_rDpCs7Wgs5-qpnfx70_-LgvO89-zIDA')
})(MapContainer)

export default  GoogleApiWrapper({
  apiKey: ('AIzaSyC_rDpCs7Wgs5-qpnfx70_-LgvO89-zIDA')
})(connect(null, null, null, { withRef: true })(WrappedContainer))
