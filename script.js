const atividades = {
    ensino: [
        { nome: "Estágio Extracurricular", aproveitamento: 0.7, limite: 40 },
        { nome: "Monitoria", aproveitamento: 0.7, limite: 40 },
        { nome: "Concursos e campeonatos de atividades acadêmicas", aproveitamento: 0.7, limite: 50 },
        { nome: "Presença comprovada a defesas de TCC", aproveitamento: 0.5, limite: 3 },
        { nome: "Cursos Profissionalizantes Específicos na área", aproveitamento: 0.8, limite: 40 },
        { nome: "Cursos Profissionalizantes em geral", aproveitamento: 0.2, limite: 10 }
    ],
    extensao: [
        { nome: "Projeto de extensão", aproveitamento: 0.1, limite: 40 },
        { nome: "Atividades culturais", aproveitamento: 0.8, limite: 5 },
        { nome: "Visitas Técnicas", aproveitamento: 1.0, limite: 40 },
        { nome: "Visitas a Feiras e Exposições", aproveitamento: 0.2, limite: 5 },
        { nome: "Cursos de Idiomas", aproveitamento: 0.6, limite: 20 },
        { nome: "Palestras, Seminários e Congressos Extensionistas (ouvinte)", aproveitamento: 0.8, limite: 10 },
        { nome: "Palestras, Seminários e Congressos Extensionistas (apresentador)", aproveitamento: 1.0, limite: 15 },
        { nome: "Projeto Empresa Júnior", aproveitamento: 0.2, limite: 20 }
    ],
    pesquisa: [
        { nome: "Iniciação Científica", aproveitamento: 0.8, limite: 40 },
        { nome: "Publicação de artigos em periódicos científicos", aproveitamento: 1.0, limite: 10 },
        { nome: "Publicação de artigos completos em anais de congressos", aproveitamento: 1.0, limite: 7 },
        { nome: "Publicação de capítulo de livro", aproveitamento: 1.0, limite: 7 },
        { nome: "Publicação de resumos de artigos em anais", aproveitamento: 1.0, limite: 5 },
        { nome: "Registro de patentes como auto/coautor", aproveitamento: 1.0, limite: 40 },
        { nome: "Premiação resultante de pesquisa científica", aproveitamento: 1.0, limite: 10 },
        { nome: "Colaborador em atividades como Seminários e Congressos", aproveitamento: 1.0, limite: 10 },
        { nome: "Palestras, Seminários e Congressos de Pesquisa (ouvinte)", aproveitamento: 0.8, limite: 10 },
        { nome: "Palestras, Seminários e Congressos de Pesquisa (apresentador)", aproveitamento: 1.0, limite: 15 }
    ]
};

// Variáveis globais para armazenar os dados
let totalHorasPorCategoria = { ensino: 0, extensao: 0, pesquisa: 0 };
let totalHorasPorTipoAtividade = {}; // Armazena o total de horas por tipo de atividade

// Função para inicializar o objeto de horas por tipo de atividade
function inicializarHorasPorTipoAtividade() {
    for (const categoria in atividades) {
        totalHorasPorTipoAtividade[categoria] = {};
        atividades[categoria].forEach(ativ => {
            totalHorasPorTipoAtividade[categoria][ativ.nome] = 0;
        });
    }
}
inicializarHorasPorTipoAtividade();

// Função para carregar tipos de atividade dinamicamente
function carregarTiposAtividade(categoria) {
    const tipoAtividadeSelect = document.getElementById('tipoAtividade');
    tipoAtividadeSelect.innerHTML = ''; // Limpa opções anteriores

    // Adiciona uma opção padrão para melhor UX
    const optionPadrao = document.createElement('option');
    optionPadrao.value = '';
    optionPadrao.textContent = '-- Selecione uma atividade --';
    tipoAtividadeSelect.appendChild(optionPadrao);

    // Verifica se a categoria existe no objeto `atividades`
    if (!atividades[categoria]) {
        console.error(`Categoria "${categoria}" não encontrada.`);
        return;
    }

    // Adiciona as opções de tipo de atividade
    atividades[categoria].forEach(atividade => {
        const option = document.createElement('option');
        option.value = atividade.nome; // Valor do option
        option.textContent = atividade.nome; // Texto visível
        tipoAtividadeSelect.appendChild(option); // Adiciona ao select
    });
}

