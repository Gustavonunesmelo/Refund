// Seleciona os elementos do formulario.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

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

// Captura o evento de submit do formulario para obter os valores.
form.onsubmit = (event) => {
  event.preventDefault()

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  //Chama a funçao que ira adicionar o item na lista.
  expenseAdd(newExpense)
}

// Adicionando um novo item na lista.
function expenseAdd(newExpense) {
  try {
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Cria o ícone da categoria.
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Cria info da despesa. 
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // Cria o nome da despesa.
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // Cria a categoria da despesa. 
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Adiciona nome e categoria na div das infomarçoes da despesa.
    expenseInfo.append(expenseName, expenseCategory)

    // Cria o valor da despesa.
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</samll>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`

    //Criando ícone de remover.
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    // Limpa o formulario.
    formClear()

    // Adiciona as informaçoes no item. 
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // Adiciona o ítem na lista.
    expenseList.append(expenseItem)

    // Adiciona o item na lista. 
    expenseList.append(expenseItem)

    // Atualiza os totais.
    updateTotals()

  } catch (error) {
    alert("Não foi possicivel executar o processo")
  }
}

// Atualiza os totais.
function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children

    // Atualiza a quantidade de itens da lista. 
    expensesQuantity.textContent = `${items.length} 
    ${items.length > 1 ? "despesas" : "despesa"
      }`

    // Variavel para incrementar o total. 
    let total = 0
    
    // Percorre cada item (li) da lista (ul)
    for(let item = 0; item < items.length; item++){
      const itemAmount = items[item].querySelector(".expense-amount")

      // Remove caracteres não numéricos e substitui a vírgula pelo ponto.
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

      // Converte o valor para float.
      value = parseFloat(value)

      // Verifica se o numero é valido.
      if (isNaN(value)) {
        return alert(
          "Não foi possívelcalcular o total. O valor nao parecer ser um número."
        )
      }

      // Incrementa o valor total.
      total += Number(value)
    }

    //Cria a span para adicionar O R$ formatado.
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    // Formata o valor e remove o R$ que sera exibido pela small com o estilo customizado.
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    // Limpa o conteudo do elemento.
    expensesTotal.innerHTML = ""

    // Adiciona o símbolo da moeda e o valor total formatado.
    expensesTotal.append(symbolBRL, total)

  } catch (error) { 
    console.log("Erro")
    alert("Não foi possível atualizar os totais.")
  }
}

// Evento que captura o clique nos itens da lista.
expenseList.addEventListener("click", function (event) {
  // Verificar se o elemento clicado é o ícone de remover.
  if (event.target.classList.contains("remove-icon")) {

    // Obtem a li pai do elemento clicado.
    const item = event.target.closest(".expense")

    // Remove um item da lista.
    item.remove()

    // Atualiza os totais.]
    updateTotals()
  }
})

// Funçao de limpar o formulario.
function formClear() {
  expense.value = ""
  category.value = ""
  amount.value = ""

  // coloca o foco no amount.
  expense.focus()
}
