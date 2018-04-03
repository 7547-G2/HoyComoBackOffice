## Aplicación web para administrar el Shared Server

Ejecución local:

1) Instalar en forma global webpack-dev-server
```
npm install -g webpack webpack-dev-server
```
2) Instalar todas las dependencias
```
npm install
```
3) Ejecutar en puerto por defecto (3020)
```
npm run start
```
4) Ejecutar en otro puerto. El mismo debe ser pasado por parametro. Por ejemplo si lo quiero en el puerto 5000, se ejecuta:
  npm run start-other 5000

5) Si se quiere empaquetar localmente con webpack en la carpeta public, se deben instalar los paquetes webpack y webpack-cli en forma global __con una versión idéntica a la que figura en el package-lock.json de la aplicación.__ De lo contrario es posible que falle el empaquetamiento por diferencias de versión. A continuación va un ejemplo de como se instala localmente:
```
npm install -g webpack@3.5.1 webpack-cli@2.0.13
```

### Próximamente:

- Configuración de docker