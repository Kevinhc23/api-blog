# Creacion De Api Para La Gestion De Blogs Con MongoDB Y Cloudinary

## Descripcion

Api para la gestion de blogs, con la cual se puede crear, editar, eliminar y listar blogs, ademas de poder subir imagenes a cloudinary y guardar la url en la base de datos.

## Instalacion

Para instalar las dependencias del proyecto ejecutar el siguiente comando:

```bash
npm install
```

## Ejecucion

Para ejecutar el proyecto en modo desarrollo ejecutar el siguiente comando:

```bash
npm run dev
```

Para ejecutar el proyecto en modo produccion ejecutar el siguiente comando:

```bash
npm run start
```

## Uso

Para poder hacer uso de la api se debe hacer uso de un cliente http como postman o insomnia, y hacer uso de los siguientes endpoints:

### Blogs

#### Listar Blogs

Para listar los blogs se debe hacer una peticion GET a la siguiente ruta:

```bash
http://localhost:3000/api/articles/
```

#### Crear Blog

Para crear un blog se debe hacer una peticion POST a la siguiente ruta:

```bash
http://localhost:3000/api/articles/
```

Y enviar en el body de la peticion los siguientes datos:

```bash
{
    "title": "Titulo del blog",
    "content": "Contenido del blog",
    "image": "Url de la imagen"
}
```

#### Editar Blog

Para editar un blog se debe hacer una peticion PUT a la siguiente ruta:

```bash
http://localhost:3000/api/articles/:id
```

Y enviar en el body de la peticion los siguientes datos:

```bash
{
    "title": "Titulo del blog",
    "content": "Contenido del blog",
    "image": "Url de la imagen"
}
```

#### Eliminar Blog

Para eliminar un blog se debe hacer una peticion DELETE a la siguiente ruta:

```bash
http://localhost:3000/api/articles/:id
```

### Imagenes

#### Subir Imagen

Para subir una imagen se debe hacer una peticion POST a la siguiente ruta:

```bash
http://localhost:3000/api/upload-image
```

Y enviar en el body de la peticion los siguientes datos:

```bash
{
    "image": "Imagen a subir"
}
```

## Contribucion

Los pull request son bienvenidos. Para cambios importantes, por favor abra un issue primero para discutir lo que le gustaría cambiar.

Asegúrese de actualizar las pruebas según corresponda.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
```

