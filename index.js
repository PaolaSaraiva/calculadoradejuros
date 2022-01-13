const nome=document.getElementById("nome")
const data=document.getElementById("data")
const valor=document.getElementById("valor")
const tabela=document.getElementById("tabela")
const tabeladepesquisa=document.getElementById("tabelaPesquisa")
let recebiveis=[]

function adicionar (e){
    e.preventDefault()

    const recebivel={
        nome: nome.value,
        data: new Date(data.value.replace(/-/g, '\/')),
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
            <th>Valor salvo</th>
        </tr>
    `

    
    // Adiciona os valores na tabela
    for(let i = 0; i < recebiveis.length; i++) {
        const recebivel = recebiveis[i]

        const novaLinhaDaTabela = document.createElement('tr')
        const dadoDaTabelaNome = document.createElement('td')
        const dadoDaTabelaData = document.createElement('td')
        const dadoDaTabelaValor = document.createElement('td')

        dadoDaTabelaNome.innerHTML = recebivel.nome ?? ""
        dadoDaTabelaData.innerHTML = recebivel.data?.toLocaleDateString() ?? ""
        dadoDaTabelaValor.innerHTML = `R$ ${recebivel.valor}`

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
                data: new Date(recebivel.data),
                valor: valorComJuros
            }
        }

        return recebivel
    })

    carregarTabela(recebiveisComJuros)
}
//cria uma função para pesquisar os recebiveis
function pesquisar (e){
    e.preventDefault()
    const dataDeInicio = document.getElementById ("dataDeInicio")
    const dataDeFim = document.getElementById ("dataDeFim")
    const valorMinimo = document.getElementById ("valorMinimo")
    const valorMaximo = document.getElementById ("valorMaximo")
    const recebiveiPesquisados = recebiveis.filter((recebivel)=>{
        const recebivelestadentrodorangededata = new Date(dataDeInicio.value.replace(/-/g, '\/')) < recebivel.data && new Date(dataDeFim.value.replace(/-/g, '\/')) > recebivel.data
        const recebivelestadentrodorangedevalor = Number(valorMinimo.value) < recebivel.valor && Number(valorMaximo.value) > recebivel.valor
        return recebivelestadentrodorangededata && recebivelestadentrodorangedevalor
    })
    carregarTabelaDePesquisa(recebiveiPesquisados)
}
function carregarTabelaDePesquisa (recebiveis){

    tabeladepesquisa.innerHTML = `
        <tr>
            <th>Resultado De Pesquisa</th>
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
        dadoDaTabelaData.innerHTML = recebivel.data.toLocaleDateString()
        dadoDaTabelaValor.innerHTML = recebivel.valor

        novaLinhaDaTabela.appendChild(dadoDaTabelaNome)
        novaLinhaDaTabela.appendChild(dadoDaTabelaData)
        novaLinhaDaTabela.appendChild(dadoDaTabelaValor)

        tabeladepesquisa.appendChild(novaLinhaDaTabela)
    }
}
//funções para agrupar e mostrar o resultados (atividade de reduce)
function agruparPorClientes() {
    const recebiveisAgrupadosPorCliente = recebiveis.reduce ((acc,recebivel)=>{
        const clienteExistenteNoAcc = acc.find ((cliente)=> cliente.nome==recebivel.nome)
        if (clienteExistenteNoAcc){
            clienteExistenteNoAcc.valor=Number(clienteExistenteNoAcc.valor)+Number(recebivel.valor)
            const accSemClienteExistente =acc.filter((cliente)=> cliente.nome != recebivel.nome)
            return [...accSemClienteExistente,clienteExistenteNoAcc]
        }
        recebivel.data=null
        return [...acc, recebivel]
    },[])

    carregarTabela(recebiveisAgrupadosPorCliente)
}

function agruparPorDatavenc(){
    const recebiveisAgrupadosPorData = recebiveis.reduce ((acc,recebivel)=>{
        const dataExistenteNoAcc = acc.find ((cliente)=> cliente.data==recebivel.data)
        if (dataExistenteNoAcc){
            dataExistenteNoAcc.valor=Number(dataExistenteNoAcc.valor)+Number(recebivel.valor)
            const accSemDataExistente =acc.filter((data)=> data.data!==recebivel.data)
            return [...accSemDataExistente,dataExistenteNoAcc]
        }
        recebivel.nome=null
        return [...acc, recebivel]
    },[])
    carregarTabela(recebiveisAgrupadosPorData)
}