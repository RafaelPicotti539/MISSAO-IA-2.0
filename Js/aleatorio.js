export function aleatorio (Lista){
    const posicao = Math.floor(Math.random()* Lista.length);
    return Lista[posicao];
}