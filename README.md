# Facemask'd

Sistema de reconocimiento automático de mascarillas y lector de temperatura corporal.

## Componentes y montaje

El proyecto incorpora los siguientes componentes:

- Raspberry Pi 4B
- Cámara USB 1080p (cualquier cámara o webcam serviría)
- Cámara térmica MLX90641

La cámara de vídeo (webcam) no requiere ningún tipo de montaje especial. Simplemente hemos de conectarla a uno de los cuatro puertos USB que tiene nuestra Raspberry Pi.

Por el contrario, la cámara térmica debe ser conectada directamente a los pines GPIO de la placa. En primer lugar, el pin GND del sensor deberá ser conectado a uno de los pines GND de la Raspberry Pi (por razones de conveniencia, utilizaremos el pin número 9; véase [Configuración de los pines GPIO (en inglés)](https://www.raspberrypi.org/documentation/usage/gpio/)). Del mismo modo, el pin VCC del sensor será conectado al pin 1 en la placa ("3V3 Power").

Seguidamente, quedan los pines SDA y SCL, que serán conectados, respectivamente, a los pines 3 (SDA0) y 5 (SCL0) de nuestra placa, los cuales conforman la interfaz I2C de la Raspberry Pi.

## Configuración rápida

En primer lugar, es necesario instalar una distribución de Linux en nuestra Raspberry Pi (se recomienda emplear [Raspberry Pi OS/Raspbian](https://www.raspberrypi.org/software/), haciendo uso de una tarjeta MicroSD que haga la función de memoria interna para el sistema operativo.

Tras esto, comprobaremos que Python está instalado (y por consiguiente, `python-pip`), y en una versión igual o superior a Python 3.6. Para ello, ejecute en una consola Bash la instrucción `python --version`. En caso de que Python no esté instalado, o bien sí lo esté, pero en una versión antigua, instale una nueva versión antes de continuar.

A continuación, descargue una copia del código de la última versión de Facemask'd en [https://github.com/albertonl/facemaskd/releases](https://github.com/albertonl/facemaskd/releases). Si así lo desea, es posible configurar un servidor de producción para servir nuestra aplicación de Django. Sin embargo, aquí se describe el proceso para configurar un servidor temporal de desarrollo, el cual permitirá el acceso a través de `http://localhost:8000`.

### Ejecución del servidor de desarrollo

Si todavía no se encuentra instalado, instale `virtualenv` vía `pip`:

```$ python3 -m pip install virtualenv```

Tras esto, sitúese en el directorio base de nuestro proyecto, cree un entorno virtual y actívelo:

```$ venv env && source env/bin/activate```

Una vez el entorno virtual esté activado, instale las dependencias del proyecto:

```$ pip install -r requirements.txt```

Aún desde el directorio base, aplique las migraciones iniciales:

```$ python manage.py migrate```

Y por último, active el servidor de desarrollo:

```$ python manage.py runserver```

Ahora, el proyecto estará disponible en la dirección `http://localhost:8000`. Para apagar el servidor y desactivar el entorno virtual, haga `Ctrl+C`, seguido de:

```$ deactivate```

Para volver a activarlo, desde el directorio base del proyecto ejecute:

```
$ source env/bin/activate
$ python manage.py runserver
```

### Funcionamiento del servidor

El cliente descarga desde nuestro servidor toda la parte estática del proyceto (HTML, CSS, JavaScript, etc.), en la cual, además de la interfaz de usuario, se incluye el modelo de predicción, que se ejecuta exclusivamente de forma local, mediante las librerías `p5.js`y `ml5.js`.

Dado que no podemos interactuar con la interfaz I2C de la Raspberry Pi directamente desde JavaScript, cada 1000 milisegundos se hará una solicitud al servidor, que enviará la temperatura corporal al cliente en formato JSON, el cual será decodificado y mostrado al usuario.

Se han propuesto varias alternativas a esto, como la de enviar el dato de la temperatura mediante sockets, pero dada la naturaleza del framework Django, desarrollar un sistema asíncrono como este sería una tarea muy difícil.

En adición a esto, también se ha meditado la opción de convertir el proyecto en una aplicación nativa basada en Chromium, utilizando el framework Electron.js. No obstante, ante la dificultad de interactuar con al interfaz I2C de la Raspberry Pi para obtener los datos recogidos por la MLX90641 con Node.js, esta opción ha sido descartada por el momento.
