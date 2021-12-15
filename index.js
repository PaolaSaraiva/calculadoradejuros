const nome=document.getElementById("nome")
const data=document.getElementById("data")
const valor=document.getElementById("valor")
const tabela=document.getElementById("tabela")
let recebiveis=[]

function adicionar (e){
    e.preventDefault()

    const recebivel={
        nome: nome.value,
        data: data.value,
        valor: parseFloat(valor.value),
    }

    // Adiciona o objeto no array e envia para recarregar a tabela
    recebiveis.push(recebivel)
    carregarTabela(recebiveis)

    // Limpa os inputs
    nome.value=""
    data.value=""
    valor.value=""

} 

function carregarTabela (recebiveis){

    // Reseta a tabela
    tabela.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Vencimento</th>
            <th>Valor</th>
        </tr>
    `
    
    // Adiciona os valores na tabela
    for(let i = 0; i < recebiveis.length; i++) {
        const recebivel = recebiveis[i]

        const novaLinhaDaTabela = document.createElement('tr')
        const dadoDaTabelaNome = document.createElement('td')
        const dadoDaTabelaData = document.createElement('td')
        const dadoDaTabelaValor = document.createElement('td')

        dadoDaTabelaNome.innerHTML = recebivel.nome
        dadoDaTabelaData.innerHTML = recebivel.data
        dadoDaTabelaValor.innerHTML = recebivel.valor

        novaLinhaDaTabela.appendChild(dadoDaTabelaNome)
        novaLinhaDaTabela.appendChild(dadoDaTabelaData)
        novaLinhaDaTabela.appendChild(dadoDaTabelaValor)

        tabela.appendChild(novaLinhaDaTabela)
    }
}

function implementarJuros (){

    // Cria um novo array com os valores atrasados com juros calculados
    const recebiveisComJuros = recebiveis.map((recebivel) => {
        const validadeDoRecebivel = new Date(recebivel.data)
        const estaForaDoPrazoDeValidade = validadeDoRecebivel < new Date()

        // Verifica se esta atrasado
        if (estaForaDoPrazoDeValidade) {
            // Logica copiada da internet top
            const diferencaEntreDatas = Math.abs(validadeDoRecebivel.getTime() - new Date().getTime())
            const diasDeDiferenca = Math.ceil(diferencaEntreDatas / (1000 * 60 * 60 * 24))

            // Calculo de juros
            const valorComJuros = recebivel.valor + (recebivel.valor * 0.02) + (recebivel.valor * 0.01 * diasDeDiferenca)

            return {
                nome: recebivel.nome,
                data: recebivel.data,
                valor: valorComJuros
            }
        }

        return recebivel
    })

    carregarTabela(recebiveisComJuros)
}