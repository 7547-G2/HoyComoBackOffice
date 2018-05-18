import axios from 'axios'
import { getNullConfig, getGoogleConfig, getErrorResponse } from '../../utils/utils'
import { push } from 'react-router-redux'
import { generarContrasenia , ordenarPorCategoriaOrden } from  '../../utils/utils'
import api from '../../config/api'

const HYDRATE_COMERCIOS = 'HYDRATE_COMERCIOS'
const HYDRATE_COMERCIO_BY_ID = 'HYDRATE_COMERCIO_BY_ID'
const HYDRATE_POSICION = 'HYDRATE_POSICION'
const HYDRATE_TIPO_COMERCIOS = 'HYDRATE_TIPO_COMERCIOS'
const QUERY_ERROR = 'QUERY_ERROR'
const INTERNAL_ERROR = 'INTERNAL_ERROR'
const SUCCESSFUL = 'SUCCESSFUL'
const CLEAR_COMERCIO_RESULT = 'CLEAR_COMERCIO_RESULT'
const CLEAR_ALERT = 'CLEAR_ALERT'
const REMOVE_ROL = 'REMOVE_ROL'
const ADD_ROL = 'ADD_ROL'
const PATCH_COMERCIO = 'PATCH_COMERCIO'

const initialState = {
  result: [],
  alert: {},
  allTipoComercios: [],
  activeComercio: {},
  activeSearch: false
}

export const clearComercioResult = () => ({
  type: CLEAR_COMERCIO_RESULT
})

export const clearAlert = () => ({
  type: CLEAR_ALERT
})

export const queryError = err => ({
  type: QUERY_ERROR, err
})

export const internalError = err => ({
  type: INTERNAL_ERROR, err
})

export const successful = text => ({
  type: SUCCESSFUL, text
})

// normal action creators
export const tipoComerciosTodos = data => ({
  type: HYDRATE_TIPO_COMERCIOS, data
})

export const comercios = data => ({
  type: HYDRATE_COMERCIOS, data
})

export const comercioById = data => ({
  type: HYDRATE_COMERCIO_BY_ID, data
})

export const posicion = data => ({
  type: HYDRATE_POSICION, data
})

export const removerRol = data => ({
  type: REMOVE_ROL, data
})

export const agregarRol = data => ({
  type: ADD_ROL, data
})

export const patchComercio = data => ({
  type: PATCH_COMERCIO, data
})

// thunks
export const clearComercios = () => dispatch => {
  dispatch(clearComercioResult())
}

