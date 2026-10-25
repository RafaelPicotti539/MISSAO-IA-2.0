import {aleatorio} from './aleatorio.js';
import {perguntas} from './perguntas.js';

const caixaPrincipal = document.querySelector('.caixa-principal');
const caixaPerguntas = document.querySelector('.caixa-perguntas');
const caixaAlternativas = document.querySelector('.caixa-alternativas');
const caixaResultado = document.querySelector('.caixa-resultado');
const textoResultado = document.querySelector('.texto-resultado');
const botaoJogarNovamente = document.querySelector('.novamente-btn');

let atual = 0;
let perguntaAtual;
let historiaFinal = '';

function mostraPergunta() {
    if(atual >= perguntas.length){
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = '';
    mostraAlternativas();
}


function mostraAlternativas(){
    for(const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativa = document.createElement('button');
        botaoAlternativa.textContent = alternativa.texto;
        botaoAlternativa.addEventListener('click', () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativa);
    }
}

function respostaSelecionada(opcaoSelecionada){
    const afirmacao = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacao + ' ';
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = 'Em 2049...';
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = '';
    caixaResultado.classList.add('mostrar');
    botaoJogarNovamente.addEventListener('click', jogaNovamente);
}

function jogaNovamente(){
    atual = 0;
    historiaFinal = "";
    caixaResultado.classList.remove('mostrar');
    mostraPergunta();
}

mostraPergunta();