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
        Cliente: document.getElementById("nomeCliente").innerText,
        Atendente: "Lucas",
        Descricao: `Nota ${avaliacao.value}`,
        TipoAtendimento: document.getElementById("produtoCliente").innerText
    };
    //CREATE (POST)
    fetch("https://api.franciscosensaulas.com/api/v1/trabalho/atendimentos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
        .then(async response => {
            const retorno = await response.text();

            console.log("Status:", response.status);
            console.log("Resposta:", retorno);

            if (response.ok) {
                alert("Sucesso!");
            } else {
                alert(`Erro ${response.status}`);
            }
        })
        .catch(erro => {
            console.log("Erro:", erro);
        });

});
    //update, to atualizando o atendimento
function atualizarAtendimento() {

    const id = localStorage.getItem("atendimentoId");

    if (!id) {
        alert("Nenhum atendimento encontrado.");
        return;
    }

    const descricaoAtualizacao =
        document.getElementById("descricaoAtualizacao").value;

    if (!descricaoAtualizacao.trim()) {
        alert("Digite uma descrição para atualizar o atendimento.");
        return;
    }

    const dados = {
        cliente: document.getElementById("nomeCliente").innerText,
        tipoAtendimento: document.getElementById("produtoCliente").innerText,
        descricao: descricaoAtualizacao,
        atendente: "Lucas",
        duracaoMinutos: parseInt(
            document.getElementById("horarioCliente").innerText.replace(" min", "")
        )
    };

    console.log("Atualizando atendimento:", dados);

    fetch(`https://api.franciscosensaulas.com/api/v1/trabalho/atendimentos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(async response => {

        const retorno = await response.text();

        console.log("Status:", response.status);
        console.log("Resposta:", retorno);

        if (response.ok) {
            alert("Atendimento atualizado com sucesso!");
        } else {
            alert(`Erro ao atualizar atendimento (${response.status})`);
        }

    })
    .catch(erro => {
        console.log("Erro:", erro);
        alert("Erro de conexão com a API.");
    });

}



function excluirAtendimento() {

    const id = localStorage.getItem("atendimentoId");

    fetch(`https://api.franciscosensaulas.com/api/v1/trabalho/atendimentos/${id}`, {
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
