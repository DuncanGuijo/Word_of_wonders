import palabras from './palabras.js';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const baseUrl = process.env.API_BASE_URL;
const port = process.env.PORT;

let arrays = [];
const crearNiveles = () => {
  for(let i = 0; i < palabras.length; i++){
    arrays = []; 
    let nivel = i + 1;
    let palabrasOriginales = palabras[i];
    let palabrasDisponibles = [...palabrasOriginales];
    let palabrasUsadas = [];
    let palabrasCoordenadas = [];
    let palabraMasLarga = palabrasOriginales.reduce((a, b) => a.length > b.length ? a : b);

    const tamañoTablero = palabraMasLarga.length;

    for (let j = 0; j < tamañoTablero; j++) { 
      arrays[j] = new Array(tamañoTablero).fill('');
    }

    let randomArray = Math.floor(Math.random() * arrays.length);
    let randomKey = Math.floor(Math.random() * arrays[randomArray].length);
    let sentido = randomKey !== 0 ? 'y' : 'x';
    
    montarPrimeraPalabra(palabraMasLarga, sentido, randomArray, randomKey, palabrasUsadas, palabrasCoordenadas);

    palabrasDisponibles = palabrasDisponibles.filter(palabras => palabras !== palabraMasLarga);

    for (let k = 0; k < palabrasDisponibles.length; k++) {
      let palabra = palabrasDisponibles[k];
      montarPalabras(palabra, palabrasUsadas, palabrasCoordenadas)
    }

    for(let x = 0; x < arrays.length; x++){
      for(let y = 0; y < arrays[x].length; y++){
        arrays[x][y] = {
          letra : arrays[x][y],
          fila: x,
          celda: y
        }
      }
    }

    guardarNivel(arrays, nivel, palabrasCoordenadas, palabrasUsadas);
  }
};

const guardarNivel = async (arrays, nivel, palabrasCoordenadas, palabrasUsadas) => {
  try {
    const letrasArray = [];
    const conteoLetrasArray = {};

    const actualizarConteoLetras = (letra) => {
      conteoLetrasArray[letra] = (conteoLetrasArray[letra] || 0) + 1;
    }

    for (let i = 0; i < palabrasUsadas.length; i++) {
      const palabra = palabrasUsadas[i];
      
      const conteoLetrasPalabra = {};
      
      for (let j = 0; j < palabra.length; j++) {
        const letra = palabra[j];
        conteoLetrasPalabra[letra] = (conteoLetrasPalabra[letra] || 0) + 1;
      }
      
      for (let letra in conteoLetrasPalabra) {
        const cantidadNecesaria = conteoLetrasPalabra[letra];
        const cantidadActual = conteoLetrasArray[letra] || 0;

        if (cantidadNecesaria > cantidadActual) {
          const faltantes = cantidadNecesaria - cantidadActual;
          for (let k = 0; k < faltantes; k++) {
            letrasArray.push(letra);
            actualizarConteoLetras(letra);
          }
        }
      }
    }

    const palabrasCoordenadasArray = Object.entries(palabrasCoordenadas).map(([palabra, coordenadas]) => ({
      palabra,
      coordenadas
    }));
    
    

    await axios.post(`${baseUrl}:${port}/niveles`, {
      nivel: nivel,
      tablero: arrays,
      letras: letrasArray,
      total_palabras: palabrasUsadas.length,
      palabras: palabrasUsadas,
      palabras_coordenadas: palabrasCoordenadasArray
    });

    console.log(`Nivel ${nivel} guardado con éxito`);
  } catch (error) {
    console.error(`Error al guardar el nivel ${nivel}:`, error);
  }
};

const montarPrimeraPalabra = (palabra, sentido, fila, celda, palabrasUsadas, palabrasCoordenadas) => {
  let coordenadas = [];
  let eje = '';
  if (sentido === 'x') {
    for (let i = 0; i < palabra.length; i++) {
      arrays[fila][i] = palabra[i];
      coordenadas.push({ fila: fila, celda: i, letra: palabra[i] });
    }
    eje =  'x';
  } else {
    for (let i = 0; i < palabra.length; i++) {
      arrays[i][celda] = palabra[i];
      coordenadas.push({ fila: i, celda: celda, letra: palabra[i] });
    }
    eje = 'y';
  }
  palabrasCoordenadas[palabra] = coordenadas;
  palabrasUsadas.push(palabra)
  return eje;
};

const montarPalabras = (palabra, palabrasUsadas, palabrasCoordenadas) => {
  return buscarCeldaColision(palabra, palabrasUsadas, palabrasCoordenadas);
};

const buscarCeldaColision = (palabra, palabrasUsadas, palabrasCoordenadas) => {
  let montada = false;

  for (let i = 0; i < palabra.length && !montada; i++) {
    for (let fila = 0; fila < arrays.length && !montada; fila++) {
      for (let celda = 0; celda < arrays[fila].length && !montada; celda++) {
        if (arrays[fila][celda] === palabra[i]) { 
          if (comprobarEje(fila, celda, palabra[i], palabra.length, palabra, i, palabrasUsadas, palabrasCoordenadas)) {
            montada = true;
            break;
          }      
        }
      }
    }
  }
  return montada;
};

