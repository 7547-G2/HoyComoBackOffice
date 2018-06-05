import axios from 'axios'
import { getNullConfig, getGoogleConfig, getErrorResponse } from '../../utils/utils'
import { push } from 'react-router-redux'
import { generarContrasenia , getStateByEstado } from  '../../utils/utils'
import api from '../../config/api'

const HYDRATE_USUARIOS = 'HYDRATE_USUARIOS'
const HYDRATE_USUARIO_BY_ID = 'HYDRATE_USUARIO_BY_ID'
const HYDRATE_POSICION = 'HYDRATE_POSICION'
const HYDRATE_TIPO_USUARIOS = 'HYDRATE_TIPO_USUARIOS'
const QUERY_ERROR = 'QUERY_ERROR'
const INTERNAL_ERROR = 'INTERNAL_ERROR'
const SUCCESSFUL = 'SUCCESSFUL'
const CLEAR_USUARIO_RESULT = 'CLEAR_USUARIO_RESULT'
const CLEAR_ALERT = 'CLEAR_ALERT'
const REMOVE_ROL = 'REMOVE_ROL'
const ADD_ROL = 'ADD_ROL'
const PATCH_USUARIO = 'PATCH_USUARIO'

const initialState = {
  result: [],
  alert: {},
  allTipoUsuarios: [],
  activeUsuario: {},
  activeSearch: false
}

