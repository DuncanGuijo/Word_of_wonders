import { useState, useEffect } from 'react';
import axios from 'axios';

const useTablero = (nivel, userId) => {
    const [tablero, setTablero] = useState(null);
    const [progreso, setProgreso] = useState(null);
    const [loading, setLoading] = useState(true);
        
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const resTablero = await axios.get(`/api/nivel?nivel=${nivel}`);
                setTablero(resTablero.data.Nivel);

                const resProgreso = await axios.get(`/api/userprogress?userId=${userId}&nivel=${nivel}`);
                setProgreso(resProgreso.data);

                setLoading(false);
            } catch (error) {
                console.error('Error al cargar los datos del nivel o progreso:', error);
                setLoading(false);
            }
        };

        if (nivel && userId) {
            cargarDatos();
        }
    }, [nivel, userId]);

    const actualizarProgreso = (nuevoProgreso) => {
        setProgreso(nuevoProgreso);
    };

    return { tablero, progreso, loading, actualizarProgreso };
};

export default useTablero;
