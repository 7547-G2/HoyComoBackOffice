// En este archivo se guardarian las firmas de la API del sharedServer

// Defaults
const BASE = 'https://hoy-como-backend.herokuapp.com/api/'

// Api routes phrases
const LOGIN = 'token'
const comercios = 'comercios'
const platos = 'platos'
const categorias = 'categoriasComida'
const bocomercios ='backofficeComercio'
const tipoComercios = 'mobileUser/tipoComida'

export default {
  base: BASE,
  bocomercios: BASE + bocomercios,
  comercios: BASE + comercios,
  login: BASE + LOGIN,
  claveComercios: comercios,
  clavePlatos: platos,
  clavetipoComercios: tipoComercios,
  claveCategorias: categorias,
}