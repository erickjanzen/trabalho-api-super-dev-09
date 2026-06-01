const botaoEnviar = document.getElementsByClassName('enviarReserva')[0];
botaoEnviar.addEventListener('click', enviarReservas)
const urlBase = "https://api.franciscosensaulas.com/api/v1/trabalho/atendimentos";
const tipoServico = document.getElementById("tipoServico")

function enviarReservas(){
    const areaNome = document.getElementById("areaNome")
    const detalhesCorte = document.getElementById("detalhesCorte").value
    const atendente = document.getElementById("atendente").value;
    const horarioAgendado = document.getElementById("horarioAgendado").value;
    const horario = parseFloat(horarioAgendado);

    const nome = areaNome.value.trim();
    let valorPedido = 0;

    if(nome.length < 2){
        alert("O nome deve conter pelo menos 2 caracteres.");
        return;
    }
    
    if(atendente === ""){
        alert("Selecione um atendente.");
        return;
    }

    if(isNaN(horario) || horario <= 0){
        alert("Selecione um horário para o atendimento.");
        return;
    }

    const dados = {
        cliente: nome,
        tipoAtendimento: tipoServico.value,
        descricao: detalhesCorte,
        atendente: atendente,
        duracaoMinutos: horario
    }

    console.log(dados);
    console.log(JSON.stringify(dados));

    fetch(urlBase, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
})
.then(response => response.json())
.then(res => {

    console.log("Resposta da API:", res);
    localStorage.setItem("atendimentoId", res.id);
    alert("Pedido cadastrado com sucesso");
    location.reload();

})
.catch(error => {
    console.log("Erro ao enviar:", error);
      alert("Ocorreu um erro ao cadastrar o pedido")
});
}

const botaoApresentar = document.getElementById("botaoApresentar")
botaoApresentar.addEventListener('click', apresentarInfos)

function apresentarInfos(){

    if(tipoServico.value === "cabelo"){
        valorPedido = 50
    } else if (tipoServico.value === "barba"){
        valorPedido = 45
    } else if (tipoServico.value === "cabeloEBarba"){
        valorPedido = 90
    } else if (tipoServico.value === "sobrancelha"){
        valorPedido = 20
    } else if (tipoServico.value === "completo"){
        valorPedido = 100
    } else if (tipoServico.value === "cabeloESobrancelha"){
        valorPedido = 60
    } else if (tipoServico.value === "barbaESobrancelha"){
        valorPedido = 55
    } else {
        alert("Selecione um tipo de serviço.");
        return;
    }


    const infoServico = document.getElementById("infoServico");
    infoServico.innerText = `Nome do cliente: ${areaNome.value}
    Valor do pedido: R$ ${valorPedido.toFixed(2)}
    Detalhes do serviço: ${detalhesCorte.value}
    Atendente: ${atendente.value}
    Horário agendado: ${horarioAgendado.value}h`;

    infoServico.classList.remove("hidden");
}

const botaoApagar = document.getElementById("botaoApagar");
botaoApagar.addEventListener('click', apagarCadastro);

function apagarCadastro(){

    const idApagar = localStorage.getItem("atendimentoId");

    if (!idApagar) {
        alert("Nenhum registro encontrado.");
        return;
    }

    const confirmacaoApagar = confirm("Deseja realmente apagar?");

    if(confirmacaoApagar !== true){
        return;
    }

    const url = `${urlBase}/${idApagar}`

    fetch(url, {
        method: "DELETE"
    })
        .then(response => {
            if(response.status === 204) {
                alert("Reserva apagada com sucesso")
            } else {
                alert("Não foi possível apagar a reserva")
            }
        })
        .catch(error => {
            console.error("Erro ao apagar reserva: " + error)
            alert("Ocorreu um erro ao tentar apagar a reserva");
        })
}

const botaoEditar = document.getElementById("botaoEditar")

botaoEditar.addEventListener('click', editarReserva)

function editarReserva(){

    const areaNome = document.getElementById("areaNome");
    const tipoServico = document.getElementById("tipoServico");
    const detalhesCorte = document.getElementById("detalhesCorte");
    const atendente = document.getElementById("atendente");
    const horarioAgendado = document.getElementById("horarioAgendado");

    const nome = areaNome.value.trim();

    const idEditar = localStorage.getItem("atendimentoId");

    const url = `${urlBase}/${idEditar}`;

    fetch(url)
        .then(response => response.json())
        .then(categoria => {
            areaNome.value = categoria.cliente;
            tipoServico.value = categoria.tipoAtendimento;
            detalhesCorte.value = categoria.descricao;
            atendente.value = categoria.atendente;
            horarioAgendado.value = categoria.duracaoMinutos;
        })
            .catch(error => {
            console.error("Erro ao buscar registro para edição: " + error);

            alert("Ocorreu um erro ao tentar buscar o registro");
        })

            if(nome.length < 2){
        alert("O nome deve conter pelo menos 2 caracteres.");
        return;
    }
    
    if(atendente === ""){
        alert("Selecione um atendente.");
        return;
    }

    if(isNaN(horario) || horario <= 0){
        alert("Selecione um horário para o atendimento.");
        return;
    }

    apagarCadastro()

}