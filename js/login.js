$(function(){

	var tbUsuarios = localStorage.getItem("tbUsuarios");// Recupera os dados armazenados

	tbUsuarios = JSON.parse(tbUsuarios); // Converte string para objeto	


	$("#Login").on("submit",function(){
		var user1 = GetNome("Email", $("#email").val());
		var user2 = GetSenha("Senha", $("#senha").val());
		var emailzinho = document.getElementById("email").value;

		if((user1 != null) && (user2 != null)){
			alert("Login efetuado com sucesso")
				
			//window.location="file:///C:/Users/julia/OneDrive%20-%20Complexo%20de%20Ensino%20Superior%20do%20Brasil%20LTDA/PRATICA_WEB/SOSFinanceiro/principal.html";
			window.open("principal.html");
			window.close()
		}
		else{
			alert("E-mail ou senha incorretos")
		}
		
	});

	function GetNome(propriedade, valor){
		var user1 = null;
		
        for (var item in tbUsuarios) {
            var i = JSON.parse(tbUsuarios[item]);
            if (i[propriedade] == valor)
                user1 = i;
		}
        return user1;
	}

	function GetSenha(propriedade, valor){
		var user2 = null;
		
        for (var user1 in tbUsuarios) {
            var i = JSON.parse(tbUsuarios[user1]);
            if (i[propriedade] == valor)
                user2 = i;
		}
        return user2;
	}
});