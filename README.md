# WondersOfWords

**WondersOfWords** es un juego de palabras interactivo donde los jugadores forman palabras en un tablero de letras. 

## 🎮 Características Principales

- **Creación de niveles dinámica y aleatoria**: El despliegue del juego utiliza una serie de funciones las cuales generan los tableros aleatoriamente.
- **Selector de Letras Dinámico**: Permite seleccionar letras haciendo clic y arrastrando para formar palabras en el orden correcto.
- **Progreso de Usuario**: Guarda el progreso del usuario, permitiéndole retomar el juego donde lo dejó (En desarrollo 😊).
- **Niveles de Dificultad**: Contiene niveles con palabras y desafíos de diferente dificultad.
- **Efectos Visuales**: Incluye efectos de animación al verificar palabras correctas o incorrectas, mejorando la experiencia de juego.

## 📸 Capturas de Pantalla

![Demostración del juego](./gif.gif)

🛠 Tecnologías Utilizadas

    Frontend: React, CSS (Tailwind CSS), Hooks personalizados para la lógica de selección y verificación de palabras.
    Backend: Node.js para gestión de progresos y API de palabras.
    Persistencia de Datos: MySQL con el uso de Sequelize para almacenar progreso de usuarios y niveles de juego.


## 🚀 Instalación y Ejecución

1. Clona el repositorio:

   git clone https://github.com/usuario/WondersOfWords.git

2. Ajusta las variables y rutas necesarias:

   Configura las variables de entorno en el archivo .env

   Ajusta la ruta del proxy hacia el puerto de tu servidor en el archivo vite.config.js

2. Instala las dependencias:

    cd WondersOfWords

    npm install

    npx sequelize-cli db:migrate --config config/config.cjs

    Inicia el proyecto

    npm start para arrancar el servidor (Node.js)

    npm run dev para arrancar el entorno del cliente (vite)

    Accede al juego en la url proporcionada por vite

📂 Estructura del Proyecto

```plaintext

WondersOfWords/
│
├── config/
│   └ config.cjs                # Configuración para la creación de la base de datos
│
├── migrations/                 # Directorio necesario para la generación de las migraciones de base de datos
│
├── src/
│   ├── components/
│   │   ├── Tablero.jsx         # Componente principal del tablero
│   │   ├── Selector.jsx        # Componente para seleccionar letras
│   │   ├── Menu.jsx            # Componente para inicializar la pantalla principal
│   │   └── Celdas.jsx          # Lógica de celdas individuales y verificación
│   ├── hooks/
│   │   └── useMenu.js          # Hook personalizado para cargar el progreso del usuario
│   │   └── useTablero.js       # Hook personalizado para cargar datos del tablero y progreso
│   ├── App.jsx                 # Punto de entrada principal
│   ├── index.css               # Archivo con estilos personalizados
│   └── output.css              # Archivo output de Tailwind
│
├── server/
│   ├── config/
│   │   └──database.js          # Configuración para la conexión a la base de datos
│   ├── models/                
│   │   ├── Niveles.js          # Modelo con la configuración de cada nivel
│   │   ├── Users_Cookies.js    # Modelo con la sesión del usuario
│   │   ├── Users_Progress.js   # Modelo con el progreso del usuario
│   │   └── Users.js            # Modelo con la información del usuario
│   ├── routes/                  
│   │   ├── crearNiveles.js     # End point para crear un nuevo nivel
│   │   ├── loadLevel.js        # End point para la carga del nivel
│   │   ├── loadMenu.js         # End point para la carga del menú
│   │   └── loadUserProgress.js # End point para la carga del progreso del usuario
│   ├── utils/
│   │   ├── crearNiveles.js     # Función para la creación dinámica y aleatoria del tablero
│   │   └── palabras.js         # Biblioteca de palabras para la creación de niveles
│   │
│   └ server.js                 # Configuración del servidor (despligue del proyecto, rutas y conexión a la base de datos)
│
├── .env                        # Configuración de las variables de entorno
│
└── README.md                   # Documentación del proyecto

💡 Contribución

Si deseas contribuir:

    Haz un fork del proyecto
    Crea una nueva rama para tu funcionalidad (git checkout -b feature/nueva-funcionalidad)
    Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad')
    Haz push a tu rama (git push origin feature/nueva-funcionalidad)
    Crea un pull request en GitHub

👨‍💻 Autor

Duncan - duncan.guijo.fernandez@gmail.com
