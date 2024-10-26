import { useState } from 'react';

const Selector = ({ letras, keysSeleccionadas, setKeySeleccionadas, letrasSeleccionadas, setSeleccionadas, onLetrasSeleccionadas, wordIsFound }) => {

    
    const [isSelecting, setIsSelecting] = useState(false);

    const handleMouseDown = (key, letra) => {
        if(letra !== ''){
            setKeySeleccionadas([key]);
            setSeleccionadas([letra]);
        }
        setIsSelecting(true);
    };

    const handleMouseEnter = (key, letra) => {
        if (isSelecting && !keysSeleccionadas.includes(key)) {
            setKeySeleccionadas((prev) => [...prev, key]);
            setSeleccionadas((prev) => [...prev, letra]);
        }
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
        onLetrasSeleccionadas(letrasSeleccionadas);
        setKeySeleccionadas([])
        setSeleccionadas([])
    };
    
    return (
        <div 
            className="grid grid-cols-5 grid-rows-4 gap-4 justify-center items-center w-96 h-auto select-none"
            onMouseUp={handleMouseUp}
        >
            {letras.map((letra, i) => {
                let gridPosition;
                
                switch (i) {
                    case 0:
                        gridPosition = "col-start-3 row-start-1";
                        break;
                    case 1:
                        gridPosition = `col-start-1 row-start-2`;
                        break;
                    case 2:
                        gridPosition = `col-start-5 row-start-2`;
                        break;
                    case 3:
                        gridPosition = "col-start-1 row-start-3";
                        break;
                    case 4:
                        gridPosition = "col-start-5 row-start-3";
                        break;
                    case 5:
                        gridPosition = "col-start-3 row-start-4";
                        break;
                    default:
                        gridPosition = "";
                }

                return (
                    <div 
                        key={i} 
                        onMouseDown={() => handleMouseDown(i, letra)}
                        onMouseEnter={() => handleMouseEnter(i, letra)}
                        className={`flex justify-center items-center w-20 h-20 text-white text-2xl ${gridPosition}
                            ${!wordIsFound ? 'shake' : ''}
                            ${keysSeleccionadas.includes(i) ? 'bg-orange-200' : 'bg-gradient-to-b from-yellow-200 to-yellow-500'}`}
                    >
                        {letra}
                    </div>
                );
            })}
        </div>
    );
};

export default Selector;
