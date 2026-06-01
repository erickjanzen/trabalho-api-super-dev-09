const botaoEnviar = document.getElementsByClassName('enviarReserva')[0];
botaoEnviar.addEventListener('click', enviarReservas)
const urlBase = "https://api.franciscosensaulas.com/api/v1/trabalho/atendimentos";
function enviarReservas(evento){
    const areaNome = document.getElementById("areaNome")
    const tipoServico = document.getElementById("tipoServico")
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

    // SALVA O ID PARA A OUTRA PÁGINA
    localStorage.setItem("atendimentoId", res.id);

})
.then(res => {
    console.log("Resposta da API:", res);
})
.catch(error => {
    console.log("Erro ao enviar:", error);
});

    const infoServico = document.getElementById("infoServico");
    infoServico.innerText = `Nome do cliente: ${areaNome.value}
    Valor do pedido: R$ ${valorPedido.toFixed(2)}
    Detalhes do serviço: ${detalhesCorte}
    Atendente: ${atendente}
    Horário agendado: ${horarioAgendado}h`;

    infoServico.classList.remove("hidden");

    const botaoFinal = document.getElementById("botaoFinal");
    botaoFinal.innerText = "Enviar Pedido";

}
