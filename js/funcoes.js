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

			function adicionarDiasData(dias){
				var hoje        = new Date();
				var dataVenc    = new Date(hoje.getTime() + (dias * 24 * 60 * 60 * 1000));
				return dataVenc.getFullYear() + "-" + (dataVenc.getMonth() + 1) + "-" + dataVenc.getDate();
			}

			var novaData = adicionarDiasData(7);

			// var valor = valor + parseFloat(lancam.Valor);
			
			if((lancam.DataEfetivada != "") || (lancam.Categoria == "Receita")){
				var cor = "#4caf50"
				var situacao = "Pago"

			}
			else if((data < today) && (lancam.DataEfetivada == "") && (lancam.Categoria == "Despesa")){
				var cor = "#FF6347"
				var situacao = "Atrasado"
			}
			else if((data < novaData) && (lancam.DataEfetivada == "") && (lancam.Categoria == "Despesa")){
				var cor = "#f9a825"
				var situacao = "Ainda não efetivado"
			}
			else if(lancam.DataEfetivada == ""){
				var cor = "#e53935"
				var situacao = "Atrasado"
			}

			if(lancam.Categoria == "Receita"){
				var valor = valor + parseFloat(lancam.Valor);
			}
			else if((data < today) && (lancam.DataEfetivada == "") && (lancam.Categoria == "Despesa")){
				atrasado = atrasado + parseFloat(lancam.Valor);
			}
			else if((data < novaData) && (lancam.DataEfetivada == "") && (lancam.Categoria == "Despesa")){
				pendente = pendente + parseFloat(lancam.Valor);
			}
			else{
				julia = julia + parseFloat(lancam.Valor);
			}

			
			if(lancam.DataPrevista.substring(3, 5) == mm){
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

		 var resultado = valor - julia; 

		 $("#card").html("");
		 $("#card").html(
			 "<div class='row no-gutters align-items-center'>"+
			 "<div class='col mr-2' >"+
			 "<div class='text-xs font-weight-bold text-success text-uppercase mb-1'>Saldos</div>"+
			 "<div class='h5 mb-0 font-weight-bold text-gray-800'> R$ "+resultado.toFixed(2)+"</div>"+
			 "</div>"+
			 "<div class='col-auto'>"+
			 "<i class='fas fa-dollar-sign fa-2x text-gray-300'></i>"+
			 "</div>"+
			 "</div>");

		 $("#card1").html("");
		 $("#card1").html(
			"<div class='row no-gutters align-items-center'>"+
			"<div class='col mr-2' >"+
			"<div class='text-xs font-weight-bold text-danger text-uppercase mb-1'>Total Atrasados</div>"+
			"<div class='h5 mb-0 font-weight-bold text-gray-800'> R$ "+atrasado.toFixed(2)+"</div>"+
			"</div>"+
			"<div class='col-auto'>"+
			"<i class='fas fa-dollar-sign fa-2x text-gray-300'></i>"+
			"</div>"+
			"</div>");

		$("#card2").html("");
		$("#card2").html(
			"<div class='row no-gutters align-items-center'>"+
			"<div class='col mr-2' >"+
			"<div class='text-xs font-weight-bold text-warning text-uppercase mb-1'>Total de Pendentes</div>"+
			"<div class='h5 mb-0 font-weight-bold text-gray-800'> R$ "+pendente.toFixed(2)+"</div>"+
			"</div>"+
			"<div class='col-auto'>"+
			"<i class='fas fa-dollar-sign fa-2x text-gray-300'></i>"+
			"</div>"+
			"</div>");
			
		

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