// En este archivo se guardarian las firmas de la API del sharedServer

// Defaults
const BASE = 'https://hoy-como-backend.herokuapp.com/api/'

// Api routes phrases
const LOGIN = 'token'
const comercios = 'comercios'
const platos = 'platos'
const bocomercios ='backofficeComercio'

export default {
  base: BASE,
  bocomercios: BASE + bocomercios,
  comercios: BASE + comercios,
  login: BASE + LOGIN,
  claveComercios: comercios,
  clavePlatos: platos,
}