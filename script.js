const modoEscuroButton = document.getElementById("modo-escuro");
const body = document.body;

const telaPrincipal = document.getElementById("tela-principal");
const telaMarcarReuniao = document.getElementById("tela-marcar-reuniao");
const telaVisualizarReunioes = document.getElementById("tela-visualizar-reunioes");

const btnMarcarReuniao = document.getElementById("btn-marcar-reuniao");
const btnVerReunioes = document.getElementById("btn-ver-reunioes");
const btnVoltarPrincipal = document.getElementById("btn-voltar-principal");
const btnVoltarPrincipal2 = document.getElementById("btn-voltar-principal-2");

const formReuniao = document.getElementById("form-reuniao");
const dataInput = document.getElementById("data");
const horaInput = document.getElementById("hora");
const tituloInput = document.getElementById("titulo");
const participantesInput = document.getElementById("participantes");
const linkReuniaoDiv = document.getElementById("link-reuniao");
const listaReunioes = document.getElementById("lista-reunioes");

// Função para mostrar/esconder telas
function mostrarTela(tela) {
    telaPrincipal.classList.add("hidden");
    telaMarcarReuniao.classList.add("hidden");
    telaVisualizarReunioes.classList.add("hidden");

    // Limpar o formulário antes de mostrar a tela principal
    if (tela === telaPrincipal) {
        formReuniao.reset();
    }

    // Limpar o formulário e os campos da tela "Marcar Reunião"
    if (tela === telaMarcarReuniao) {
        formReuniao.reset(); // Limpa os campos do formulário
        dataInput.value = ''; // Limpa o campo "Data"
        horaInput.value = ''; // Limpa o campo "Hora"
        tituloInput.value = ''; // Limpa o campo "Título"
        participantesInput.value = ''; // Limpa o campo "Participantes"
    }

    tela.classList.remove("hidden");
}

// Função para alternar o modo escuro
modoEscuroButton.addEventListener("click", () => {
    body.classList.toggle("modo-escuro");
    if (body.classList.contains("modo-escuro")) {
        modoEscuroButton.textContent = "Modo Claro";
    } else {
        modoEscuroButton.textContent = "Modo Escuro";
    }
});

// Função para mostrar a tela de marcar reunião
btnMarcarReuniao.addEventListener("click", () => {
    mostrarTela(telaMarcarReuniao);
});

// Função para mostrar a tela de visualizar reuniões
btnVerReunioes.addEventListener("click", () => {
    // Limpar o formulário antes de mostrar a tela de visualizar reuniões
    formReuniao.reset();
    dataInput.value = '';
    horaInput.value = '';
    tituloInput.value = '';
    participantesInput.value = '';

    mostrarTela(telaVisualizarReunioes);
    exibirReunioes(); // Exibe as reuniões marcadas
});

// Função para voltar para a tela principal
btnVoltarPrincipal.addEventListener("click", () => {
    mostrarTela(telaPrincipal);
});

btnVoltarPrincipal2.addEventListener("click", () => {
    mostrarTela(telaPrincipal);
});

// Função para criar uma reunião
formReuniao.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = dataInput.value;
    const hora = horaInput.value;
    const titulo = tituloInput.value;
    const participantes = participantesInput.value.split(",");

    // Criar o link do Google Meet (usando uma API)
    const linkReuniao = `https://meet.google.com/new?${new Date(data + "T" + hora).toISOString()}&title=${titulo}&participants=${participantes.join(",")}`;

    // Adicionar a reunião à lista
    const novaReuniao = {
        data: data,
        hora: hora,
        titulo: titulo,
        participantes: participantes,
        link: linkReuniao
    };
    reunioesMarcadas.push(novaReuniao);

    // Atualizar a lista de reuniões
    exibirReunioes();

    // Limpar o formulário
    formReuniao.reset();

    // Voltar para a tela principal
    mostrarTela(telaPrincipal);
});

// Função para exibir as reuniões marcadas
function exibirReunioes() {
    listaReunioes.innerHTML = '';

    reunioesMarcadas.forEach(reuniao => {
        const itemReuniao = document.createElement("li");
        itemReuniao.innerHTML = `
            <h3>${reuniao.titulo}</h3>
            <p>Data: ${reuniao.data}</p>
            <p>Hora: ${reuniao.hora}</p>
            <p>Participantes: ${reuniao.participantes.join(", ")}</p>
            <a href="${reuniao.link}" target="_blank">Link da Reunião</a>
            <button class="excluir" data-id="${reunioesMarcadas.indexOf(reuniao)}">Cancelar</button>
        `;

        listaReunioes.appendChild(itemReuniao);

        // Adiciona evento de clique para o botão "Cancelar"
        const botaoExcluir = itemReuniao.querySelector(".excluir");
        botaoExcluir.addEventListener("click", () => {
            const id = parseInt(botaoExcluir.dataset.id);
            cancelarReuniao(id);
        });
    });
}

// Função para cancelar uma reunião
function cancelarReuniao(id) {
    reunioesMarcadas.splice(id, 1);
    exibirReunioes();
}

// Lista de reuniões marcadas (inicialmente vazia)
let reunioesMarcadas = [];

// Mostrar a tela principal ao carregar a página
mostrarTela(telaPrincipal);
