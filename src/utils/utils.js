import store from '../app/store'
import _ from 'lodash'

//Constantes
const fileMaxSize = 0.3 * 1000 * 1000 // 0.5MB

export const getConfig = () => ({
  headers: {
    'Authorization': store.getState().authReducer.user.token,
  }
})

export const getNullConfig = () => ({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
  }
})

export const getErrorResponse = (err) => {
  return { status: err.response.status, message: err.response.data }
}

export const getTipoComerciosSelectOptions = (allTipoComercios) => {
  let tipoComerciosOptions = []
  // allOrganismos.forEach(function (organismo) {
  //   if (organismo.nombre !==JgmReferences.NOMBRE_JGM ||with_jgm){
  //     organismoOptions.push({ value: organismo.id, label: organismo.nombre })
  //   }

  // }, this)
  tipoComerciosOptions.push({ value: 'Chino', label: 'Chino' })
  tipoComerciosOptions.push({ value: 'Parrilla', label: 'Parrilla' })
  tipoComerciosOptions.push({ value: 'Pastas', label: 'Pastas' })
  tipoComerciosOptions.push({ value: 'Sushi', label: 'Sushi' })
  tipoComerciosOptions.push({ value: 'Pizzería', label: 'Pizzería' })
  return tipoComerciosOptions
}

export const validFileType = (file) => {
  let fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/bmp']
  
  for(var i = 0; i < fileTypes.length; i++) {
    if(file.type === fileTypes[i]) {
      return true
    }
  }
  return false
}

export const validFileSize = (file) => {
  let size = file.size.replace(' kB','')
  if (size > fileMaxSize) {
    return false
  }
  return true
}

export const generarContrasenia = (longitud) => {
  longitud = longitud || 10
  var caracteres = 'abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ123456789'
  var contraseña = ''
  for (let i=0; i<longitud; i++) contraseña += caracteres.charAt(Math.floor(Math.random()*caracteres.length))
  return contraseña
}