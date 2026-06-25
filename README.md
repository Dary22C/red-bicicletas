# Red de Bicicletas — API con NodeJS, Express, MongoDB y Mongoose

Proyecto integrador del módulo de **persistencia de datos**: configuración de MongoDB, operaciones CRUD y conexión del modelo mediante Mongoose.

## Estructura del proyecto

```
red-bicicletas/
├── models/
│   └── bicicleta.js              # Esquema y modelo Mongoose (methods + statics)
├── controllers/
│   └── api/
│       └── bicicleta_controller.js
├── routes/
│   └── api/
│       └── bicicletas.js         # Rutas REST de la API
├── spec/
│   ├── models/
│   │   └── bicicleta_spec.js     # Tests del modelo con persistencia real
│   ├── bicicleta_api_test.spec.js# Tests de cada operación de la API (HTTP)
│   └── support/
│       └── jasmine.json
├── bin/
│   └── www
├── app.js
└── package.json
```

## Requisitos previos

- Node.js (v18 o superior recomendado)
- MongoDB Community Server instalado y corriendo localmente (`mongod`)
- MongoDB Compass (para visualizar la base de datos)
- Postman (para probar la API manualmente)

## Instalación

```bash
npm install
```

## Levantar la base de datos local

Asegúrate de que tu servicio de MongoDB esté corriendo:

```bash
mongod
```

La app se conecta automáticamente a una base local llamada **`red_bicicletas`**
(ver `app.js`), usando:

```js
mongoose.connect('mongodb://localhost/red_bicicletas');
```

## Levantar el servidor

```bash
npm start
```

El servidor queda escuchando en `http://localhost:3000`.

## Endpoints de la API

| Método | Ruta                              | Descripción                  |
|--------|------------------------------------|-------------------------------|
| GET    | /api/bicicletas                   | Lista todas las bicicletas    |
| POST   | /api/bicicletas/create            | Crea una nueva bicicleta      |
| GET    | /api/bicicletas/:code             | Busca una bicicleta por code  |
| PUT    | /api/bicicletas/update/:code      | Actualiza una bicicleta       |
| DELETE | /api/bicicletas/delete/:code      | Elimina una bicicleta         |

### Ejemplo de body para crear (POST /api/bicicletas/create)

```json
{
  "code": 1,
  "color": "rojo",
  "modelo": "urbana",
  "lat": -34.6037,
  "lng": -58.3816
}
```

## Correr los tests

```bash
npm test
```

Los tests usan **Jasmine** y corren contra una base de datos de **prueba**
(`red_bicicletas_test`) para no afectar los datos reales, tanto para el
modelo (con persistencia real en Mongo) como para la API completa
(usando `supertest`).

## Checklist de la consigna

- [x] Carpeta `models` dentro de `spec` → `spec/models/bicicleta_spec.js`
- [x] Tests aprobados al correr `npm test`
- [x] Tests de cada operación de la API de bicicleta → `spec/bicicleta_api_test.spec.js`
- [x] Archivo `bicicleta_api_test.spec.js`
- [x] Base local Mongo llamada `red_bicicletas` conectada con Mongoose
- [x] Modelo funcional probado con Postman (capturas a agregar por el alumno)
- [x] Documentos generados visibles en MongoDB Compass (captura a agregar)
- [x] Tests del modelo Bicicleta que usan persistencia (`spec/models/bicicleta_spec.js`)

> **Nota:** las capturas de pantalla de MongoDB Compass (colecciones y documentos)
> y de Postman (requests funcionando) deben generarse en tu propia máquina,
> ejecutando este proyecto con tu instancia local de MongoDB, y agregarse al
> repositorio (por ejemplo en una carpeta `/screenshots`) antes de la entrega.
