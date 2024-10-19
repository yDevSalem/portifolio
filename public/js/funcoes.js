function carrinho(produto, acao){
  const qtd = document.getElementById('qtd_' + produto)
  const valor = document.getElementById('valor_' + produto)
  const total = document.getElementById('total_' + produto)

  //qtd.innerHTML = Number(qtd.innerHTML) + 1 // É o mesmo que o seguinte:
  if (acao == '-' && qtd.innerHTML == 0){
    alert("Não há nada no carrinho para remover.")

  } else {
    acao == '+' ? qtd.innerHTML++ : qtd.innerHTML--
    /*total.innerHTML = qtd.innerHTML * somenteNum(valor.innerHTML)
    Este trecho foi alterado apenas após a função "FormatarValor" foi inserida no código, para exibir o "R$" no valor do carrinho.*/
    const ValorTotal =  qtd.innerHTML * somenteNum(valor.innerHTML)
    total.innerHTML = formatarValor(ValorTotal)

    if (qtd.innerHTML == 0) {
      total.innerHTML = ""
    }

    soma()
  }
}

function soma(){
  let soma = 0
  /*soma = soma + Number(document.getElementById('total_1').innerHTML) ou:
  soma += Number(document.getElementById('total_1').innerHTML)
  soma += Number(document.getElementById('total_2').innerHTML)
  soma += Number(document.getElementById('total_3').innerHTML)
  Ou então, fazendo uso de uma cadeia "for", assim:
   */
  for(let i = 1; i<  4; i++){
    /*soma += Number(document.getElementById('total_' + i).innerHTML) 
    Este trecho foi alterado apenas após a função "FormatarValor" foi inserida no código, para formatar o valor do subtotal, exibindo o "R$" nele.*/
    let subtotal = somenteNum(document.getElementById('total_' + i).innerHTML)

    soma += Number(subtotal)
    
    document.getElementById('subtotal').innerHTML = soma != 0 ? formatarValor(soma) : ""
}
}

function somenteNum(n){
  return n.replace(/\D/g,'')
}

function formatarValor(n){
    return 'Total de R$:  ' + n.toLocaleString('pt-BR')
}
