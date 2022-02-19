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
const visualUsuario = Array(solucoin.length).fill('_');
let intentos = 6;
let letrasIntroducidas = [];




/**
 * funciones
 */

/**
 * renderiza el estado de la palabra a adivinar
 * @param {string} solucionLocal palabra a adivinar
 * @param {Array} letrasUsuario letras introducidas por el usuario
 * @param {HTMLElement} targetAdivinadas lugar donde se mostrara el estado de la adivinacion
 * @param {string}vacio caracter de letra aun no adivinada
 * @param {string}separador separador entre los caracteres mostrados
 */
function render(solucionLocal,letrasUsuario,targetAdivinadas,vacio='_',separador=" "){
    //letra y guiones
    const finalHTML = solucionLocal.split('').map(function (letra){
        return letrasUsuario.includes(letra)
            ? letra
            : vacio;
    });
    //imprimimos
    targetAdivinadas.textContent= finalHTML.join(separador);
}

/**
 * anyade la letra del usuario
 * @param event
 */
function anyadirLetra(){
    //ercogemos la letra
    const miNuevaLetra = nuevaLetra.value.toLowerCase();
    //la guardamos
    letrasIntroducidas.push(miNuevaLetra);
    //limpiamos la letra introducida
    nuevaLetra.value = '';
    //renderizamos
    render(solucoin,letrasIntroducidas,visualJugador);

}


/**
 * eventos
 */

nuevaLetra.addEventListener('keyup',function (event){
    if(event.key==="Enter"){
        anyadirLetra();
        render(solucoin,letrasIntroducidas,visualJugador);
    }
})

/**
 * inicio
 */

render(solucoin,letrasIntroducidas,visualJugador);