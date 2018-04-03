import store from '../app/store'
import _ from 'lodash'

export const getConfig = () => ({
  headers: {
    'Authorization': store.getState().authReducer.user.token,
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
  return tipoComerciosOptions
}