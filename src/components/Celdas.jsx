import { useState, useEffect } from 'react';
import Selector from './Selector';

const Celdas = ({ tablero, progresoInicial, onNivelCompletado   }) => {
    const numColumnas = tablero.tablero.length;
    const letrasArray = tablero.letras;
    const palabras = tablero.palabras;
    const coordenadas = tablero.palabras_coordenadas;
    const [palabrasProgreso, setPalabrasProgreso] = useState([]);
    const [progreso, setProgreso] = useState(progresoInicial || []);
    const [keysSeleccionadas, setKeySeleccionadas] = useState([]);
    const [letrasSeleccionadas, setLetrasSeleccionadas] = useState([]);
    const [wordIsFound, setWordIsFound] = useState(true);

    useEffect(() => {
        if (palabrasProgreso.length > 0) {
          let completed = checkLevelProgress();
          if(completed){
            console.log('¡Nivel completado!')
            setTimeout(() => {
                setLetrasSeleccionadas([]);
                setKeySeleccionadas([]);
                setProgreso([]);
                onNivelCompletado(); 
            }, 1000)
          }
        }
      }, [palabrasProgreso]);

    const handleLetrasSeleccionadas = (letras) => {
        setLetrasSeleccionadas(letras);
        checkIfIsCorrect(letras);
    };

    const checkIfIsCorrect = (letras) => {
        const palabra = letras.join('');
        if(palabras.includes(palabra)){   
            coordenadas.forEach(e => {
                if(e.palabra === palabra){
                    const nuevoProgreso = [...progreso];
                    e.coordenadas.forEach(coord => {
                        nuevoProgreso.push({
                            fila: coord.fila,
                            celda: coord.celda,
                            letra: coord.letra
                        });
                    });
                    
                    setProgreso(nuevoProgreso);
                    const nuevoProgresoPalabras = [...palabrasProgreso];
                    nuevoProgresoPalabras.push(palabra);
                    setPalabrasProgreso(nuevoProgresoPalabras);
                    setWordIsFound(true)
                }
            });
            //TO DO  Guardar progreso del usuario
        }else{
            setWordIsFound(false);
        
            setTimeout(() => {
                setWordIsFound(true);
            }, 1000);
        }
    }

    const checkLevelProgress = () => {
        let isCompleted = palabras.every(function (e) {
            return palabrasProgreso.includes(e);
        })
        return isCompleted
    }

    return (
        <section className='m-auto w-5/6 h-5/6 flex justify-around content-center font-press-start'>
            <div className="grid justify-center gap-4 center" style={{ gridTemplateColumns: `repeat(${numColumnas}, minmax(0, 1fr))` }}>
                {tablero.tablero.map((fila, i) => (
                    fila.map((celda, j) => {
                        const progresoCelda = progreso.find(p => p.fila === i && p.celda === j);
                        const contenidoCelda = progresoCelda ? celda.letra : '';
                        return (
                            <div id={`${celda.fila}-${celda.celda}`} key={`${celda.fila}-${celda.celda}`} className={`${celda.letra ? 'border-double border-8  p-2 h-20 w-20 text-white font-bold flex justify-center items-center text-3xl' : 'h-20 w-20 border-none'}`}>
                                {contenidoCelda || ' ' }
                            </div>
                        );
                    })
                ))}
            </div>
        
            <Selector 
                    letras={letrasArray}
                    keysSeleccionadas={keysSeleccionadas}
                    setKeySeleccionadas={setKeySeleccionadas}
                    letrasSeleccionadas={letrasSeleccionadas} 
                    setSeleccionadas={setLetrasSeleccionadas}
                    onLetrasSeleccionadas={handleLetrasSeleccionadas}
                    palabrasProgreso={palabrasProgreso}
                    wordIsFound={wordIsFound}
            />

        </section>
    );
};

export default Celdas;