export const clearUsuarioResult = () => ({
  type: CLEAR_USUARIO_RESULT
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
export const tipoUsuariosTodos = data => ({
  type: HYDRATE_TIPO_USUARIOS, data
})

export const usuarios = data => ({
  type: HYDRATE_USUARIOS, data
})

export const usuarioById = data => ({
  type: HYDRATE_USUARIO_BY_ID, data
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

export const patchUsuario = data => ({
  type: PATCH_USUARIO, data
})

// thunks
export const clearUsuarios = () => dispatch => {
  dispatch(clearUsuarioResult())
}

export const habilitarUsuario = (id) => dispatch => {
  let config = getNullConfig()
  let body = {}
  let idUsuario = id
  body.state = 'habilitado'
  body.motivoDeshabilitacion = ''
  axios.put(api.usuario + '/' + idUsuario, body, config)
    .then(res => {
      return res.data.data
    })
    .then(() => {
      dispatch(clearUsuarioResult())
      dispatch(successful('El usuario se habilito correctamente'))
    })
    .catch(err => {
      if (err.response && err.response.status) {
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

export const deshabilitarUsuario = (id, motivo) => dispatch => {
  let config = getNullConfig()
  let body = {}
  let idUsuario = id
  body.state = 'deshabilitado'
  body.motivoDeshabilitacion = motivo
  axios.put(api.usuario + '/' + idUsuario, body, config)
    .then(res => {
      return res.data.data
    })
    .then(() => {
      dispatch(clearUsuarioResult())
      dispatch(successful('El usuario se deshabilito correctamente'))
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

// const filtarCategoriaById = (data,id) => {
//   let returnValue = null
//   data.forEach(element => {
//     if(element.id == id){
//       returnValue =  element.tipo
//     }
//   })
//   return returnValue
// }

export const getUsuarioById = (id,pasarHabilitado) => dispatch => {
  let config = getNullConfig()
  let queryString = ''
  axios.get(api.usuarios + queryString, config)
  axios.all([
    axios.get(api.base + api.clavetipoUsuarios),
    axios.get(api.usuarios + queryString, config),
    axios.get(api.bousuarios +'/'+id+'/'+ api.clavePlatos + queryString, config),
    axios.get(api.bousuarios +'/'+ api.claveCategorias, config),
  ])
    .then(axios.spread(function (tipoUsuarios, usuarios,platos, categorias) {
      return { usuario: filtarById(usuarios.data,id,pasarHabilitado), platos: platos.data , tipoUsuarios: tipoUsuarios.data, categorias: categorias.data}
    }))
    .then(data => {
      dispatch(usuarioById(data))
    })
    .catch(err => {
      if (err.response && err.response.status) {
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

export const getUsuarios = (nombre, apellido, estado) => dispatch => {
  nombre =  nombre && nombre.trim()
  apellido =  apellido && apellido.trim() 
  let config = getNullConfig()
  let queryString = ''
  if (nombre != '') queryString += 'firstName:' + nombre
  if (apellido != '') queryString += 'lastName:' + apellido
  if (estado) queryString += (queryString == '') ? 'state:' + estado : ',state:' + estado 
  queryString = (queryString == '') ? queryString : '?search=' + queryString
  // let data = [{id:1 , estado: 'habilitado', link: 'un.link', nombre: 'un nombre'},
  //   {id:2 , estado: 'deshabilitado', link: 'un.link2', nombre: 'un nombre2'}]
  // dispatch(usuarios({ usuarios:data}))
  axios.all([
    axios.get(api.usuarios + queryString, config),
  ])
    .then(axios.spread(function (usuarios) {
      return { usuarios: usuarios.data }
    }))
    .then(data => {
      dispatch(usuarios(data))
    })
    .catch(err => {
      if (err.response && err.response.status) {
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

export const updateUsuario = (idUsuario,nombre,razonSocial,numero,codigoPostal,calle,email,estado,tipoUsuario,imagenLogo
  , password, dniEncargado,telefonoEncargado, nombreEncargado) => dispatch => {
  let config = getNullConfig()
  let configGoogle = getGoogleConfig()
  let body = {}
  body.addressDto = { floor: '', department: ''}
  if (nombre) body.nombre = nombre
  if (tipoUsuario) body.tipoComidaId = tipoUsuario
  if (razonSocial) body.razonSocial = razonSocial
  if (numero && calle) body.addressDto.street = calle.trim() + ' '+ numero
  if (codigoPostal) body.addressDto.postalCode = codigoPostal
  if (imagenLogo) body.imagenLogo = imagenLogo
  if (email) body.email = email
  if (estado) body.estado = estado
  if (password) body.password = password
  if (nombreEncargado) body.nombreEncargado = nombreEncargado
  if (dniEncargado) body.dniEncargado = dniEncargado
  if (telefonoEncargado) body.telefonoEncargado = telefonoEncargado
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
      axios.put(api.usuarios + '/' + idUsuario, body, config)
        .then(res => {
          return res.data.data
        })
        .then(() => {
          dispatch(successful('El usuario se actualizó correctamente'))
          dispatch(getUsuarioById(idUsuario))
        })
        .catch(err => {
          if (err.response && err.response.status) {
            dispatch(queryError(getErrorResponse(err)))
          } else {
            dispatch(internalError(err))
          }
        })
    })
}

export const createUsuario = (nombre, razonSocial, calle, numero, codigoPostal, email, verificacion_email, tipoUsuario, nombreEncargado, dniEncargado, telefonoEncargado) => dispatch => {
  let config = getNullConfig()
  let configGoogle = getGoogleConfig()
  let newPass = generarContrasenia()
  let body = {
    email: email,
    nombre: nombre,
    razonSocial: razonSocial,
    tipoComidaId: tipoUsuario,
    password: newPass,
    addressDto: {
      street: calle +' '+numero,
      postalCode: codigoPostal,
      floor: '',
      department: ''
    },
    estado: 'pendiente activacion', 
    nombreEncargado: nombreEncargado,
    dniEncargado: dniEncargado, 
    telefonoEncargado: telefonoEncargado
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
      axios.post(api.usuarios, body, config)
        .then(res => {
          res.data
        })
        .then(() => {
          dispatch(successful('El usuario se creo correctamente'))
          // dispatch(getUsuarios())
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

export const obtenerTipoUsuarios = () => dispatch => {
  let config = getNullConfig()
  axios.get(api.base + api.clavetipoUsuarios, config)
    .then(res => res.data)
    .then(data => {
      dispatch(tipoUsuariosTodos(data))
    })
    .catch(err => {
      if (err.response && err.response.status){
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

const fetchUsuariosTable = (data) => {
  let returnValue = []
  data.map(function (rowObject) {
    returnValue.push({ id: rowObject.facebookId, username: rowObject.username, domicilio: rowObject.address.street + ', piso: ' + rowObject.address.floor
    + ', dpto: ' + rowObject.address.department + ', cp: ' + rowObject.address.postalCode, facebookId: rowObject.facebookId, estado: rowObject.state })
  })
  return returnValue
}

// const fetchTipoUsuarios = (data) => {
//   let returnValue = []
//   data.map(function (rowObject) {
//     returnValue.push({ id: rowObject.id, tipo: rowObject.tipo })
//   })
//   return returnValue
// }

// const fetchUsuario = (data, platos, categorias) => {
//   let returnValue = []
//   platos.map(function (rowObject) {
//     if(rowObject.id){
//       returnValue.push({ id: rowObject.id,  imagen: rowObject.imagen, nombre: rowObject.nombre,precio: rowObject.precio,
//         categoria: filtarCategoriaById(categorias,rowObject.categoria), orden: rowObject.orden, state: rowObject.state })
//     }
//   })
//   returnValue = ordenarPorCategoriaOrden(returnValue)
//   let estado = data.estado
//   let numberStreet = data.addressDto.street.match(/\d+$/)
//   let number = ''
//   if(numberStreet){
//     number = parseInt( numberStreet[0], 10) 
//   }
//   let street = data.addressDto.street.replace(number,'')
//   let mensajeEncabezado = ''
//   if (estado == 'pendiente activacion') {
//     mensajeEncabezado = 'El administrador del usuario debe ingresar por primera vez para comenzar a cargar su menú'
//   } else if (estado == 'pendiente menu' || estado == 'deshabilitado') {
//     mensajeEncabezado = 'Deben cargarse al menos 5 platos en el menú para poder habilitar este usuario'
//   } else if (estado == 'habilitado') {
//     mensajeEncabezado = 'Para evitar que un usuario siga visible en la aplicación'
//   }
//   let tipoComida = ''
//   if (data.tipoComida) tipoComida = data.tipoComida.id
//   return { 
//     id: data.id, 
//     nombre: data.nombre,
//     razonSocial: data.razonSocial,
//     codigoPostal: data.addressDto.postalCode,
//     calle: street,
//     numero: number,
//     estado: estado,
//     password: data.password,
//     nombreEncargado: data.nombreEncargado,
//     telefonoEncargado: data.telefonoEncargado,
//     dniEncargado: data.dniEncargado,
//     lat: data.latitud,
//     lng: data.longitud,
//     imagenLogo: data.imagenLogo,
//     email: data.email, /*roles: returnValue,*/ 
//     tipoUsuario: tipoComida,
//     mensajeEncabezado: mensajeEncabezado,
//     platos: returnValue
//   }
// }

export default (state = initialState, action) => {
  switch (action.type) {
  case HYDRATE_TIPO_USUARIOS:
    return {
      ...state,
      result: [],
      alert: {},
    }
  case HYDRATE_USUARIOS:
    return {
      ...state,
      result: fetchUsuariosTable(action.data.usuarios),
      activeSearch: true
      ,alert: {},
    }
  // case HYDRATE_USUARIO_BY_ID:
  //   return {
  //     ...state,
  //     result: [],
  //     activeUsuario: fetchUsuario(action.data.usuario,action.data.platos, action.data.categorias),
  //     allTipoUsuarios: fetchTipoUsuarios(action.data.tipoUsuarios),
  //   }
  // case HYDRATE_POSICION:
  //   return {
  //     ...state,
  //     posicion: { lat: action.data.lat, lng: action.data.lng },
  //   }
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
    return { ...state, alert: { style: 'danger', text: JSON.stringify(action.err.message) } }
  case INTERNAL_ERROR:
    return { ...state, alert: { style: 'danger', text: 'Ocurrió un error inesperado' } }
  case SUCCESSFUL:
    return { ...state, alert: { style: 'success', text: action.text } }
  case CLEAR_ALERT:
    return { ...state, alert: {} }
  case CLEAR_USUARIO_RESULT:
    return { ...state, result: [], activeSearch: false }
  default:
    return state
  }
}