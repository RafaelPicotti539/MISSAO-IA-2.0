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
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    
    perguntaAtual = perguntas[atual];
    
    // Substitui "você" dinamicamente para exibição, preservando o array original
    caixaPerguntas.textContent = perguntaAtual.enunciado.replace(/você/gi, nomeAtual);
    caixaAlternativas.textContent = '';
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativa = document.createElement('button');
        botaoAlternativa.textContent = alternativa.texto;
        botaoAlternativa.addEventListener('click', () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativa);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacao = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacao + ' ';

    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
    } else {
    atual++;
    }

    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = `Em 2049, ${nomeAtual}`;
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = '';
    
    caixaPerguntas.classList.remove('mostrar');
    caixaAlternativas.classList.remove('mostrar');
    caixaResultado.classList.add('mostrar');
}