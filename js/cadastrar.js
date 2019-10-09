$(function(){

	var operacao = "A"; //"A"=Adição; "E"=Edição

	var indice_selecionado = -1;

	var tbUsuarios = localStorage.getItem("tbUsuarios");// Recupera os dados armazenados

	tbUsuarios = JSON.parse(tbUsuarios); // Converte string para objeto

	if(tbUsuarios == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbUsuarios = [];

	function Adicionar(){
		var user = GetCliente("Email", $("#txtEmail").val());

		if(user != null){
			alert("E-mail já cadastrado.");
			return;
		}

		var usuarios = JSON.stringify({
			NomeCompleto   : $("#txtNomeCompleto").val(),
			Telefone     : $("#txtTelefone").val(),
			Email : $("#txtEmail").val(),
			Senha    : $("#txtSenha").val()
		});

		tbUsuarios.push(usuarios);

		localStorage.setItem("tbUsuarios", JSON.stringify(tbUsuarios));

		alert("Registro adicionado.");
		return true;
	}

	function Editar(){
		tbUsuarios[indice_selecionado] = JSON.stringify({
				Codigo   : $("#txtCodigo").val(),
				Nome     : $("#txtNome").val(),
				Telefone : $("#txtTelefone").val(),
				Email    : $("#txtEmail").val()
			});
		localStorage.setItem("tbUsuarios", JSON.stringify(tbUsuarios));
		alert("Informações editadas.")
		operacao = "A";
		return true;
	}

	function Listar(){
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
			"	<tr>"+
			"<th></th>"+
			"	<th>Código</th>"+
			"	<th>Nome</th>"+
			"	<th>Telefone</th>"+
			"	<th>Email</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		 for(var i in tbUsuarios){
			var cli = JSON.parse(tbUsuarios[i]);
		  	$("#tblListar tbody").append("<tr>"+
									 	 "	<td><img src='edit.png' alt='"+i+"' class='btnEditar'/><img src='delete.png' alt='"+i+"' class='btnExcluir'/></td>" + 
										 "	<td>"+cli.Codigo+"</td>" + 
										 "	<td>"+cli.Nome+"</td>" + 
										 "	<td>"+cli.Telefone+"</td>" + 
										 "	<td>"+cli.Email+"</td>" + 
		  								 "</tr>");
		 }
	}

	function Excluir(){
		tbUsuarios.splice(indice_selecionado, 1);
		localStorage.setItem("tbUsuarios", JSON.stringify(tbUsuarios));
		alert("Registro excluído.");
	}

	function GetCliente(propriedade, valor){
		var user = null;
        for (var item in tbUsuarios) {
            var i = JSON.parse(tbUsuarios[item]);
            if (i[propriedade] == valor)
                user = i;
        }
        return user;
	}

	Listar();

	$("#CadastroConta").on("submit",function(){
		if(operacao == "A")
			return Adicionar();
		else
			return Editar();		
	});

	$("#tblListar").on("click", ".btnEditar", function(){
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var cli = JSON.parse(tbUsuarios[indice_selecionado]);
		$("#txtCodigo").val(cli.Codigo);
		$("#txtNome").val(cli.Nome);
		$("#txtTelefone").val(cli.Telefone);
		$("#txtEmail").val(cli.Email);
		$("#txtCodigo").attr("readonly","readonly");
		$("#txtNome").focus();
	});

	$("#tblListar").on("click", ".btnExcluir", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});
});