// Evento para carregar tipos de atividade ao selecionar a categoria
document.addEventListener('DOMContentLoaded', function () {
    const categoriaSelect = document.getElementById('categoria');
    const tipoAtividadeSelect = document.getElementById('tipoAtividade');

    // Carrega tipos de atividade quando a página é carregada
    carregarTiposAtividade(categoriaSelect.value);

    // Adiciona um listener para o evento 'change' no campo de categoria
    categoriaSelect.addEventListener('change', function () {
        const categoriaSelecionada = this.value; // Pega o valor selecionado
        carregarTiposAtividade(categoriaSelecionada); // Carrega os tipos de atividade
    });
});

// Função para adicionar atividade
function adicionarAtividade() {
    const descricao = document.getElementById('descricao').value;
    const categoria = document.getElementById('categoria').value;
    const tipoAtividade = document.getElementById('tipoAtividade').value;
    const horasDedicadas = parseFloat(document.getElementById('horasDedicadas').value);

    // Validação dos campos
    if (!descricao || !categoria || !tipoAtividade || isNaN(horasDedicadas)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    // Encontra a atividade correspondente
    const atividadeSelecionada = atividades[categoria].find(ativ => ativ.nome === tipoAtividade);

    if (!atividadeSelecionada) {
        alert('Tipo de atividade inválido!');
        return;
    }

    // Calcula horas aproveitadas
    const horasAproveitadas = Math.min(horasDedicadas * atividadeSelecionada.aproveitamento, atividadeSelecionada.limite);

    // Verifica se o limite de horas para o tipo de atividade já foi atingido
    if (totalHorasPorTipoAtividade[categoria][tipoAtividade] >= atividadeSelecionada.limite) {
        alert(`Limite máximo de ${atividadeSelecionada.limite} horas para "${tipoAtividade}" já foi atingido.`);
        return;
    }

    // Calcula o saldo restante para o tipo de atividade
    const saldoRestante = atividadeSelecionada.limite - totalHorasPorTipoAtividade[categoria][tipoAtividade];
    const horasAproveitadasFinais = Math.min(horasAproveitadas, saldoRestante);

    // Atualiza total de horas por categoria
    if (totalHorasPorCategoria[categoria] + horasAproveitadasFinais > 90) {
        alert(`Limite máximo de 90 horas para a categoria ${categoria} foi atingido.`);
        return;
    }

    totalHorasPorCategoria[categoria] += horasAproveitadasFinais;
    totalHorasPorTipoAtividade[categoria][tipoAtividade] += horasAproveitadasFinais;

    // Adiciona atividade à lista
    const atividadeAdicionada = {
        descricao,
        categoria,
        tipoAtividade,
        horasDedicadas,
        horasAproveitadas: horasAproveitadasFinais
    };

    // Exibe resumo
    exibirResumo();
}

// Função para exibir resumo
function exibirResumo() {
    const resumoDiv = document.getElementById('resumo');
    resumoDiv.innerHTML = '';

    // Exibe todas as atividades adicionadas
    for (const categoria in totalHorasPorTipoAtividade) {
        for (const tipoAtividade in totalHorasPorTipoAtividade[categoria]) {
            const horas = totalHorasPorTipoAtividade[categoria][tipoAtividade];
            if (horas > 0) {
                const p = document.createElement('p');
                p.textContent = `${tipoAtividade} (${categoria}): ${horas.toFixed(2)} horas aproveitadas`;
                resumoDiv.appendChild(p);
            }
        }
    }

    // Exibe total por categoria
    for (const [categoria, total] of Object.entries(totalHorasPorCategoria)) {
        const p = document.createElement('p');
        p.textContent = `Total em ${categoria}: ${total.toFixed(2)} horas`;
        resumoDiv.appendChild(p);
    }
}