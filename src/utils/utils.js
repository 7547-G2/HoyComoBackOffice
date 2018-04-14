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
    'Access-Control-Allow-Origin':  '',
    // 'Access-Control-Allow-Headers': '*',
    // 'Access-Control-Allow-Methods': '*',
  }
})

export const getErrorResponse = (err) => {
  return { status: err.response.status, message: err.response.data.message.msg }
}

export const getTipoComerciosSelectOptions = (allTipoComercios) => {
  let tipoComerciosOptions = []
  // allOrganismos.forEach(function (organismo) {
  //   if (organismo.nombre !==JgmReferences.NOMBRE_JGM ||with_jgm){
  //     organismoOptions.push({ value: organismo.id, label: organismo.nombre })
  //   }

  // }, this)
  tipoComerciosOptions.push({ value: 1, label: 'chino' })
  tipoComerciosOptions.push({ value: 2, label: 'parrilla' })
  tipoComerciosOptions.push({ value: 3, label: 'pastas' })
  tipoComerciosOptions.push({ value: 4, label: 'sushi' })
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
  let size = file.size
  if (size > fileMaxSize) {
    return false
  }
  return true
}