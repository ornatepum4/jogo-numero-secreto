let listaNumeroSorteados = []; 
let numeroLimite = 10;
// criada uma variável e atribuido á ela a função do Math.random
let numeroChupeta = gerarNumeroAleatorio();
console.log(numeroChupeta);
// criada variável e atribuido o numero de erros do jogo
let chupetadas = 1;

// criada uma função para exibir texto na tela
function exibirTextoNaTela(tag, texto) {
    // variável dentro da função que seleciona o parágrafo a ser modificado
    let campo = document.querySelector(tag);
    // comando para modificar o conteúdo do paragrafo selecionado
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.3});
}

exibirMensagemInicial();

//chamada a função, introduzido o valor do prágrafo desejado e modificado o conteúdo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo da chupeta');
    exibirTextoNaTela('p', 'Escolha uma chupeta entre 1 e 10');
}


// função que atribui valor ao click no input 'chutar' 
function verificarChute() {
    // variável que seleciona, neste caso ao invés do parágrafo, o valor escrito pelo usuário
    let chute = document.querySelector('input').value;
    // função de comparação
    if(chute == numeroChupeta){
        exibirTextoNaTela('h1', 'Parabéns chupetinha');
        // variável que compara, com abreviação da função 'if/else'
        let palavraChupetada = chupetadas > 1 ? 'Chupetadas' : 'Chupetada';
        // variável criada para receber o valor de template string, pois a função não indentifica 
        let mensagemChupetadas = `Voce chupetou com ${chupetadas} ${palavraChupetada}`;
        // atribuida á função a string com o valor da variável
        exibirTextoNaTela('p', mensagemChupetadas);
        // função que busca um código e remove o valor atribuido a ela
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if( chute > numeroChupeta){
            exibirTextoNaTela('p', 'A Chupeta é menor');
        } else {
            exibirTextoNaTela('p', 'A Chupeta é maior');
        }
        // variável que soma o número de tentativas até que o valor do chute iguale ao valor real
        chupetadas++;
        limparCampo();
    };
};

function gerarNumeroAleatorio() {
  // essa variável vai incluir o numero sorteado na lista  
  let numeroEscolhido = parseInt(Math.random() * numeroLimite);
  let quantidadeDeElementosNaLista = listaNumeroSorteados.length;

  if(quantidadeDeElementosNaLista == numeroLimite){
    listaNumeroSorteados = [];
  };
    // esse 'if' usa a função '.includes' para verificar se o numero
    // sorteado já está na lista, para não sortea-lo novamente
    if(listaNumeroSorteados.includes(numeroEscolhido)){
      // 'if' o numero ja estiver na lista este'return' chama novamente 
      // a função de gerar numero aleatório
      return gerarNumeroAleatorio();
    } else{
      //'push' vai inserir o novo numero sorteado na lista 
      listaNumeroSorteados.push(numeroEscolhido);
      console.log(listaNumeroSorteados);
      // se o numero não estiver na lista (ainda não foi sorteado) então mostra-lo no console
      return numeroEscolhido;
    }
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroChupeta = gerarNumeroAleatorio();
    limparCampo();
    chupetadas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}