/* eslint-disable */
/**
 * @apiDefine sendAuth
 * @apiHeader {String} authorization Token JWT generado en el login
 * @apiHeaderExample {json} Enviar token JWT:
 *    {
 *      "Authentication": "Bearer eyJhbGciOiJIUzI1NiIsIn[...]jyL8AjCGdgJDamKMt55ov7qfB36TKuR9zOc"
 *    }
 *
 * @apiError {String} status Contiene el código de error
 * @apiError {String} message Incluye información legible sobre el error
 * @apiErrorExample {json} Token no enviado
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "status": "ACCESS_DENIED",
 *      "message": "Missing header token"
 *    }
 *    @apiErrorExample {json} Token caducado
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "status": "ACCESS_DENIED",
 *      "message": "jwt expired"
 *    }
 *    @apiErrorExample {json} Token inválido
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "status": "ACCESS_DENIED",
 *      "message": "invalid signature"
 *    }
 */

/**
 * @apiDefine loginResponse
 * @apiSuccess {String} status Contiene el resultado de la operación (OK)
 * @apiSuccess {String} data Contiene datos del usuario y la información de los tokens
 * @apiSuccess {String} data.token Token JWT que deberá adjuntarse en cada petición
 * @apiSuccess {String} data.refreshToken Token de relogin automático cuando caduque JWT
 * @apiSuccessExample {json} Usuario logueado
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "OK",
 *      "data": {
 *        "token": "eyJhbGciOiJIUzI1NiIsIn[...]jyL8AjCGdgJDamKMt55ov7qfB36TKuR9zOc",
 *        "refreshToken": "M5cMSU2Wun41BuxbeaCt"
 *      }
 *    }
 */

/**
 * @api {post} /login Loguea usuario
 * @apiDescription Permite al usuario loguearse en el servicio
 * @apiName login
 * @apiGroup Usuarios
 * @apiUse loginResponse
 *
 * @apiParam {String} email Email del usuario
 * @apiParam {String} password Contraseña del usuario
 * @apiParamExample {json} Ejemplo de login
 *     {
 *       "email": "user@gmail.com",
 *       "password": "SecretPassword"
 *     }
 *
 * @apiError {String} status Contiene el código de error
 * @apiError {String} message Incluye información legible sobre el error
 * @apiErrorExample {json} Login inválido
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "status": "INVALID_EMAIL_AND/OR_PASSWORD",
 *      "message": ""
 *    }
 */

/**
 * @api {post} /refreshToken Loguea usuario con refresh token
 * @apiDescription Cuando el token JWT caduca, el sistema se puede volver a autenticar enviando
 * el refresh token que se le dio en el momento del login.
 *
 * @apiName resfresh
 * @apiGroup Usuarios
 * @apiUse loginResponse
 *
 * @apiParam {String} userId Identificador de usuario en el sistema
 * @apiParam {String} refresh Token de refresco obtenido en el login
 * @apiParamExample {json} Solicitud de login por refresco
 *    {
 *      "userId": "5e8ca2c101a21406f6fe8a74",
 *      "refresh": "1G1KAU3qV34CQb12MnSi"
 *    }
 *
 * @apiError {String} status Contiene el código de error
 * @apiError {String} message Incluye información legible sobre el error
 * @apiErrorExample {json} Token de refresco no válido
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "status": "INVALID_REFRESH_TOKEN",
 *      "message": ""
 *    }
 */

/**
 * @api {post} /users Crea usuario
 * @apiDescription Crea un nuevo usuario y se guarda en la base de datos
 *
 * @apiName createUser
 * @apiGroup Usuarios
 *
 * @apiParam {String} username Nombre del usuario
 * @apiParam {String} password Contraseña del usuario
 * @apiParam {String} email Email del usuario
 * @apiParamExample {json} Body
 *    {
 *      "username": "Eli",
 *      "password": "SecretPassword",
 *      "email": "eli@gmail.com"
 *    }
 *
 * @apiSuccess {String} status Contiene el resultado de la operación (OK)
 * @apiSuccess {String} message Mensaje descriptivo del resultado
 * @apiSuccessExample {json} Usuario creado
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "OK",
 *      "message": "user created"
 *    }
 *
 * @apiError {String} status Contiene el código de error
 * @apiError {String} message Incluye información legible sobre el error
 * @apiErrorExample {json} Contraseña no válida
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "status": "ERROR",
 *      "message": "data must be a string and salt must either be a salt string or a number of rounds"
 *    }
 */

