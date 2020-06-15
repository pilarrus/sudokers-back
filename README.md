# sudokers-back
Sudokers es una aplicación web dirigida a todo aquel que quiera jugar sudokus sin necesitad de llevar consigo un cuaderno de sudokus y un boli o lápiz.
Se puede utilizar desde el navegador de cualquier ordenador o preferiblemente desde el móvil, ya que te lo puedes llevar a cualquier parte ;)

## Prueba online
Si no quieres descargar el código puedes probar Sudokers en [www.pilarrus.eu](https://www.pilarrus.eu). Es recomendable visitar el enlace desde el móvil, ya que la aplicación está diseñada principalmente para usarse con el móvil.

Puedes usar el usuario juan@gmail.com con la contraseña 1234.

## Instalación en local
1. Debes tener instalado docker y docker-compose.
2. Abres una terminal y te sitúas en el directorio raíz del proyecto, donde está el docker-compose.yml.
3. Arrancas los contenedores ejecutando el comando:
```
docker-compose up -d
        o
docker-compose up
```
4. Cuando quieras pararlos, ejecutas:
```
docker-compose stop
```
A parte, también es necesario que descargues sudokers-front en [https://github.com/pilarrus/sudokers-front](https://github.com/pilarrus/sudokers-front) y sigas las instrucciones de instalación.

Una vez hayas descargado las dos partes de Sudokers y seguido las instrucciones. Abre un navegador con la dirección [http://localhost:8080](http://localhost:8080).