import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

const caixaPrincipal = document.querySelector('.caixa-principal');
const caixaPerguntas = document.querySelector('.caixa-perguntas');
const caixaAlternativas = document.querySelector('.caixa-alternativas');
const caixaResultado = document.querySelector('.caixa-resultado');
const textoResultado = document.querySelector('.texto-resultado');
const botaoJogarNovamente = document.querySelector('.novamente-btn');
const botaoIniciar = document.querySelector('.iniciar-btn');
const telaInicial = document.querySelector('.tela-inicial');

let atual = 0;
let perguntaAtual;
let historiaFinal = '';

botaoIniciar.addEventListener('click', iniciaJogo);
botaoJogarNovamente.addEventListener('click', iniciaJogo);

function iniciaJogo() {
    atual = 0;
    historiaFinal = '';
    
    // Esconde a tela inicial e o resultado
    if (telaInicial) telaInicial.style.display = 'none';
    caixaResultado.classList.remove('mostrar');
    
    // Exibe a estrutura do quiz
    caixaPerguntas.classList.add('mostrar');
    caixaAlternativas.classList.add('mostrar');
    
    substituiNome();
    mostraPergunta();
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
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

    // Se houver um salto específico indicado em "proxima", usa ele; caso contrário, avança 1 posição
    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
    } else {
        atual++;
    }

    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = `Em 2049, ${nome}`;
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = '';
    
    caixaPerguntas.classList.remove('mostrar');
    caixaAlternativas.classList.remove('mostrar');
    caixaResultado.classList.add('mostrar');
}

function substituiNome() {
    for (const pergunta of perguntas) {
        // Substitui "você" e "Você" mantendo o texto original atualizado
        pergunta.enunciado = pergunta.enunciado.replace(/você/gi, nome);
    }
}