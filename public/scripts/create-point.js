function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")

    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value
    const allOptions = event.target.selectedIndex
    stateInput.value = event.target.options[allOptions].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = `<option value>Selecione a cidade</option>`
    citySelect.disabled = true;
     
    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document.querySelector("select[name=uf]").addEventListener("change", getCities)

// Itens de coleta

    // Catch list items

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // Add or remove js class
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // Test itemId

    console.log("Item ID: ", itemId)

    // Verificar se existem items selecionados, se sim pegar os items
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound    //retorna um Verdadeiro ou Falso
    })

    // Se ja estiver selecionado, tirar da coleção
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }
    
    // Se não estiver selecionado, adicionar a seleção
    else {
        selectedItems.push(itemId)
    }

    // Test selected-Items
    console.log("Selected Items", selectedItems)
    
    // Atualizar o campo hidden com os items selecionados
    collectedItems.value = selectedItems
}