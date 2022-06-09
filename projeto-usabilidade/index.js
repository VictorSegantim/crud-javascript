//varios slots, array
var dados = []
//armazena os objetos {}


//apaga a linha da tabela
function apagarLinha(param){
	let verifica = confirm("Deseja excluir essa linha?")

	if (verifica){
		for(let i = 0; i < dados.length; i++){
			if (dados[i].ID == param) {
				//splice apaga um ou mais elementos do array
				//o i é a posição do array, o 1 é o número de elementos que apagará
				dados.splice(i, 1)
			}
		}

		varrerTabela()
	}
}


//edita a linha da tabela
function editaLinha(param){
	$("#modalRegistro").modal("show")

	dados.forEach(function(item) {
		if (item.ID == param){
			$("#escondido").val(item.ID)
			$("#txtProduto").val(item.Produto)
			$("#txtLote").val(item.Lote)
			$("#txtFuncao").val(item.Funcao)
			$("#txtAlocado").val(item.Alocado)
		}
	})
}


//varre o objeto e cria uma linha para cada objeto
function varrerTabela(){
	//verifica se realmente é um array
	if(Array.isArray(dados)) {

		//armazenar dentro do localStorage o array atualizado
		localStorage.setItem("__dados__", JSON.stringify(dados))

		//Seletor do id, e depois da tag. Limpando as linhas para introduzir novas informações
		$("#tblDados tbody").html("")

		//Um loop de array que faz uma varredura em cada objeto dele, até o último
		//A cada vez que rodar, atribui ao item
		dados.forEach(function (item) {
			//adiciona conteúdo html a cada execução. 
			//Template string ``utilizado para concatenar strings com números e quebras de linha
			$("#tblDados tbody").append(`<tr>
					<td>${item.ID}</td>
					<td>${item.Produto}</td>
					<td>${item.Lote}</td>
					<td>${item.Funcao}</td>
					<td>${item.Alocado}</td>
					<td>
						<button type="button" class="btn btn-primary" onclick="javascript:editaLinha(${item.ID});">
							<i class="fa-solid fa-pen-to-square"></i>
						</button>
					</td>
					<td>
						<button type="button" class="btn btn-danger" onclick="javascript:apagarLinha(${item.ID});">
							<i class="fa-solid fa-xmark"></i>
						</button>
					</td>
				</tr>`)
		})
	}
}

$(function () {
	//EXECUÇÃO INICIAL

	//verifica se tem dados armazenados para exibição
	dados = JSON.parse(localStorage.getItem("__dados__"))

	//verifica se o valor não é vazio
	 if (dados != null) {
    	varrerTabela()
  	} else {dados = []}

	$("#btnSalvar").click(function() {
		//CLICAR EM SALVAR

		//val é de value, entrega o valor digitado
		let varEscondido = $("#escondido").val()
		let Produto = $("#txtProduto").val()
		let Lote = $("#txtLote").val()
		let Funcao = $("#txtFuncao").val()
		let Alocado = $("#txtAlocado").val()

		//cria o objeto de registro
		let registro = {}

		//atribui os valores coletados 
		registro.Produto = Produto
		registro.Lote = Lote
		registro.Funcao = Funcao
		registro.Alocado = Alocado

		//atenção ao símbolo de negação
		//processo de adição de linha + edição
		if (!varEscondido || varEscondido == "0") {


			//soma 1 no tamanho do array cada vez que roda o processo
			registro.ID = dados.length + 1

			//atribui os objetos ao array
			dados.push(registro)
		}else{
			dados.forEach(function(item){
				if (item.ID == varEscondido) {
					item.Produto = Produto
					item.Lote = Lote
					item.Funcao = Funcao
					item.Alocado = Alocado
				}
			})
		}

			

		//esconde a modal após o sucesso do registro
		alert("Registro salvo com sucesso!")
		$("#modalRegistro").modal("hide")

		//LIMPEZA DO MODAL
		//a val, quando vazia, pega o dado, mas quando tem algo, ela sobreescreve
		$("#escondido").val("0")
		$("#txtProduto").val("")
		$("#txtLote").val("")
		$("#txtFuncao").val("")
		$("#txtAlocado").val("")

		varrerTabela()

	})

})