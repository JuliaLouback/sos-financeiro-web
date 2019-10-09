$(function(){

	var operacao = "A"; //"A"=Adição; "E"=Edição

	var indice_selecionado = -1;
	
	var tbLancamentos = localStorage.getItem("tbLancamentos"); // Recupera os dados armazenados
	
	tbLancamentos = JSON.parse(tbLancamentos); // Converte string para objeto

	if(tbLancamentos == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbLancamentos = [];

	function Adicionar(){
		var lancam = Getlanca("DataPrevista", $("#txtDataPrevista").val());

		var lanca = JSON.stringify({
			DataPrevista  : $("#txtDataPrevista").val(),
			DataEfetivada : $("#txtDataEfetivada").val(),
			Categoria : $("#txtCategoria").val(),
			Valor   : $("#txtValor").val(),
			Descricao  : $("#txtDescricao").val(),
			// Situacao  : $("#txtStatus").val()
		});

		tbLancamentos.push(lanca);

		localStorage.setItem("tbLancamentos", JSON.stringify(tbLancamentos));

		alert("Lançamento cadastrado com sucesso");
		return true;
	}

	function Editar(){
		tbLancamentos[indice_selecionado] = JSON.stringify({
			DataPrevista  : $("#txtDataPrevista").val(),
			DataEfetivada : $("#txtDataEfetivada").val(),
			Categoria : $("#txtCategoria").val(),
			Valor   : $("#txtValor").val(),
			Descricao  : $("#txtDescricao").val(),
			Situacao  : $("#txtStatus").val()
			});
		localStorage.setItem("tbLancamentos", JSON.stringify(tbLancamentos));
		alert("Lançamento editado.")
		operacao = "A";
		return true;
	}


	function Listar(){
		$("#dataTable").html("");
		$("#dataTable").html(
			"<thead>"+
			"	<tr>"+
			"	<th>Data Prevista</th>"+
			"	<th>Data Efetivada</th>"+
			"	<th>Categoria</th>"+
			"	<th>Valor</th>"+
			"	<th>Descrição</th>"+
			"	<th>Situação</th>"+
			"	<th>Editar</th>"+
			"	<th>Excluir</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		
		var valor = 0;
		var pendente = 0;
		var atrasado = 0;
		var julia = 0;

		 for(var i in tbLancamentos){
			var lancam = JSON.parse(tbLancamentos[i]);
			var data = lancam.DataPrevista.substring(6, 10) + '-' + lancam.DataPrevista.substring(3,5) + '-' + lancam.DataPrevista.substring(0, 2)

			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();
			
			today = yyyy + '-' + mm  + '-' + dd;


			// var valor = valor + parseFloat(lancam.Valor);
			
			if((data < today) && (lancam.DataEfetivada == "") && (lancam.Categoria == "Despesa")){
				var cor = "#FF6347"
				var situacao = "Atrasado"
			}

			
			if(lancam.DataEfetivada == "" && data < today){
					$("#dataTable tbody").append("<tr style='color:"+cor+";'>"+
					"	<td>"+lancam.DataPrevista+"</td>" + 
					"	<td>"+lancam.DataEfetivada+"</td>" + 
					"	<td>"+lancam.Categoria+"</td>" + 
					"	<td>"+lancam.Valor+"</td>" + 
					"	<td>"+lancam.Descricao+"</td>" +
					"	<td>"+situacao+"</td>" +
					"	<td><a href='' class='btnEditar' data-toggle='modal' data-target='#ModalCadastro' alt='"+i+"' class='btnEditar'><img src='img/editar.png'/></a></td>" + 		
					"	<td><a href='' class='btnExcluir'><img src='img/excluir.png'</a></td>" + 												
					"</tr>");
			}
		 }

	}

	function Excluir(){
		tbLancamentos.splice(indice_selecionado, 1);
		localStorage.setItem("tbLancamentos", JSON.stringify(tbLancamentos));
		alert("Lançamento excluído com sucesso.");
	}

	function Getlanca(propriedade, valor){
		var lancam = null;
        for (var item in tbLancamentos) {
            var i = JSON.parse(tbLancamentos[item]);
            if (i[propriedade] == valor)
                lancam = i;
        }
        return lancam;
	}

	Listar();

	$("#Cadastro").on("submit",function(){
		if(operacao == "A")
			return Adicionar();
		else
			return Editar();		
	});

	$("#dataTable").on("click", ".btnEditar", function(){
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var lancam = JSON.parse(tbLancamentos[indice_selecionado]);
		$("#txtDataPrevista").val(lancam.DataPrevista);
		$("#txtDataEfetivada").val(lancam.DataEfetivada);
		$("#txtCategoria").val(lancam.Categoria);
		$("#txtValor").val(lancam.Valor);
		$("#txtDescricao").val(lancam.Descricao);
		$("#txtValor").val(lancam.Valor);
		$("#txtValor").focus();
	});

	$("#dataTable").on("click", ".btnExcluir", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});
	
	
});