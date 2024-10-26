import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useTablero from '../hooks/useTablero.jsx';
import Celdas from './Celdas';

const Tablero = () => {
    const { nivel: nivelInicial } = useParams();
    const [nivel, setNivel] = useState(parseInt(nivelInicial)); 
    const userId = 1; // TO DO CARGAR USER ID
    const { tablero, progreso, loading  } = useTablero(nivel, userId);
    
    const manejarCompletadoNivel = () => {
        setNivel((prevNivel) => prevNivel + 1);
    };

    if (loading) {
        return <div className='w-max h-max text-3xl m-auto shadow-standard-shadow text-transparent bg-clip-text bg-gradient-to-b from-white to-yellow-500'>Cargando...</div>;
    }

    if (!tablero || !progreso) {
        return <div className='w-max h-max text-3xl m-auto shadow-standard-shadow text-transparent bg-clip-text bg-gradient-to-b from-white to-yellow-500'>Error al cargar los datos del nivel o progreso</div>;
    }

    return (
        <section className='w-full h-full content-center bg-orange-500'>
            <Celdas tablero={tablero} progreso={progreso} onNivelCompletado={manejarCompletadoNivel}  />
        </section>
    );
};

export default Tablero;
