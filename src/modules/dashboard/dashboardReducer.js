import axios from 'axios'
import moment from 'moment'
import { getNullConfig, getGoogleConfig, getErrorResponse } from '../../utils/utils'
import { push } from 'react-router-redux'
import { generarContrasenia , getStateByEstado } from  '../../utils/utils'
import api from '../../config/api'

const HYDRATE_DASHBOARD = 'HYDRATE_DASHBOARD'
const HYDRATE_USUARIO_BY_ID = 'HYDRATE_USUARIO_BY_ID'
const HYDRATE_POSICION = 'HYDRATE_POSICION'
const HYDRATE_TIPO_DASHBOARD = 'HYDRATE_TIPO_DASHBOARD'
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
  allTipoDashboard: [],
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
export const tipoDashboardTodos = data => ({
  type: HYDRATE_TIPO_DASHBOARD, data
})

export const dashboard = data => ({
  type: HYDRATE_DASHBOARD, data
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
export const resetDashboard = () => dispatch => {
  let config = getNullConfig()
  // let data = [{id:1 , estado: 'habilitado', link: 'un.link', nombre: 'un nombre'},
  //   {id:2 , estado: 'deshabilitado', link: 'un.link2', nombre: 'un nombre2'}]
  // dispatch(dashboard({ dashboard:data}))
  axios.all([
    axios.get(api.usuarios, config),
    axios.get(api.comercios, config),
    axios.get(api.pedidos, config),
  ])
    .then(axios.spread(function (usuarios, comercios, pedidos) {
      return { usuarios: usuarios.data, comercios: comercios.data, pedidos: pedidos.data }
    }))
    .then(data => {
      dispatch(dashboard(data))
    })
    .catch(err => {
      if (err.response && err.response.status) {
        dispatch(queryError(getErrorResponse(err)))
      } else {
        dispatch(internalError(err))
      }
    })
  dispatch(clearUsuarioResult())
}

const fetchUsuarios = (usuarios) => {
  let returnValue = {habilitados: 0, deshabilitados: 0}
  console.log(usuarios)
  usuarios.map(function (usuario) {
    if(usuario.state === 'habilitado'){
      returnValue.habilitados += 1
    } else {
      returnValue.deshabilitados += 1
    }
  })
  return returnValue
}

const fetchComercios = (comercios) => {
  let returnValue = {habilitados: 0, deshabilitados: 0}
  console.log(comercios)
  comercios.map(function (comercio) {
    if(comercio.estado === 'habilitado'){
      returnValue.habilitados += 1
    } else {
      returnValue.deshabilitados += 1
    }
  })
  return returnValue
}

const fetchPedidos = (pedidos) => {
  console.log(pedidos)
  /*   let returnValue = {habilitados: 0, deshabilitados: 0}
  console.log(pedidos)
  pedidos.map(function (comercio) {
    if(comercio.estado === 'habilitado'){
      returnValue.habilitados += 1
    } else {
      returnValue.deshabilitados += 1
    }
  }) */
  let returnValue= {}
  returnValue.cancelados = [
    {x: moment('2018-01-01 10:00:00', 'Y-m-d H:m:s').valueOf(), y: 400},
    {x: moment('2018-01-01 11:00:00', 'Y-m-d H:m:s').valueOf(), y: 300},
    {x: moment('2018-01-01 12:00:00', 'Y-m-d H:m:s').valueOf(), y: 200},
    {x: moment('2018-01-01 13:00:00', 'Y-m-d H:m:s').valueOf(), y: 100},
    {x: moment('2018-01-01 14:00:00', 'Y-m-d H:m:s').valueOf(), y: 100},
    {x: moment('2018-01-01 15:00:00', 'Y-m-d H:m:s').valueOf(), y: 300},
    {x: moment('2018-01-01 16:00:00', 'Y-m-d H:m:s').valueOf(), y: 400},
    {x: moment('2018-01-01 17:00:00', 'Y-m-d H:m:s').valueOf(), y: 300},
    {x: moment('2018-01-01 18:00:00', 'Y-m-d H:m:s').valueOf(), y: 200},
    {x: moment('2018-01-01 19:00:00', 'Y-m-d H:m:s').valueOf(), y: 200},
    {x: moment('2018-01-01 20:00:00', 'Y-m-d H:m:s').valueOf(), y: 100},
    {x: moment('2018-01-01 21:00:00', 'Y-m-d H:m:s').valueOf(), y: 200},
    {x: moment('2018-01-01 22:00:00', 'Y-m-d H:m:s').valueOf(), y: 300},
    {x: moment('2018-01-01 23:00:00', 'Y-m-d H:m:s').valueOf(), y: 400},
    {x: moment('2018-01-02 00:00:00', 'Y-m-d H:m:s').valueOf(), y: 300},
    {x: moment('2018-01-02 01:00:00', 'Y-m-d H:m:s').valueOf(), y: 200},
    {x: moment('2018-01-02 02:00:00', 'Y-m-d H:m:s').valueOf(), y: 100},
  ]
  returnValue.entregados = [
    {x: moment('2018-01-01 10:00:00', 'Y-m-d H:m:s').valueOf(), y: 500},
    {x: moment('2018-01-01 11:00:00', 'Y-m-d H:m:s').valueOf(), y: 600},
    {x: moment('2018-01-01 12:00:00', 'Y-m-d H:m:s').valueOf(), y: 700},
    {x: moment('2018-01-01 13:00:00', 'Y-m-d H:m:s').valueOf(), y: 700},
    {x: moment('2018-01-01 14:00:00', 'Y-m-d H:m:s').valueOf(), y: 200},
    {x: moment('2018-01-01 15:00:00', 'Y-m-d H:m:s').valueOf(), y: 400},
    {x: moment('2018-01-01 16:00:00', 'Y-m-d H:m:s').valueOf(), y: 500},
    {x: moment('2018-01-01 17:00:00', 'Y-m-d H:m:s').valueOf(), y: 600},
    {x: moment('2018-01-01 18:00:00', 'Y-m-d H:m:s').valueOf(), y: 600},
    {x: moment('2018-01-01 19:00:00', 'Y-m-d H:m:s').valueOf(), y: 1000},
    {x: moment('2018-01-01 20:00:00', 'Y-m-d H:m:s').valueOf(), y: 1000},
    {x: moment('2018-01-01 21:00:00', 'Y-m-d H:m:s').valueOf(), y: 700},
    {x: moment('2018-01-01 22:00:00', 'Y-m-d H:m:s').valueOf(), y: 600},
    {x: moment('2018-01-01 23:00:00', 'Y-m-d H:m:s').valueOf(), y: 500},
    {x: moment('2018-01-02 00:00:00', 'Y-m-d H:m:s').valueOf(), y: 400},
    {x: moment('2018-01-02 01:00:00', 'Y-m-d H:m:s').valueOf(), y: 800},
    {x: moment('2018-01-02 02:00:00', 'Y-m-d H:m:s').valueOf(), y: 900},
  ]
  return returnValue
}

export default (state = initialState, action) => {
  switch (action.type) {
  case HYDRATE_DASHBOARD:
    return {
      ...state,
      dashboardUsuarios: fetchUsuarios(action.data.usuarios),
      dashboardComercios: fetchComercios(action.data.comercios),
      dashboardPedidos: fetchPedidos(action.data.pedidos),
      activeSearch: true
      ,alert: {},
    }
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