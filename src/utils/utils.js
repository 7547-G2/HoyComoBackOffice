import store from '../app/store'
import _ from 'lodash'

export const getConfig = () => ({
  headers: {
    'Authorization': store.getState().authReducer.user.token,
  }
})

export const getNullConfig = () => ({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
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


const fileMinSize = 1 * 1000 * 1000 // 1MB
const fileMaxSize = 50 * 1000 * 1000 // 50MB

export default function validateFile(values) {
  let errors = {}
  console.log(values)

  if (!values.file) {
    errors.file = 'Required'
  } else {
    let file = values.file[0]

    if (!file.name.endsWith('.stl') || !file.name.endsWith('.obj')) {
      errors.file = 'Scan file must be an .STL or .OBJ file'
    } else if (file.size < fileMinSize) {
      errors.file = 'Scan file must be atleast 1MB'
    } else if (file.size > fileMaxSize) {
      errors.file = 'Scan file cannot exceed 50MB size'
    }
  }

  console.log(errors)
  // Object {file: "Required"}
  return errors
}