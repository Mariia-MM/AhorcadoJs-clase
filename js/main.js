/**
 * Variables
 */
const listadoPosiblesSoluciones = ['lampara','bondad','capitalismo','pizzara','monitor'];
const solucoin = listadoPosiblesSoluciones[Math.floor(Math.random()*listadoPosiblesSoluciones.length)];
const visualJugador = document.querySelector('#visual-jugador');
const nuevaLetra = document.querySelector('#nueva-letra');
const letrasJugador = document.querySelector('#letras-jugador');
const mensajeGanado = document.querySelector('#mensaje-ganado');
const mensajePerdido = document.querySelector('#mensaje-perdido');
const numeroIntentos = document.querySelector('#numero-intentos');
const visualUsuario = Array(solucoin.length).fill('_');
let intentos = 6;
let letrasIntroducidas = [];




/**
 * funciones
 */

/**
 * genera,a partir de solucion el string que vera el usuario:
 * ejemplo _a__ra
 * @param {string} solucionLocal solucion a adivinar
 * @param {Array} letrasUsuarioLocal listado de letras introducidas por el usuario
 * @param {string} vacio caracter de letra aun no adivinada
 * @return {Array}
 */
function generarEnigmaConGuiones(solucionLocal,letrasUsuarioLocal,vacio){
  return  solucionLocal.split('').map(function (letra) {
        return letrasUsuarioLocal.includes(letra)
            ? letra
            : vacio;
    })
}

/**
 * renderiza el estado de la palabra a adivinar
 * @param {string} solucionLocal palabra a adivinar
 * @param {Array} letrasUsuario letras introducidas por el usuario
 * @param {HTMLElement} targetAdivinadas lugar donde se mostrara el estado de la adivinacion
 * @param {number} numeroIntentosLocal numero de intentos restantes.
 * @param {HTMLElement} targetNumeroIntentos Lugar donde se monstraran los numeros de intentos restantes.
  * @param {HTMLElement} targetLetrasJugador lugar donde se mostraran letras introducidas por el usuario.
 * @param {string}vacio caracter de letra aun no adivinada
 * @param {string}separador separador entre los caracteres mostrados
 */
function render(
    solucionLocal,
    letrasUsuario,
    targetAdivinadas,
    numeroIntentosLocal,
    targetNumeroIntentos,
    targetLetrasJugador,
    vacio='_',
    separador=" "){
    //letra y guiones
    const finalHTML = generarEnigmaConGuiones(solucionLocal,letrasUsuario,vacio);
    //numero de intentos
    targetNumeroIntentos.textContent = numeroIntentosLocal;
    //letras introducidas por el usuario
    targetLetrasJugador.textContent = letrasIntroducidas.join(separador);
    //imprimimos
    targetAdivinadas.textContent = finalHTML.join(separador);
}

/**
 * anyade la letra del usuario
 * @return {string}
 */
function anyadirLetra(){
    //escogemos la letra
    const miNuevaLetra = nuevaLetra.value.toLowerCase();
    //la guardamos
    letrasIntroducidas.push(miNuevaLetra);
    //limpiamos la letra introducida
    nuevaLetra.value = '';

    return miNuevaLetra;

}

/**
 * Comprobar si una palabra contiene un caracter.
 *
 * @param {string} palabra a comprobar.
 * @param {string} caracter que buscamos.
 * @return {boolean} Resultado si la palabra contiene o no el caracter.
 */
function inclueCaracter  (palabra, caracter) {
    return palabra.toUpperCase().includes(caracter.toUpperCase());
}

/**
 * Restar intentos
 *
 * @param {number} intentos Los intentos que tiene el usuario.
 * @param {number} puntosARestar que vamos a restar, valor por defecto = 1.
 * @return {number} El resultado de la resta.
 */
function restarPuntos(intentos, puntosARestar = 1) {
    return intentos > 0 ? intentos - puntosARestar : 0;
}


/**
 * Comprueba si ha fallado el usuario y resta los intentos
 *
 * @param { string} solucion
 * @param {string} letraLocal Nueva letra, introdusida por el usuario
 * @return {number}
 */
function comprobarLetraAcertada(solucion,letraLocal){
    if(!inclueCaracter(solucion,letraLocal)){
        //ha fallado
        intentos = restarPuntos(intentos);
    }
    return intentos;
}


/**
 * informa al usuario si ha ganado o ha perdido. Bloquea el input en cualquier caso
 * @param {string} solucoin
 * @param {Array} letrasIntroducidas
 * @param {number} intentos
 * @param {HTMLElement} mensajeGanado
 * @param {HTMLElement} mensajePerdido
 * @param {HTMLElement} nuevaLetra input donde el usuario indica la nueva letra
 * @param {string} claseMostrar clsae que anyadiremos a "mensajeGanado" o "mensajePerdido"
 */
function informarGameOver(solucoin,letrasIntroducidas,intentos,mensajeGanado,mensajePerdido,nuevaLetra,claseMostrar="mensaje--show"){
    //ha perdido
    if (intentos === 0){
        mensajePerdido.classList.add(claseMostrar);
        nuevaLetra.setAttribute('disabled',true);
    }
    //ha ganado
    const visualUsuario = generarEnigmaConGuiones(solucoin,letrasIntroducidas,'').join('');
    if (solucoin === visualUsuario){
        mensajeGanado.classList.add(claseMostrar);
        nuevaLetra.setAttribute('disabled',true);
    }


}

/**
 * eventos
 */

nuevaLetra.addEventListener('keyup',function (event){
    if(event.key==="Enter"){
        const nuevaLetraIntroducida = anyadirLetra();
        comprobarLetraAcertada(solucoin,nuevaLetraIntroducida);
        informarGameOver(solucoin,letrasIntroducidas,intentos,mensajeGanado,mensajePerdido,nuevaLetra);
        render(solucoin,letrasIntroducidas,visualJugador,intentos,numeroIntentos,letrasJugador);
    }
})



/**
 * inicio
 */

render(solucoin,letrasIntroducidas,visualJugador,intentos,numeroIntentos,letrasJugador);