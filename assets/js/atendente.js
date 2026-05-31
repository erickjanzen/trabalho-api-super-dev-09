// BUSCAR DADOS DA API
function carregarAtendimento() {
    fetch("https://api.franciscosensaulas.com/api/v1/trabalho/atendimentos")
        .then(response => response.json())
        .then(dados => {

            document.getElementById("nomeCliente").innerText = dados.nome;
            document.getElementById("produtoCliente").innerText = dados.produto;
            document.getElementById("valorCliente").innerText = "R$ " + dados.valor;
            document.getElementById("horarioCliente").innerText = dados.horario;

        })
        .catch(erro => {
            console.log("Erro ao carregar atendimento:", erro);
        });
}

carregarAtendimento();


// ENVIAR AVALIAÇÃO
document.querySelector(".btn-enviar").addEventListener("click", function () {

    const avaliacao = document.querySelector('input[name="feedback"]:checked');

    if (!avaliacao) {
        alert("Selecione uma nota de 1 a 5.");
        return;
    }

    const dados = {
        nome: document.getElementById("nomeCliente").innerText,
        produto: document.getElementById("produtoCliente").innerText,
        valor: document.getElementById("valorCliente").innerText,
        horario: document.getElementById("horarioCliente").innerText,
        nota: avaliacao.value
    };

    fetch("https://api.franciscosensaulas.com/api/v1/trabalho/atendimentos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (response.ok) {
            alert("Avaliação enviada com sucesso!");
        } else {
            alert("Erro ao enviar avaliação.");
        }
    })
    .catch(erro => {
        console.log("Erro:", erro);
    });

});