/**
 * @api {patch} /users/:userId Actualiza usuario
 * @apiDescription Actualiza los datos de un usuario y los guarda en la base de datos
 *
 * @apiName updateUser
 * @apiGroup Usuarios
 * @apiUse sendAuth
 *
 * @apiParam {String} username Nombre del usuario
 * @apiParam {String} password Contraseña del usuario
 * @apiParam {String} email Email del usuario
 * @apiParamExample {json} Body
 *    {
 *      "username": "Eli",
 *      "password": "SecretPassword",
 *      "email": "eli@gmail.com"
 *    }
 *
 * @apiSuccess {String} status Contiene el resultado de la operación (OK)
 * @apiSuccess {String} message Mensaje descriptivo del resultado
 * @apiSuccessExample {json} Usuario actualizado
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "OK",
 *      "message": "user updated"
 *    }
 *
 * @apiError {String} status Contiene el código de error
 * @apiError {String} message Incluye información legible sobre el error
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "status": "ERROR",
 *      "message": "user updated"
 *    }
 */

/**
 * @api {delete} /users/:userId Elimina usuario
 * @apiDescription Elimina un usuario de la base de datos
 *
 * @apiName deleteUser
 * @apiGroup Usuarios
 * @apiUse sendAuth
 *
 * @apiSuccess {String} status Contiene el resultado de la operación (OK)
 * @apiSuccess {String} message Mensaje descriptivo del resultado
 * @apiSuccessExample {json} Usuario eliminado
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "OK",
 *      "message": "user deleted"
 *    }
 *
 * @apiError {String} status Contiene el código de error
 * @apiError {String} message Incluye información legible sobre el error
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "status": "ERROR",
 *      "message": "user deleted"
 *    }
 */

/**
 * @api {get} /users/isAvailable?username= Comprueba disponibilidad de username o email
 * @apiDescription Permite saber si un username o email está en uso
 *
 * @apiName isAvailable
 * @apiGroup Usuarios
 *
 * @apiSuccess {String} status Contiene el resultado de la operación (OK)
 * @apiSuccess {Boolean} message Mensaje del resultado
 * @apiSuccessExample {json} Ejemplo de disponibilidad
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "OK",
 *      "message": true
 *    }
 *
 * @apiError {String} status Contiene el código de error
 * @apiError {String} message Incluye información legible sobre el error
 * @apiErrorExample {json} Error
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "status": "ERROR",
 *      "message": "Only one parameter is allowed"
 *    }
 */

/**
 * @api {post} /sudokus/ Crea sudoku
 * @apiDescription Permite guardar en la base de datos el sudoku creado de un usuario
 *
 * @apiName createSudoku
 * @apiGroup Sudokus
 * @apiUse sendAuth
 *
 * @apiParam {Array} cells Celdas del sudoku
 * @apiParam {Object} cells.cell Celda concreta del sudoku
 * @apiParam {Object} cells.cell.position Posición de la celda
 * @apiParam {Number} cells.cell.position.row Fila en la que se encuentra la celda
 * @apiParam {Number} cells.cell.position.column Columna en la que se encuentra la celda
 * @apiParam {Boolean} cells.cell.writable Si se puede sobrescribir
 * @apiParam {Number} cells.cell.number Numero en la celda
 * @apiParam {[Number]} cells.cell.grid Candidatos a número de la celda
 * @apiParam {Enum} difficulty Nivel de dificultad del sudoku
 * @apiParam {Number} [seconds_accumulated] Segundos que lleva jugados
 * @apiParamExample {json} Body
 *  {
 *  	"cells": [{
 *		  "position": {
 *			  "row": 5,
 *			  "column": 4
 *		  },
 *		  "writable": true,
 *		  "number": 0,
 *		  "grid": [1,4]
 *	    }, {
 *		  "position": {
 *			  "row": 1,
 *			  "column": 2
 *		  },
 *		  "writable": false,
 *		  "number": 8,
 *		  "grid": []
 *	  }],
 *	  "difficulty": "facil",
 *	  "seconds_accumulated": 100
 *  }
 *
 * @apiSuccess {String} status Contiene el resultado de la operación (OK)
 * @apiSuccess {Object} data Datos del sudoku
 * @apiSuccessExample {json} OK
 *    HTTP/1.1 200 OK
 {
    "status": "OK",
    "data": {
        "seconds_accumulated": 100,
        "_id": "5e931e71e926f506b39f155a",
        "cells": [
            {
                "grid": [
                    1,
                    4
                ],
                "_id": "5e931e71e926f506b39f155b",
                "position": {
                    "row": 5,
                    "column": 4
                },
                "writable": true,
                "number": 0
            },
            {
                "grid": [],
                "_id": "5e931e71e926f506b39f155c",
                "position": {
                    "row": 1,
                    "column": 2
                },
                "writable": false,
                "number": 8
            }
        ],
        "difficulty": "facil",
        "user": "5e931e3be926f506b39f1559",
        "createdAt": "2020-04-12T13:58:09.258Z",
        "updatedAt": "2020-04-12T13:58:09.258Z",
        "__v": 0
    }
}
 *
 * @apiError {String} status Contiene el código de error
 * @apiError {String} message Incluye información legible sobre el error
 * @apiErrorExample {json} Error
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "status": "ERROR",
 *      "message": "Sudoku validation failed: difficulty: `fácil` is not a valid enum value for path `difficulty`."
 *    }
 */

