const urlBase = "https://api.franciscosensaulas.com/api/v1/trabalho/atendimentos";


// CREATE (FETCH Utilizando o innertext)
function carregarAtendimento() {

    const id = localStorage.getItem("atendimentoId");

    fetch(`https://api.franciscosensaulas.com/api/v1/trabalho/atendimentos/${id}`)
        .then(response => response.json())
        .then(dados => {

            document.getElementById("nomeCliente").innerText = dados.cliente;
            document.getElementById("produtoCliente").innerText = dados.tipoAtendimento;
            document.getElementById("valorCliente").innerText = "R$ 0"; // se API não tiver valor
            document.getElementById("horarioCliente").innerText = dados.duracaoMinutos + " min";

        })
        .catch(erro => {
            console.log("Erro ao carregar atendimento:", erro);
        });
}

carregarAtendimento();


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
    //CREATE (POST)
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

function atualizarAtendimento() {

    const avaliacao = document.querySelector('input[name="feedback"]:checked');

    const dados = {
        nome: document.getElementById("nomeCliente").innerText,
        produto: document.getElementById("produtoCliente").innerText,
        valor: document.getElementById("valorCliente").innerText,
        horario: document.getElementById("horarioCliente").innerText,
        nota: avaliacao ? avaliacao.value : null
    };

    //ATUALIZAR (PUT)
    fetch("https://api.franciscosensaulas.com/api/v1/trabalho/atendimentos", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (response.ok) {
            alert("Atendimento atualizado com sucesso!");
        } else {
            alert("Erro ao atualizar atendimento.");
        }
    })
    .catch(erro => {
        console.log("Erro:", erro);
    });

}



function excluirAtendimento() {

    // DELETE (DELETE)
    fetch("https://api.franciscosensaulas.com/api/v1/trabalho/atendimentos", {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            alert("Atendimento excluído com sucesso!");
        } else {
            alert("Erro ao excluir atendimento.");
        }
    })
    .catch(erro => {
        console.log("Erro:", erro);
    });

}