const nomes = [
    'Geovana', 
    'Maria Pedro', 
    'Naídia', 
    'Sônia', 
    'Silvanete', 
    'Sérgio', 
    'Eliana', 
    'Nildo'
];

export function aleatorio(lista) {
    const posicao = Math.floor(Math.random() * lista.length);
    return lista[posicao];
}

export function sortearNome() {
    return aleatorio(nomes);
}