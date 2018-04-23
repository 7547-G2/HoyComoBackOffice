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
    axios.get(api.bocomercios +'/'+id+'/'+ api.clavePlatos + queryString, config),
  ])
    .then(axios.spread(function (comercios,platos) {
      return { comercio: filtarById(comercios.data,id), platos: platos.data , tipoComercios: tipoComercios}
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

export const getComercios = (nombre, email, tipoComercio) => dispatch => {
  nombre =  nombre && nombre.trim() 
  email = email &&  email.trim()
  tipoComercio = tipoComercio &&  tipoComercio.trim()
  let config = getNullConfig()
  let queryString = ''
  if (nombre != '') queryString += 'nombre:' + nombre
  if (email != '') queryString += (queryString == '') ? 'email:' + email : ',email:' + email
  if (tipoComercio) queryString += (queryString == '') ? 'tipo:' + tipoComercio : ',tipo:' + tipoComercio
  queryString = (queryString == '') ? queryString : '?search=' + queryString
  console.log(api.comercios + queryString)
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
}

export const updateComercio = (idComercio,nombre,razonSocial,numero,codigoPostal,calle,email,estado,tipoComercio,imagenLogo,password) => dispatch => {
  let config = getNullConfig()
  let body = {}
  body.addressDto = { floor: '', department: ''}
  if (nombre) body.nombre = nombre
  if (tipoComercio) body.tipo = tipoComercio
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
    },
    estado: 'pendiente activacion'
  }

  axios.post(api.comercios, body, config)
    .then(res => {
      res.data 
    })
    .then(() => {
      dispatch(push('/' + api.claveComercios))
      dispatch(getComercios())      
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

const fetchComercio = (data, platos) => {
  let returnValue = []
  platos.map(function (rowObject) {
    if(rowObject.id){
      returnValue.push({ id: rowObject.id,  imagen: rowObject.imagen, nombre: rowObject.nombre,precio: rowObject.precio })
    }
  })
  let estado = data.estado
  let numberStreet = data.addressDto.street.match(/\d+$/)
  let number = ''
  if(numberStreet){
    number = parseInt( numberStreet[0], 10) 
  }
  let street = data.addressDto.street.replace(number,'')
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
    tipoComercio: data.tipo,
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
      activeSearch: true
    }
  case HYDRATE_COMERCIOS:
    return {
      ...state,
      result: fetchComerciosTable(action.data.comercios),
      allTipoComercios: fetchTipoComercios(action.data.tipoComercios),
      // alert: { style: 'success', text: 'Se ha creado el comercio correctamente' },
      activeSearch: true
    }
  case HYDRATE_COMERCIO_BY_ID:
    return {
      ...state,
      result: [],
      activeComercio: fetchComercio(action.data.comercio,action.data.platos),
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