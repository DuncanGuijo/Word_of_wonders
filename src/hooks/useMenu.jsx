import { useState } from 'react';
import axios from 'axios';

const useMenu = () => {
  const [nivel, setNivel] = useState("");
  const [userId, setUserId] = useState(1);

  const cargarMenu = () => {
      axios.get(`/api/menu?userId=${userId}`)
          .then(response => {
              setNivel(response.data.Nivel);
          })
          .catch(error => {
              console.error('Error al obtener los niveles:', error);
          });
  };

  // TO DO CARGAR PROGRESO USUARIO
  
  return { nivel, userId, cargarMenu, setUserId };
};

export default useMenu;