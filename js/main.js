/**
 * Variables
 */
const listadoPosiblesSoluciones = ['lampara','bondad','capitalismo','pizzara','monitor'];
const solucoin = listadoPosiblesSoluciones[Math.floor(Math.random()*listadoPosiblesSoluciones.length)];
const visualJugador = document.querySelector('#visual-jugador');
const nuevaLetra = document.querySelector('#nueva-letra');
const letrasJugador = document.querySelector('#letras-jugador');
let visualUsuario = Array(solucoin.length).fill('_');
let intentos = 6;
let letrasIntroducidas = [];




/**
 * funciones
 */

/**
 * eventos
 */

/**
 * inicio
 */