const comprobarEje = (fila, celda, letra, tamañoPalabra, palabra, posicionLetra, palabrasUsadas, palabrasCoordenadas) => {
  let partes = [palabra.slice(0, posicionLetra), palabra.slice(posicionLetra + 1)];
  let tamañoPreLetra = partes[0].length;
  let tamañoPostLetra = partes[1].length;

  let x = comprobarEjeX(tamañoPreLetra, tamañoPostLetra, fila, celda, palabra, letra);
  let y = comprobarEjeY(tamañoPreLetra, tamañoPostLetra, fila, celda, palabra, letra);
 
  if (x) {
    colocarPalabraX(palabra, fila, celda, tamañoPreLetra, palabrasUsadas, palabrasCoordenadas);
    return true;
  } else if (y) { 
    colocarPalabraY(palabra, fila, celda, tamañoPreLetra, palabrasUsadas, palabrasCoordenadas);
    return true; 
  }

  return false; 
};

const comprobarEjeX = (tamañoPreLetra, tamañoPostLetra, fila, celda) => {
  let x = true;

  if(arrays[fila][celda + tamañoPostLetra +1] !== undefined){ 
    if(arrays[fila][celda + tamañoPostLetra + 1] !== ''){
      x = false;
    }
  } 
  if(arrays[fila][celda - tamañoPreLetra] !== undefined){
    if(arrays[fila][celda - tamañoPreLetra ] !== ''){
      x = false;
    }
  }

  for (let i = tamañoPreLetra; i > 0; i--) {
    if (arrays[fila][celda - i] === undefined || arrays[fila][celda - i] !== '') {
      x = false;
      break;
    }
    if ((arrays[fila - 1] && arrays[fila - 1][celda - i] !== '' && arrays[fila - 1][celda - i] !== undefined) ||
        (arrays[fila + 1] && arrays[fila + 1][celda - i] !== '' && arrays[fila + 1][celda - i] !== undefined)) {
      x = false;
    }
  }

  for (let i = 1; i <= tamañoPostLetra; i++) {
    if (arrays[fila][celda + i] === undefined || arrays[fila][celda + i] !== '') {
      x = false;
      break;
    }
    if ((arrays[fila - 1] && arrays[fila - 1][celda + i] !== '' && arrays[fila - 1][celda + i] !== undefined) ||
        (arrays[fila + 1] && arrays[fila + 1][celda + i] !== '' && arrays[fila + 1][celda + i] !== undefined)) {
      x = false;
    }
  }

  return x;
};

const comprobarEjeY = (tamañoPreLetra, tamañoPostLetra, fila, celda) => {
  let y = true;

  const celdaPrev = arrays[fila - tamañoPreLetra];
  if(tamañoPreLetra !== 0){
    if (celdaPrev !== undefined) {
      if (celdaPrev[celda] !== '' && celdaPrev[celda] !== undefined) { 
          y = false;
      }
    }
  }
  

  if(arrays[fila + tamañoPostLetra + 1] !== undefined){
    if(arrays[fila + tamañoPostLetra + 1] !== ''){
      y = false;
    }
  }
 
  for (let i = tamañoPreLetra; i > 0; i--) {
    if (arrays[fila - i] === undefined || arrays[fila - i][celda] !== '') {
      y = false;
      break;
    }
    if ((arrays[fila - i][celda - 1] && arrays[fila - i][celda - 1] !== '' && arrays[fila - i][celda - 1] !== undefined) ||
        (arrays[fila - i][celda + 1] && arrays[fila - i][celda + 1] !== '' && arrays[fila - i][celda + 1] !== undefined)) {
      y = false;
    }
  }

  for (let i = 1; i <= tamañoPostLetra; i++) {  
    if (arrays[fila + i] === undefined || arrays[fila + i][celda] !== '') {
      y = false;
      break;
    }
    if ((arrays[fila + i][celda - 1] && arrays[fila + i][celda - 1] !== '' && arrays[fila + i][celda - 1] !== undefined) ||
        (arrays[fila + i][celda + 1] && arrays[fila + i][celda + 1] !== '' && arrays[fila + i][celda + 1] !== undefined)) {
      y = false;
    }
  }

  return y;
};

const colocarPalabraX = (palabra, fila, celda, tamañoPreLetra, palabrasUsadas, palabrasCoordenadas) => {
  let coordenadas = [];
  for (let i = 0; i < palabra.length; i++) {
    arrays[fila][celda - tamañoPreLetra + i] = palabra[i];
    coordenadas.push({ fila: fila, celda: celda - tamañoPreLetra + i, letra: palabra[i]  });
  }

  palabrasUsadas.push(palabra);
  palabrasCoordenadas[palabra] = coordenadas;

};

const colocarPalabraY = (palabra, fila, celda, tamañoPreLetra, palabrasUsadas, palabrasCoordenadas) => {
  let coordenadas = [];

  for (let i = 0; i < palabra.length; i++) {
    arrays[fila - tamañoPreLetra + i][celda] = palabra[i]; 
    coordenadas.push({ fila: fila- tamañoPreLetra + i, celda: celda, letra: palabra[i] });
  }

  palabrasUsadas.push(palabra);
  palabrasCoordenadas[palabra] = coordenadas;


};

export default crearNiveles;