/**
 * @api {delete} /sudokus/:sudokuId Elimina sudoku
 * @apiDescription Elimina de la base de datos el sudoku de un usuario
 *
 * @apiName deleteSudoku
 * @apiGroup Sudokus
 * @apiUse sendAuth
 *
 * @apiSuccess {String} status Contiene el resultado de la operación (OK)
 * @apiSuccess {String} message Mensaje descriptivo del resultado
 * @apiSuccessExample {json} Usuario actualizado
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "OK",
 *      "message": "sudoku deleted"
 *    }
 *
 * @apiError {String} status Contiene el código de error
 * @apiError {String} message Incluye información legible sobre el error
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "status": "ERROR",
 *      "message": ""
 *    }
 */

/**
 * @api {get} /sudokus/:sudokuId Obtiene sudoku
 * @apiDescription Obtiene el sudoku de un usuario
 *
 * @apiName getSudoku
 * @apiGroup Sudokus
 *
 * @apiSuccess {String} status Contiene el resultado de la operación (OK)
 * @apiSuccess {Object} message Contiene el sudoku
 * @apiSuccessExample {json} OK
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "OK",
 *      "message": {
 *           "seconds_accumulated": 100,
 *           "_id": "5e931e71e926f506b39f155a",
 *           "cells": [
 *               {
 *                   "position": {
 *                       "row": 5,
 *                       "column": 4
 *                   },
 *                   "grid": [
 *                       1,
 *                       4
 *                   ],
 *                   "_id": "5e931e71e926f506b39f155b",
 *                   "writable": true,
 *                   "number": 0
 *               },
 *               {
 *                   "position": {
 *                       "row": 1,
 *                       "column": 2
 *                   },
 *                   "grid": [],
 *                   "_id": "5e931e71e926f506b39f155c",
 *                   "writable": false,
 *                   "number": 8
 *               }
 *           ],
 *           "difficulty": "facil",
 *           "user": "5e931e3be926f506b39f1559",
 *           "createdAt": "2020-04-12T13:58:09.258Z",
 *           "updatedAt": "2020-04-12T13:58:09.258Z",
 *           "__v": 0
 *      }
 *    }
 *
 * @apiError {String} status Contiene el código de error
 * @apiError {String} message Incluye información legible sobre el error
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "status": "ERROR",
 *      "message": ""
 *    }
 */

/**
 * @api {get} /sudokus/user/:userId Obtiene sudokus
 * @apiDescription Obtiene los sudokus de un usuario
 *
 * @apiName getSudokuByUser
 * @apiGroup Sudokus
 * @apiUse sendAuth
 *
 * @apiSuccess {String} status Contiene el resultado de la operación (OK)
 * @apiSuccess {Array} data Contiene los sudokus del usuario
 * @apiSuccessExample {json} OK
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "OK",
 *      "data": [
 *        {
 *           "seconds_accumulated": 100,
 *           "_id": "5e931e71e926f506b39f155a",
 *           "cells": [
 *               {
 *                   "position": {
 *                       "row": 5,
 *                       "column": 4
 *                   },
 *                   "grid": [
 *                       1,
 *                       4
 *                   ],
 *                   "_id": "5e931e71e926f506b39f155b",
 *                   "writable": true,
 *                   "number": 0
 *               },
 *               {
 *                   "position": {
 *                       "row": 1,
 *                       "column": 2
 *                   },
 *                   "grid": [],
 *                   "_id": "5e931e71e926f506b39f155c",
 *                   "writable": false,
 *                   "number": 8
 *               }
 *           ],
 *           "difficulty": "facil",
 *           "user": "5e931e3be926f506b39f1559",
 *           "createdAt": "2020-04-12T13:58:09.258Z",
 *           "updatedAt": "2020-04-12T13:58:09.258Z",
 *           "__v": 0
 *        }
 *      ]
 *    }
 *
 * @apiError {String} status Contiene el código de error
 * @apiError {String} message Incluye información legible sobre el error
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "status": "ERROR",
 *      "message": ""
 *    }
 */

/**
 * @api {patch} /sudokus/:sudokuId Actualiza sudoku
 * @apiDescription Modifica datos de un sudoku
 *
 * @apiName updateSudoku
 * @apiGroup Sudokus
 * @apiUse sendAuth
 *
 * @apiSuccess {String} status Contiene el resultado de la operación (OK)
 * @apiSuccess {String} message Mensaje descriptivo del resultado
 * @apiSuccessExample {json} OK
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "OK",
 *      "message": "sudoku updated"
 *    }
 *
 * @apiError {String} status Contiene el código de error
 * @apiError {String} message Incluye información legible sobre el error
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "status": "ERROR",
 *      "message": "sudoku updated"
 *    }
 */