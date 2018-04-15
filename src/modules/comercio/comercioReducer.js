import axios from 'axios'
import { getConfig, getNullConfig, getErrorResponse } from '../../utils/utils'
import { push } from 'react-router-redux'
// import _ from 'lodash'
import { generarContrasenia } from  '../../utils/utils'
import api from '../../config/api'

const HYDRATE_COMERCIOS = 'HYDRATE_COMERCIOS'
const HYDRATE_COMERCIO_BY_ID = 'HYDRATE_COMERCIO_BY_ID'
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

const filtarById = (data,id) => {
  let returnValue = null
  data.forEach(element => {
    if(element.id == id)
      returnValue =  element
  })
  return returnValue
}

export const getComercioById = (id) => dispatch => {
  let config = getNullConfig()
  // let queryStringTipoComercios = '?sort_by=nombre'

  // axios.all([
  //   axios.get(api.comercios + '/' + id, config),
  //   axios.get(api.roles, config),
  //   axios.get(api.tipoComercios + queryStringTipoComercios, config)
  // ])
  //   .then(axios.spread(function (usuario, roles, organismos) {
  //     return { usuario: usuario.data.data, roles: roles.data.data, organismos: organismos.data.data }
  //   }))
  //   .then(data => {
  //     dispatch(comercioById(data))
  //   })
  //   .catch(err => {
  //     if (err.response && err.response.status) {
  //       dispatch(queryError(getErrorResponse(err)))
  //     } else {
  //       dispatch(internalError(err))
  //     }
  //   })

  let tipoComercios = [  
    { value: 'Chino', label: 'Chino' },
    { value: 'Parrilla', label: 'Parrilla' },
    { value: 'Pastas', label: 'Pastas' },
    { value: 'Sushi', label: 'Sushi' },
    { value: 'Pizzería', label: 'Pizzería' }]
  let queryString = ''
  axios.get(api.comercios + queryString, config)
  axios.all([
    axios.get(api.comercios + queryString, config),
  ])
    .then(axios.spread(function (comercios) {
      return { comercio: filtarById(comercios.data,id) , tipoComercios: tipoComercios}
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
  // let comercios = [{
  //   id: 1, nombre: 'nicolas',
  //   razonSocial: 'razon 1',
  //   calle: 'calle falsa',
  //   numero: '1234',
  //   codigoPostal: '1000',
  //   email: 'email@example.com',
  //   tipoComercio: { id: 3, nombre: 'pastas' },
  //   estado: pendiente
  // }, {
  //   id: 2, nombre: 'un nombre',
  //   razonSocial: 'razon 2',
  //   calle: 'calle falsa',
  //   numero: '1235',
  //   codigoPostal: '1001',
  //   email: 'email2@example.com',
  //   tipoComercio: { id: 3, nombre: 'pastas' },
  //   estado: pendiente
  // }, {
  //   id: 3, nombre: 'la dehabilitada',
  //   razonSocial: 'razon 3',
  //   calle: 'calle falsa',
  //   numero: '1236',
  //   codigoPostal: '1002',
  //   email: 'email3@example.com',
  //   tipoComercio: { id: 3, nombre: 'pastas' },
  //   estado: pendiente
  // }, {
  //   id: 4, nombre: 'nicolas',
  //   razonSocial: 'razon 4',
  //   calle: 'calle falsa',
  //   numero: '1237',
  //   codigoPostal: '1003',
  //   email: 'email4@example.com',
  //   tipoComercio: { id: 1, nombre: 'pastas' },
  //   estado: pendiente
  // }]
  // let data = {}
  // data.comercio = comercios[id - 1]
  // data.tipoComercios = [  
  //   { value: 'Chino', label: 'Chino' },
  //   { value: 'Parrilla', label: 'Parrilla' },
  //   { value: 'Pastas', label: 'Pastas' },
  //   { value: 'Sushi', label: 'Sushi' },
  //   { value: 'Pizzería', label: 'Pizzería' }]
  // dispatch(comercioById(data))
}

export const getComercios = (/*nombre, email, tipoComercio*/) => dispatch => {
  let config = getNullConfig()
  let queryString = ''
  // if (nombre != '') queryString += '?nombre=' + nombre
  // if (email != '') queryString += (queryString == '') ? '?email=' + email : '&email=' + email
  // if (organismo != '-1') queryString += (queryString == '') ? '?organismo_id=' + organismo : '&organismo_id=' + organismo
  axios.get(api.comercios + queryString, config)
  axios.all([
    axios.get(api.comercios + queryString, config),
  ])
    .then(axios.spread(function (comercios) {
      return { comercios: comercios.data }
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
  // dispatch(comercios( { comercios: [
  //   { id: 1, nombre: 'nicolas', 
  //     razonSocial: 'razon 1',
  //     calle: 'calle falsa',
  //     numero: '1234',
  //     codigoPostal:'1000', 
  //     email: 'email@example.com',
  //     tipoComercio: {id:3, nombre:'pastas'}, 
  //     estado: pendiente
  //   },{ id: 2, nombre: 'un nombre', 
  //     razonSocial: 'razon 2',
  //     calle: 'calle falsa',
  //     numero: '1235',
  //     codigoPostal:'1001', 
  //     email: 'email2@example.com',
  //     tipoComercio: {id:3, nombre:'pastas'}, 
  //     estado: pendiente
  //   },{ id: 3, nombre: 'la dehabilitada', 
  //     razonSocial: 'razon 3',
  //     calle: 'calle falsa',
  //     numero: '1236',
  //     codigoPostal:'1002', 
  //     email: 'email3@example.com',
  //     tipoComercio: {id:3, nombre:'pastas'}, 
  //     estado: pendiente
  //   },{ id: 4, nombre: 'nicolas', 
  //     razonSocial: 'razon 4',
  //     calle: 'calle falsa',
  //     numero: '1237',
  //     codigoPostal:'1003', 
  //     email: 'email4@example.com',
  //     tipoComercio: {id:1, nombre:'pastas'}, 
  //     estado: pendiente
  //   }
  // ] , tipoComercios: [{id: 1, nombre: 'parrillada'}, {id: 2, nombre: 'sushis'}, {id: 3, nombre: 'pastas'}, {id: 4, nombre: 'chino'}] }))
}

export const updateComercio = (idComercio, nombre, tipoComercio_id, password, verificacion_password) => dispatch => {
  let config = getConfig()
  let body = {}
  if (nombre) body.nombre = nombre
  if (tipoComercio_id) body.tipo_comercio_id = tipoComercio_id
  if (password) body.password = password
  if (verificacion_password) body.verificacion_password = verificacion_password

  axios.patch(api.comercios + '/' + idComercio, body, config)
    .then(res => {
      return res.data.data
    })
    .then(() => {
      dispatch(getComercioById(idComercio))
      dispatch(successful('El comercio se actualizó correctamente'))
    })
    .catch(err => {
      if (err.response && err.response.status) {
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
}

export const createComercio = (nombre, razonSocial, calle, numero, codigoPostal, email, verificacion_email, tipo) => dispatch => {

  let config = getNullConfig()
  let newPass = generarContrasenia()
  let body = {
    email: email,
    nombre: nombre,
    razonSocial: razonSocial,
    tipo: tipo,
    password: newPass,
    addressDto: {
      street: calle +' '+numero,
      postalCode: codigoPostal,
      floor: '',
      department: ''
    }
  }

  axios.post(api.comercios, body, config)
    .then(res => {
      res.data 
    })
    .then(() => {
      dispatch(push('/' + api.claveComercios))
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
  // let config = getConfig()
  // let queryStringOrganismos = '?sort_by=nombre'
  // axios.get(api.organismos + queryStringOrganismos, config)
  //   .then(res => res.data.data)
  //   .then(data => {
  //     dispatch(organismosTodos(data))
  //   })
  //   .catch(err => {
  //     if (err.response && err.response.status){
  //       dispatch(queryError(getErrorResponse(err)))
  //     } else {
  //       dispatch(internalError(err))
  //     }
  //   })
  let data = {}
  dispatch(tipoComerciosTodos(data))
}

// export const deleteRol = (idUsuario, idRol) => dispatch => {
//   let config = getConfig()
//   axios.delete(api.usuarios + '/' + idUsuario + '/' + api.claveRoles + '/' + idRol, config)
//     .then(res => res.data.data)
//     .then(() => {
//       dispatch(removerRol(idRol))
//       dispatch(successful('El rol se eliminó correctamente'))
//     })
//     .catch(err => {
//       if (err.response && err.response.status) {
//         dispatch(queryError(getErrorResponse(err)))
//       } else {
//         dispatch(internalError(err))
//       }
//     })
// }

// export const addRol = (idUsuario, idRol) => dispatch => {
//   let config = getConfig()
//   let body = { rol_id: idRol }
//   axios.post(api.usuarios + '/' + idUsuario + '/' + api.claveRoles, body, config)
//     .then(res => res.data.data)
//     .then(() => {
//       dispatch(agregarRol(idRol))
//       dispatch(successful('El rol se agregó correctamente'))
//     })
//     .catch(err => {
//       if (err.response && err.response.status) {
//         dispatch(queryError(getErrorResponse(err)))
//       } else {
//         dispatch(internalError(err))
//       }
//     })
// }

const fetchComerciosTable = (data) => {
  let returnValue = []
  data.map(function (rowObject) {
    returnValue.push({ id: rowObject.id, nombre: rowObject.nombre, email: rowObject.email, tipoComercio:  rowObject.tipo,
      domicilio: rowObject.addressDto.street + ', cp: ' + rowObject.addressDto.postalCode, estado: rowObject.estado  })
  })
  return returnValue
}

// Auxiliares

// const getRolRemover = (rolId, activeUsuario) => {
//   let rolesActuales = activeUsuario.roles
//   let nuevosRoles = _.differenceBy(rolesActuales, [{ id: rolId }], 'id')
//   return nuevosRoles
// }

// const getRolAdd = (nuevoRolId, roles, allRoles) => {
//   let nuevoRol = _.find(allRoles, { 'id': parseInt(nuevoRolId) })
//   roles.push(nuevoRol)
//   return roles
// }

// const fetchRoles = (data) => {
//   let returnValue = []
//   data.map(function (rowObject) {
//     returnValue.push({ id: rowObject.id, nombre: rowObject.nombre, descripcion: rowObject.descripcion })
//   })
//   return returnValue
// }

const fetchTipoComercios = (/*data*/) => {
  let returnValue = []
  // data.map(function (rowObject) {
  //   returnValue.push({ id: rowObject.id, nombre: rowObject.nombre, sigla: rowObject.sigla })
  // })
  returnValue.push({ id: '1', nombre: 'parrilla' })
  return returnValue
}

const fetchComercio = (data) => {
  // let returnValue = []
  // data.Roles.map(function (rowObject) {
  //   returnValue.push({ id: rowObject.id, nombre: rowObject.nombre, descripcion: rowObject.descripcion })
  // })
  let number = parseInt(data.addressDto.street.match(/\d+$/)[0], 10)
  let street = data.addressDto.street.replace(number,'')
  return { 
    id: data.id, 
    nombre: data.nombre,
    razonSocial: data.razonSocial,
    codigoPostal: data.addressDto.postalCode,
    calle: street,
    numero: number,
    estado: data.estado,
    email: data.email, /*roles: returnValue,*/ 
    tipoComercio: data.tipo }
}

export default (state = initialState, action) => {
  switch (action.type) {
  case HYDRATE_TIPO_COMERCIOS:
    return {
      ...state,
      result: [],
      allTipoComercios: fetchTipoComercios(action.data),
      alert: {},
      activeSearch: true
    }
  case HYDRATE_COMERCIOS:
    return {
      ...state,
      result: fetchComerciosTable(action.data.comercios),
      allTipoComercios: fetchTipoComercios(action.data.tipoComercios),
      alert: {},
      activeSearch: true
    }
  case HYDRATE_COMERCIO_BY_ID:
    return {
      ...state,
      result: [],
      activeComercio: fetchComercio(action.data.comercio),
      // allRoles: fetchRoles(action.data.roles),
      allTipoComercios: fetchTipoComercios(action.data.tipoComercios),
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
    return { ...state, alert: { style: 'danger', text: action.err.message[0].message } }
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