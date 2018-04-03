// En este archivo se guardarian las firmas de la API del sharedServer

// Defaults
const API_PORT = '3050'
const API_VERSION = 'v0'
const ROOT = 'localhost:' + API_PORT + '/' + API_VERSION + '/api/'
const PROTOCOL = 'http'
const BASE = PROTOCOL + '://' + ROOT

// Api routes phrases
const LOGIN = 'token'
const comercios = 'comercios'

export default {
  base: BASE,
  login: BASE + LOGIN
}