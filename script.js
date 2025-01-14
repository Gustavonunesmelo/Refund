// Seleciona os elementos do formulario.

const amount = document.getElementById("amount")

amount.oninput = () => {
  // Obtem o valor atual do input e remove os caracteres não numericos.
  let value = amount.value.replace(/\D/g, "")

  //Transforma o valor em centavos 
  value = Number(value) / 100

  // Atualizar o valor do input.
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
  // Formata o valor no padrão BRL
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return value  
}