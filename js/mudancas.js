function mudar() {
			
    var tbLancamentos = localStorage.getItem("tbLancamentos"); // Recupera os dados armazenados

    tbLancamentos = JSON.parse(tbLancamentos); // Converte string para objeto
      var x = document.getElementById("txtPesquisa").value;
      var y = document.getElementById("porMes").value;
     
    $("#dataTable1").html("");
    $("#dataTable1").html(
        "<thead>"+
        "	<tr>"+
        "	<th>Data Prevista</th>"+
        "	<th>Data Efetivada</th>"+
        "	<th>Categoria</th>"+
        "	<th>Valor</th>"+
        "	<th>Descrição</th>"+
        "	<th>Situação</th>"+
        "	</tr>"+
        "</thead>"+
        "<tbody>"+
        "</tbody>"
        );

    
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

        if(lancam.DataPrevista == x){
            $("#dataTable1 tbody").append("<tr style='color:"+cor+";'>"+
                "	<td>"+lancam.DataPrevista+"</td>" + 
                "	<td>"+lancam.DataEfetivada+"</td>" + 
                "	<td>"+lancam.Categoria+"</td>" + 
                "	<td>"+lancam.Valor+"</td>" + 
                "	<td>"+lancam.Descricao+"</td>" +
                "	<td>"+situacao+"</td>" + 												
                "</tr>");
        }	
    }
}

function mudar1() {

    var tbLancamentos = localStorage.getItem("tbLancamentos"); // Recupera os dados armazenados

    tbLancamentos = JSON.parse(tbLancamentos); // Converte string para objeto
      // var x = document.getElementById("txtPesquisa").value;
      var y = document.getElementById("porMes").value;
     
    $("#dataTable1").html("");
    $("#dataTable1").html(
        "<thead>"+
        "	<tr>"+
        "	<th>Data Prevista</th>"+
        "	<th>Data Efetivada</th>"+
        "	<th>Categoria</th>"+
        "	<th>Valor</th>"+
        "	<th>Descrição</th>"+
        "	<th>Situação</th>"+
        "	</tr>"+
        "</thead>"+
        "<tbody>"+
        "</tbody>"
        );

    
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

        var dataMes  = lancam.DataPrevista.substring(3,5);
    
        if(lancam.DataPrevista.substring(3,5) == y){
            $("#dataTable1 tbody").append("<tr style='color:"+cor+";'>"+
                "	<td>"+lancam.DataPrevista+"</td>" + 
                "	<td>"+lancam.DataEfetivada+"</td>" + 
                "	<td>"+lancam.Categoria+"</td>" + 
                "	<td>"+lancam.Valor+"</td>" + 
                "	<td>"+lancam.Descricao+"</td>" +
                "	<td>"+situacao+"</td>" + 												
                "</tr>");
        }	
    }
}

function mudar2() {

    var tbLancamentos = localStorage.getItem("tbLancamentos"); // Recupera os dados armazenados

    tbLancamentos = JSON.parse(tbLancamentos); // Converte string para objeto
      // var x = document.getElementById("txtPesquisa").value;
      var z = document.getElementById("txtInicio").value;
      var u = document.getElementById("txtFinal").value;
     
    $("#dataTable1").html("");
    $("#dataTable1").html(
        "<thead>"+
        "	<tr>"+
        "	<th>Data Prevista</th>"+
        "	<th>Data Efetivada</th>"+
        "	<th>Categoria</th>"+
        "	<th>Valor</th>"+
        "	<th>Descrição</th>"+
        "	<th>Situação</th>"+
        "	</tr>"+
        "</thead>"+
        "<tbody>"+
        "</tbody>"
        );

    
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

        var dataMes  = lancam.DataPrevista.substring(3,5);
    
        if(lancam.DataPrevista >= z || u >= lancam.DataPrevista){
            $("#dataTable1 tbody").append("<tr style='color:"+cor+";'>"+
                "	<td>"+lancam.DataPrevista+"</td>" + 
                "	<td>"+lancam.DataEfetivada+"</td>" + 
                "	<td>"+lancam.Categoria+"</td>" + 
                "	<td>"+lancam.Valor+"</td>" + 
                "	<td>"+lancam.Descricao+"</td>" +
                "	<td>"+situacao+"</td>" + 												
                "</tr>");
        } 
        else if(lancam.DataPrevista <= z && u == ""){
            $("#dataTable1 tbody").append("<tr style='color:"+cor+";'>"+
                "	<td>"+lancam.DataPrevista+"</td>" + 
                "	<td>"+lancam.DataEfetivada+"</td>" + 
                "	<td>"+lancam.Categoria+"</td>" + 
                "	<td>"+lancam.Valor+"</td>" + 
                "	<td>"+lancam.Descricao+"</td>" +
                "	<td>"+situacao+"</td>" + 												
                "</tr>");
        }
    }
}