export const habilitarComercio = (activeComercio) => dispatch => {
  let config = getNullConfig()
  let body = {}
  let idComercio = activeComercio.id
  body.estado = 'habilitado'
  axios.put(api.comercios + '/' + idComercio, body, config)
    .then(res => {
      return res.data.data
    })
    .then(() => {
      dispatch(getComercioById(idComercio,true))
      dispatch(successful('El comercio se habilito correctamente'))
    })
    .catch(err => {
      if (err.response && err.response.status) {
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

export const deshabilitarComercio = (activeComercio) => dispatch => {
  let config = getNullConfig()
  let body = {}
  let idComercio = activeComercio.id
  body.estado = 'deshabilitado'
  axios.put(api.comercios + '/' + idComercio, body, config)
    .then(res => {
      return res.data.data
    })
    .then(() => {
      dispatch(getComercioById(idComercio,true))
      dispatch(successful('El comercio se deshabilito correctamente'))
    })
    .catch(err => {
      if (err.response && err.response.status) {
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

const filtarById = (data,id, pasarHabilitado) => {
  let returnValue = null
  data.forEach(element => {
    if(element.id == id){
      if (pasarHabilitado){
        element.estado = 'habilitado'
      }
      returnValue =  element
    }
  })
  return returnValue
}

const filtarCategoriaById = (data,id) => {
  let returnValue = null
  data.forEach(element => {
    if(element.id == id){
      returnValue =  element.tipo
    }
  })
  return returnValue
}

export const getComercioById = (id,pasarHabilitado) => dispatch => {
  let config = getNullConfig()
  let queryString = ''
  axios.get(api.comercios + queryString, config)
  axios.all([
    axios.get(api.base + api.clavetipoComercios),
    axios.get(api.comercios + queryString, config),
    axios.get(api.bocomercios +'/'+id+'/'+ api.clavePlatos + queryString, config),
    axios.get(api.bocomercios +'/'+ api.claveCategorias, config),
  ])
    .then(axios.spread(function (tipoComercios, comercios,platos, categorias) {
      console.log(platos.data)
      return { comercio: filtarById(comercios.data,id,pasarHabilitado), platos: platos.data , tipoComercios: tipoComercios.data, categorias: categorias.data}
    }))
    .then(data => {
      dispatch(comercioById(data))
    })
    .catch(err => {
      if (err.response && err.response.status) {
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

export const getPosicion = (calle) => dispatch => {
  let config = getGoogleConfig()
  axios.all([
    axios.get(api.googleApi + calle + api.apiKey, config)
  ])
    .then(axios.spread(function (data) {
      console.log(data.data)
      return { lat: data.data.results[0].geometry.location.lat,
        lng: data.data.results[0].geometry.location.lng}
    }))
    .then(data => {
      dispatch(posicion(data))
    })
    .catch(err => {
      if (err.response && err.response.status) {
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

export const getComercios = (nombre, email, tipoComercio,estado) => dispatch => {
  nombre =  nombre && nombre.trim() 
  email = email &&  email.trim()
  let config = getNullConfig()
  let queryString = ''
  if (nombre != '') queryString += 'nombre:' + nombre
  if (email != '') queryString += (queryString == '') ? 'email:' + email : ',email:' + email
  if (tipoComercio) queryString += (queryString == '') ? 'tipoId:' + tipoComercio : ',tipoId:' + tipoComercio
  if (estado) queryString += (queryString == '') ? 'estado:' + estado : ',estado:' + estado 
  queryString = (queryString == '') ? queryString : '?search=' + queryString
  axios.get(api.comercios + queryString, config)
  axios.all([
    axios.get(api.base + api.clavetipoComercios),
    axios.get(api.comercios + queryString, config),
  ])
    .then(axios.spread(function (tipoComercios, comercios) {
      return { comercios: comercios.data, tipoComercios: tipoComercios.data }
    }))
    .then(data => {
      dispatch(comercios(data))
    })
    .catch(err => {
      if (err.response && err.response.status) {
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

export const updateComercio = (idComercio,nombre,razonSocial,numero,codigoPostal,calle,email,estado,tipoComercio,imagenLogo,password) => dispatch => {
  let config = getNullConfig()
  let body = {}
  body.addressDto = { floor: '', department: ''}
  if (nombre) body.nombre = nombre
  if (tipoComercio) body.tipoComidaId = tipoComercio
  if (razonSocial) body.razonSocial = razonSocial
  if (numero && calle) body.addressDto.street = calle.trim() + ' '+ numero
  if (codigoPostal) body.addressDto.postalCode = codigoPostal
  if (imagenLogo) body.imagenLogo = imagenLogo
  if (email) body.email = email
  if (estado) body.estado = estado
  if (password) body.password = password
  console.log(body)
  axios.put(api.comercios + '/' + idComercio, body, config)
    .then(res => {
      return res.data.data
    })
    .then(() => {
      dispatch(successful('El comercio se actualizó correctamente'))
      dispatch(getComercioById(idComercio))
    })
    .catch(err => {
      if (err.response && err.response.status) {
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

export const createComercio = (nombre, razonSocial, calle, numero, codigoPostal, email, verificacion_email, tipoComercio) => dispatch => {
  let config = getNullConfig()
  let configGoogle = getGoogleConfig()
  let newPass = generarContrasenia()
  let body = {
    email: email,
    nombre: nombre,
    razonSocial: razonSocial,
    tipoComidaId: tipoComercio,
    password: newPass,
    addressDto: {
      street: calle +' '+numero,
      postalCode: codigoPostal,
      floor: '',
      department: ''
    },
    estado: 'pendiente activacion'
  }
  let googleApiSearch = calle.trim() +' '+ numero.trim() +' CABA Argentina'
  axios.all([
    axios.get(api.googleApi + googleApiSearch + api.apiKey, configGoogle)
  ])
    .then(axios.spread(function (data) {
      return { lat: data.data.results[0].geometry.location.lat,
        lng: data.data.results[0].geometry.location.lng}
    }))
    .then(data => {
      body.latitud = data.lat
      body.longitud = data.lng
      axios.post(api.comercios, body, config)
        .then(res => {
          res.data
        })
        .then(() => {
          dispatch(successful('El comercio se creo correctamente'))
          // dispatch(getComercios())
        })
        .catch(err => {
          if (err.response && err.response.status) {
            dispatch(queryError(getErrorResponse(err)))
          } else {
            dispatch(internalError(err))
          }
        })
    })
    .catch(err => {
      if (err.response && err.response.status) {
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

export const obtenerTipoComercios = () => dispatch => {
  let config = getNullConfig()
  axios.get(api.base + api.clavetipoComercios, config)
    .then(res => res.data)
    .then(data => {
      dispatch(tipoComerciosTodos(data))
    })
    .catch(err => {
      if (err.response && err.response.status){
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

const fetchComerciosTable = (data) => {
  let returnValue = []
  data.map(function (rowObject) {
    let tipoComida = ''
    if(rowObject.tipoComida)
      tipoComida = rowObject.tipoComida.tipo
    returnValue.push({ id: rowObject.id, nombre: rowObject.nombre, email: rowObject.email, tipoComercio: tipoComida,
      domicilio: rowObject.addressDto.street + ', cp: ' + rowObject.addressDto.postalCode, estado: rowObject.estado  })
  })
  return returnValue
}

const fetchTipoComercios = (data) => {
  let returnValue = []
  data.map(function (rowObject) {
    returnValue.push({ id: rowObject.id, tipo: rowObject.tipo })
  })
  return returnValue
}

const fetchComercio = (data, platos, categorias) => {
  let returnValue = []
  platos.map(function (rowObject) {
    if(rowObject.id){
      returnValue.push({ id: rowObject.id,  imagen: rowObject.imagen, nombre: rowObject.nombre,precio: rowObject.precio,
        categoria: filtarCategoriaById(categorias,rowObject.categoria), orden: rowObject.orden, state: rowObject.state })
    }
  })
  returnValue = ordenarPorCategoriaOrden(returnValue)
  let estado = data.estado
  let numberStreet = data.addressDto.street.match(/\d+$/)
  let number = ''
  if(numberStreet){
    number = parseInt( numberStreet[0], 10) 
  }
  let street = data.addressDto.street.replace(number,'')
  let mensajeEncabezado = ''
  if (estado == 'pendiente activacion') {
    mensajeEncabezado = 'El administrador del comercio debe ingresar por primera vez para comenzar a cargar su menú'
  } else if (estado == 'pendiente menu' || estado == 'deshabilitado') {
    mensajeEncabezado = 'Deben cargarse al menos 5 platos en el menú para poder habilitar este comercio'
  } else if (estado == 'habilitado') {
    mensajeEncabezado = 'Para evitar que un comercio siga visible en la aplicación'
  }
  let tipoComida = ''
  if (data.tipoComida) tipoComida = data.tipoComida.id
  return { 
    id: data.id, 
    nombre: data.nombre,
    razonSocial: data.razonSocial,
    codigoPostal: data.addressDto.postalCode,
    calle: street,
    numero: number,
    estado: estado,
    password: data.password,
    imagenLogo: data.imagenLogo,
    email: data.email, /*roles: returnValue,*/ 
    tipoComercio: tipoComida,
    mensajeEncabezado: mensajeEncabezado,
    platos: returnValue
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
  case HYDRATE_TIPO_COMERCIOS:
    return {
      ...state,
      result: [],
      allTipoComercios: fetchTipoComercios(action.data),
      alert: {},
    }
  case HYDRATE_COMERCIOS:
    return {
      ...state,
      result: fetchComerciosTable(action.data.comercios),
      allTipoComercios: fetchTipoComercios(action.data.tipoComercios),
      activeSearch: true
    }
  case HYDRATE_COMERCIO_BY_ID:
    return {
      ...state,
      result: [],
      activeComercio: fetchComercio(action.data.comercio,action.data.platos, action.data.categorias),
      // allRoles: fetchRoles(action.data.roles),
      allTipoComercios: fetchTipoComercios(action.data.tipoComercios),
    }
  case HYDRATE_POSICION:
    return {
      ...state,
      posicion: { lat: action.data.lat, lng: action.data.lng },
    }
    // case REMOVE_ROL:
    //   return {
    //     ...state,
    //     activeUser: { ...state.activeUser, roles: getRolRemover(action.data, state.activeUser) },
    //     alert: {}
    //   }
    // case ADD_ROL:
    //   return {
    //     ...state,
    //     activeUser: { ...state.activeUser, roles: getRolAdd(action.data, state.activeUser.roles, state.allRoles) },
    //     alert: {}
    //   }
  case QUERY_ERROR:
    return { ...state, alert: { style: 'danger', text: action.err.message } }
  case INTERNAL_ERROR:
    return { ...state, alert: { style: 'danger', text: 'Ocurrió un error inesperado' } }
  case SUCCESSFUL:
    return { ...state, alert: { style: 'success', text: action.text } }
  case CLEAR_ALERT:
    return { ...state, alert: {} }
  case CLEAR_COMERCIO_RESULT:
    return { ...state, result: [], activeSearch: false }
  default:
    return state
  }
}