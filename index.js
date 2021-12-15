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
    recebiveis.push(recebivel)
    carregarTabela(recebiveis)

    nome.value=""
    data.value=""
    valor.value=""

} 

function carregarTabela (recebiveis){
    tabela.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Vencimento</th>
            <th>Valor</th>
        </tr>
    `
    
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
    const recebiveisComJuros = recebiveis.map((recebivel) => {
        const validadeDoRecebivel = new Date(recebivel.data)

        if (validadeDoRecebivel < new Date()) {
            const diferencaEntreDatas = Math.abs(validadeDoRecebivel.getTime() - new Date().getTime())
            const diasDeDiferenca = Math.ceil(diferencaEntreDatas / (1000 * 60 * 60 * 24))

            return {
                nome: recebivel.nome,
                data: recebivel.data,
                valor: recebivel.valor + (recebivel.valor * 0.02) + (recebivel.valor * 0.01 * diasDeDiferenca)
            }
        }

        return recebivel
    })

    carregarTabela(recebiveisComJuros)
}