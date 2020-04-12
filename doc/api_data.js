define({ "api": [
  {
    "type": "post",
    "url": "/sudokus/",
    "title": "Crea sudoku",
    "description": "<p>Permite guardar en la base de datos el sudoku creado de un usuario</p>",
    "name": "createSudoku",
    "group": "Sudokus",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "cells",
            "description": "<p>Celdas del sudoku</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "cells.cell",
            "description": "<p>Celda concreta del sudoku</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "cells.cell.position",
            "description": "<p>Posición de la celda</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cells.cell.position.row",
            "description": "<p>Fila en la que se encuentra la celda</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cells.cell.position.column",
            "description": "<p>Columna en la que se encuentra la celda</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "cells.cell.writable",
            "description": "<p>Si se puede sobrescribir</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cells.cell.number",
            "description": "<p>Numero en la celda</p>"
          },
          {
            "group": "Parameter",
            "type": "[Number]",
            "optional": false,
            "field": "cells.cell.grid",
            "description": "<p>Candidatos a número de la celda</p>"
          },
          {
            "group": "Parameter",
            "type": "Enum",
            "optional": false,
            "field": "difficulty",
            "description": "<p>Nivel de dificultad del sudoku</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "seconds_accumulated",
            "description": "<p>Segundos que lleva jugados</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body",
          "content": " {\n \t\"cells\": [{\n\t\t  \"position\": {\n\t\t\t  \"row\": 5,\n\t\t\t  \"column\": 4\n\t\t  },\n\t\t  \"writable\": true,\n\t\t  \"number\": 0,\n\t\t  \"grid\": [1,4]\n\t    }, {\n\t\t  \"position\": {\n\t\t\t  \"row\": 1,\n\t\t\t  \"column\": 2\n\t\t  },\n\t\t  \"writable\": false,\n\t\t  \"number\": 8,\n\t\t  \"grid\": []\n\t  }],\n\t  \"difficulty\": \"facil\",\n\t  \"seconds_accumulated\": 100\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el resultado de la operación (OK)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Datos del sudoku</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK",
          "content": "   HTTP/1.1 200 OK\n {\n    \"status\": \"OK\",\n    \"data\": {\n        \"seconds_accumulated\": 100,\n        \"_id\": \"5e931e71e926f506b39f155a\",\n        \"cells\": [\n            {\n                \"grid\": [\n                    1,\n                    4\n                ],\n                \"_id\": \"5e931e71e926f506b39f155b\",\n                \"position\": {\n                    \"row\": 5,\n                    \"column\": 4\n                },\n                \"writable\": true,\n                \"number\": 0\n            },\n            {\n                \"grid\": [],\n                \"_id\": \"5e931e71e926f506b39f155c\",\n                \"position\": {\n                    \"row\": 1,\n                    \"column\": 2\n                },\n                \"writable\": false,\n                \"number\": 8\n            }\n        ],\n        \"difficulty\": \"facil\",\n        \"user\": \"5e931e3be926f506b39f1559\",\n        \"createdAt\": \"2020-04-12T13:58:09.258Z\",\n        \"updatedAt\": \"2020-04-12T13:58:09.258Z\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el código de error</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Incluye información legible sobre el error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"ERROR\",\n  \"message\": \"Sudoku validation failed: difficulty: `fácil` is not a valid enum value for path `difficulty`.\"\n}",
          "type": "json"
        },
        {
          "title": "Token no enviado",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"Missing header token\"\n}",
          "type": "json"
        },
        {
          "title": "Token caducado",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"jwt expired\"\n}",
          "type": "json"
        },
        {
          "title": "Token inválido",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"invalid signature\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/apidoc/endpoints.js",
    "groupTitle": "Sudokus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token JWT generado en el login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Enviar token JWT:",
          "content": "{\n  \"Authentication\": \"Bearer eyJhbGciOiJIUzI1NiIsIn[...]jyL8AjCGdgJDamKMt55ov7qfB36TKuR9zOc\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/sudokus/:sudokuId",
    "title": "Elimina sudoku",
    "description": "<p>Elimina de la base de datos el sudoku de un usuario</p>",
    "name": "deleteSudoku",
    "group": "Sudokus",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el resultado de la operación (OK)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje descriptivo del resultado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Usuario actualizado",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"OK\",\n  \"message\": \"sudoku deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el código de error</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Incluye información legible sobre el error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": \"ERROR\",\n  \"message\": \"\"\n}",
          "type": "json"
        },
        {
          "title": "Token no enviado",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"Missing header token\"\n}",
          "type": "json"
        },
        {
          "title": "Token caducado",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"jwt expired\"\n}",
          "type": "json"
        },
        {
          "title": "Token inválido",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"invalid signature\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/apidoc/endpoints.js",
    "groupTitle": "Sudokus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token JWT generado en el login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Enviar token JWT:",
          "content": "{\n  \"Authentication\": \"Bearer eyJhbGciOiJIUzI1NiIsIn[...]jyL8AjCGdgJDamKMt55ov7qfB36TKuR9zOc\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/sudokus/:sudokuId",
    "title": "Obtiene sudoku",
    "description": "<p>Obtiene el sudoku de un usuario</p>",
    "name": "getSudoku",
    "group": "Sudokus",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el resultado de la operación (OK)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Contiene el sudoku</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"OK\",\n  \"message\": {\n       \"seconds_accumulated\": 100,\n       \"_id\": \"5e931e71e926f506b39f155a\",\n       \"cells\": [\n           {\n               \"position\": {\n                   \"row\": 5,\n                   \"column\": 4\n               },\n               \"grid\": [\n                   1,\n                   4\n               ],\n               \"_id\": \"5e931e71e926f506b39f155b\",\n               \"writable\": true,\n               \"number\": 0\n           },\n           {\n               \"position\": {\n                   \"row\": 1,\n                   \"column\": 2\n               },\n               \"grid\": [],\n               \"_id\": \"5e931e71e926f506b39f155c\",\n               \"writable\": false,\n               \"number\": 8\n           }\n       ],\n       \"difficulty\": \"facil\",\n       \"user\": \"5e931e3be926f506b39f1559\",\n       \"createdAt\": \"2020-04-12T13:58:09.258Z\",\n       \"updatedAt\": \"2020-04-12T13:58:09.258Z\",\n       \"__v\": 0\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el código de error</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Incluye información legible sobre el error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": \"ERROR\",\n  \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/apidoc/endpoints.js",
    "groupTitle": "Sudokus"
  },
  {
    "type": "get",
    "url": "/sudokus/user/:userId",
    "title": "Obtiene sudokus",
    "description": "<p>Obtiene los sudokus de un usuario</p>",
    "name": "getSudokuByUser",
    "group": "Sudokus",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el resultado de la operación (OK)</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>Contiene los sudokus del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"OK\",\n  \"data\": [\n    {\n       \"seconds_accumulated\": 100,\n       \"_id\": \"5e931e71e926f506b39f155a\",\n       \"cells\": [\n           {\n               \"position\": {\n                   \"row\": 5,\n                   \"column\": 4\n               },\n               \"grid\": [\n                   1,\n                   4\n               ],\n               \"_id\": \"5e931e71e926f506b39f155b\",\n               \"writable\": true,\n               \"number\": 0\n           },\n           {\n               \"position\": {\n                   \"row\": 1,\n                   \"column\": 2\n               },\n               \"grid\": [],\n               \"_id\": \"5e931e71e926f506b39f155c\",\n               \"writable\": false,\n               \"number\": 8\n           }\n       ],\n       \"difficulty\": \"facil\",\n       \"user\": \"5e931e3be926f506b39f1559\",\n       \"createdAt\": \"2020-04-12T13:58:09.258Z\",\n       \"updatedAt\": \"2020-04-12T13:58:09.258Z\",\n       \"__v\": 0\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el código de error</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Incluye información legible sobre el error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": \"ERROR\",\n  \"message\": \"\"\n}",
          "type": "json"
        },
        {
          "title": "Token no enviado",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"Missing header token\"\n}",
          "type": "json"
        },
        {
          "title": "Token caducado",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"jwt expired\"\n}",
          "type": "json"
        },
        {
          "title": "Token inválido",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"invalid signature\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/apidoc/endpoints.js",
    "groupTitle": "Sudokus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token JWT generado en el login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Enviar token JWT:",
          "content": "{\n  \"Authentication\": \"Bearer eyJhbGciOiJIUzI1NiIsIn[...]jyL8AjCGdgJDamKMt55ov7qfB36TKuR9zOc\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/sudokus/:sudokuId",
    "title": "Actualiza sudoku",
    "description": "<p>Modifica datos de un sudoku</p>",
    "name": "updateSudoku",
    "group": "Sudokus",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el resultado de la operación (OK)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje descriptivo del resultado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"OK\",\n  \"message\": \"sudoku updated\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el código de error</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Incluye información legible sobre el error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": \"ERROR\",\n  \"message\": \"sudoku updated\"\n}",
          "type": "json"
        },
        {
          "title": "Token no enviado",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"Missing header token\"\n}",
          "type": "json"
        },
        {
          "title": "Token caducado",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"jwt expired\"\n}",
          "type": "json"
        },
        {
          "title": "Token inválido",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"invalid signature\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/apidoc/endpoints.js",
    "groupTitle": "Sudokus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token JWT generado en el login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Enviar token JWT:",
          "content": "{\n  \"Authentication\": \"Bearer eyJhbGciOiJIUzI1NiIsIn[...]jyL8AjCGdgJDamKMt55ov7qfB36TKuR9zOc\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Crea usuario",
    "description": "<p>Crea un nuevo usuario y se guarda en la base de datos</p>",
    "name": "createUser",
    "group": "Usuarios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body",
          "content": "{\n  \"username\": \"Eli\",\n  \"password\": \"SecretPassword\",\n  \"email\": \"eli@gmail.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el resultado de la operación (OK)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje descriptivo del resultado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Usuario creado",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"OK\",\n  \"message\": \"user created\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el código de error</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Incluye información legible sobre el error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Contraseña no válida",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": \"ERROR\",\n  \"message\": \"data must be a string and salt must either be a salt string or a number of rounds\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/apidoc/endpoints.js",
    "groupTitle": "Usuarios"
  },
  {
    "type": "delete",
    "url": "/users/:userId",
    "title": "Elimina usuario",
    "description": "<p>Elimina un usuario de la base de datos</p>",
    "name": "deleteUser",
    "group": "Usuarios",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el resultado de la operación (OK)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje descriptivo del resultado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Usuario eliminado",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"OK\",\n  \"message\": \"user deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el código de error</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Incluye información legible sobre el error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": \"ERROR\",\n  \"message\": \"user deleted\"\n}",
          "type": "json"
        },
        {
          "title": "Token no enviado",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"Missing header token\"\n}",
          "type": "json"
        },
        {
          "title": "Token caducado",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"jwt expired\"\n}",
          "type": "json"
        },
        {
          "title": "Token inválido",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"invalid signature\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/apidoc/endpoints.js",
    "groupTitle": "Usuarios",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token JWT generado en el login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Enviar token JWT:",
          "content": "{\n  \"Authentication\": \"Bearer eyJhbGciOiJIUzI1NiIsIn[...]jyL8AjCGdgJDamKMt55ov7qfB36TKuR9zOc\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/users/isAvailable?username=",
    "title": "Comprueba disponibilidad de username o email",
    "description": "<p>Permite saber si un username o email está en uso</p>",
    "name": "isAvailable",
    "group": "Usuarios",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el resultado de la operación (OK)</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje del resultado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de disponibilidad",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"OK\",\n  \"message\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el código de error</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Incluye información legible sobre el error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"ERROR\",\n  \"message\": \"Only one parameter is allowed\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/apidoc/endpoints.js",
    "groupTitle": "Usuarios"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Loguea usuario",
    "description": "<p>Permite al usuario loguearse en el servicio</p>",
    "name": "login",
    "group": "Usuarios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de login",
          "content": "{\n  \"email\": \"user@gmail.com\",\n  \"password\": \"SecretPassword\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el código de error</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Incluye información legible sobre el error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Login inválido",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"INVALID_EMAIL_AND/OR_PASSWORD\",\n  \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/apidoc/endpoints.js",
    "groupTitle": "Usuarios",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el resultado de la operación (OK)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Contiene datos del usuario y la información de los tokens</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.token",
            "description": "<p>Token JWT que deberá adjuntarse en cada petición</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.refreshToken",
            "description": "<p>Token de relogin automático cuando caduque JWT</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Usuario logueado",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"OK\",\n  \"data\": {\n    \"token\": \"eyJhbGciOiJIUzI1NiIsIn[...]jyL8AjCGdgJDamKMt55ov7qfB36TKuR9zOc\",\n    \"refreshToken\": \"M5cMSU2Wun41BuxbeaCt\"\n  }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/refreshToken",
    "title": "Loguea usuario con refresh token",
    "description": "<p>Cuando el token JWT caduca, el sistema se puede volver a autenticar enviando el refresh token que se le dio en el momento del login.</p>",
    "name": "resfresh",
    "group": "Usuarios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Identificador de usuario en el sistema</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refresh",
            "description": "<p>Token de refresco obtenido en el login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Solicitud de login por refresco",
          "content": "{\n  \"userId\": \"5e8ca2c101a21406f6fe8a74\",\n  \"refresh\": \"1G1KAU3qV34CQb12MnSi\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el código de error</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Incluye información legible sobre el error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Token de refresco no válido",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"INVALID_REFRESH_TOKEN\",\n  \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/apidoc/endpoints.js",
    "groupTitle": "Usuarios",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el resultado de la operación (OK)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Contiene datos del usuario y la información de los tokens</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.token",
            "description": "<p>Token JWT que deberá adjuntarse en cada petición</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.refreshToken",
            "description": "<p>Token de relogin automático cuando caduque JWT</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Usuario logueado",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"OK\",\n  \"data\": {\n    \"token\": \"eyJhbGciOiJIUzI1NiIsIn[...]jyL8AjCGdgJDamKMt55ov7qfB36TKuR9zOc\",\n    \"refreshToken\": \"M5cMSU2Wun41BuxbeaCt\"\n  }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/users/:userId",
    "title": "Actualiza usuario",
    "description": "<p>Actualiza los datos de un usuario y los guarda en la base de datos</p>",
    "name": "updateUser",
    "group": "Usuarios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Body",
          "content": "{\n  \"username\": \"Eli\",\n  \"password\": \"SecretPassword\",\n  \"email\": \"eli@gmail.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el resultado de la operación (OK)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Mensaje descriptivo del resultado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Usuario actualizado",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"OK\",\n  \"message\": \"user updated\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Contiene el código de error</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Incluye información legible sobre el error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": \"ERROR\",\n  \"message\": \"user updated\"\n}",
          "type": "json"
        },
        {
          "title": "Token no enviado",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"Missing header token\"\n}",
          "type": "json"
        },
        {
          "title": "Token caducado",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"jwt expired\"\n}",
          "type": "json"
        },
        {
          "title": "Token inválido",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": \"ACCESS_DENIED\",\n  \"message\": \"invalid signature\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "doc/apidoc/endpoints.js",
    "groupTitle": "Usuarios",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token JWT generado en el login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Enviar token JWT:",
          "content": "{\n  \"Authentication\": \"Bearer eyJhbGciOiJIUzI1NiIsIn[...]jyL8AjCGdgJDamKMt55ov7qfB36TKuR9zOc\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
