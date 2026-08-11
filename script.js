// ==========================================
// PLANEJADOR DE METAS 2.0
// ==========================================


// ==========================================
// ELEMENTOS
// ==========================================

const metaInput =
    document.getElementById("meta");

const mensalInput =
    document.getElementById("mensal");

const inicioInput =
    document.getElementById("inicio");

const nomeMetaInput =
    document.getElementById("nomeMeta");

const btnCalcular =
    document.getElementById("btnCalcular");

const btnSalvar =
    document.getElementById("btnSalvar");

const btnExcel =
    document.getElementById("btnExcel");

const btnTema =
    document.getElementById("btnTema");

const resultado =
    document.getElementById("resultado");

const listaMetas =
    document.getElementById("listaMetas");


// ==========================================
// VARIÁVEIS
// ==========================================

let planejamentoAtual = [];

let graficoAtual = null;


// ==========================================
// DATA ATUAL COMO PADRÃO
// ==========================================

const hoje = new Date();

const anoAtual =
    hoje.getFullYear();

const mesAtual =
    String(
        hoje.getMonth() + 1
    ).padStart(2, "0");

inicioInput.value =
    `${anoAtual}-${mesAtual}`;


// ==========================================
// CARREGAR TEMA SALVO
// ==========================================

const temaSalvo =
    localStorage.getItem("temaPlanejador");

if (temaSalvo === "claro") {

    document.body.classList.add("claro");

    btnTema.textContent = "☀️";
}


// ==========================================
// BOTÃO DE TEMA
// ==========================================

btnTema.addEventListener(
    "click",
    alternarTema
);


function alternarTema() {

    document.body.classList.toggle("claro");

    const claro =
        document.body.classList.contains("claro");


    if (claro) {

        btnTema.textContent = "☀️";

        localStorage.setItem(
            "temaPlanejador",
            "claro"
        );

    } else {

        btnTema.textContent = "🌙";

        localStorage.setItem(
            "temaPlanejador",
            "escuro"
        );
    }


    // Atualizar gráfico
    if (planejamentoAtual.length > 0) {

        criarGrafico(
            planejamentoAtual
        );
    }
}


// ==========================================
// BOTÃO CALCULAR
// ==========================================

btnCalcular.addEventListener(
    "click",
    calcularMeta
);


// ==========================================
// CALCULAR META
// ==========================================

function calcularMeta() {

    const meta =
        parseFloat(
            metaInput.value
        );

    const mensal =
        parseFloat(
            mensalInput.value
        );

    const inicio =
        inicioInput.value;


    // ======================================
    // VALIDAÇÕES
    // ======================================

    if (!meta || !mensal || !inicio) {

        alert(
            "Preencha todos os campos!"
        );

        return;
    }


    if (meta <= 0) {

        alert(
            "A meta precisa ser maior que R$ 0."
        );

        return;
    }


    if (mensal <= 0) {

        alert(
            "O valor mensal precisa ser maior que R$ 0."
        );

        return;
    }


    // ======================================
    // DATA INICIAL
    // ======================================

    const partes =
        inicio.split("-");

    const ano =
        Number(partes[0]);

    const mes =
        Number(partes[1]);


    let data =
        new Date(
            ano,
            mes - 1,
            1
        );


    // ======================================
    // PLANEJAMENTO
    // ======================================

    let acumulado = 0;

    let numeroMes = 0;

    planejamentoAtual = [];


    while (acumulado < meta) {

        numeroMes++;


        let deposito =
            mensal;


        // Último depósito

        if (
            acumulado + deposito > meta
        ) {

            deposito =
                meta - acumulado;
        }


        acumulado +=
            deposito;


        // ==================================
        // NOME DO MÊS
        // ==================================

        const nomeMes =
            data.toLocaleDateString(
                "pt-BR",
                {
                    month: "long",
                    year: "numeric"
                }
            );


        // ==================================
        // VALOR QUE FALTA
        // ==================================

        const falta =
            Math.max(
                0,
                meta - acumulado
            );


        // ==================================
        // STATUS
        // ==================================

        const status =
            falta === 0
                ? "Meta atingida"
                : "Guardando";


        // ==================================
        // ADICIONAR AO PLANEJAMENTO
        // ==================================

        planejamentoAtual.push({

            mes: nomeMes,

            deposito: deposito,

            acumulado: acumulado,

            falta: falta,

            status: status

        });


        // Próximo mês

        data.setMonth(
            data.getMonth() + 1
        );


        // Segurança: máximo 20 anos

        if (numeroMes >= 240) {

            break;
        }
    }


    // ======================================
    // DATA FINAL
    // ======================================

    const ultimaLinha =
        planejamentoAtual[
            planejamentoAtual.length - 1
        ];


    const dataFinal =
        new Date(
            ano,
            mes - 1 + numeroMes - 1,
            1
        );


    const dataFinalFormatada =
        dataFinal.toLocaleDateString(
            "pt-BR",
            {
                month: "long",
                year: "numeric"
            }
        );


    // ======================================
    // PREENCHER RESUMO
    // ======================================

    document.getElementById(
        "tituloResultado"
    ).textContent =
        nomeMetaInput.value.trim()
            || "Minha Meta";


    document.getElementById(
        "valorMeta"
    ).textContent =
        formatarMoeda(meta);


    document.getElementById(
        "valorMensal"
    ).textContent =
        formatarMoeda(mensal);


    document.getElementById(
        "tempoMeta"
    ).textContent =
        `${numeroMes} ${
            numeroMes === 1
                ? "mês"
                : "meses"
        }`;


    document.getElementById(
        "dataFinal"
    ).textContent =
        dataFinalFormatada;


    // ======================================
    // BARRA DE PROGRESSO
    // ======================================

    const porcentagem =
        Math.min(
            100,
            (mensal / meta) * 100
        );


    document.getElementById(
        "porcentagem"
    ).textContent =
        `${porcentagem.toFixed(1)}%`;


    document.getElementById(
        "barraProgresso"
    ).style.width =
        `${porcentagem}%`;


    // ======================================
    // MOSTRAR RESULTADO
    // ======================================

    resultado.style.display =
        "block";


    // ======================================
    // CRIAR GRÁFICO
    // ======================================

    criarGrafico(
        planejamentoAtual
    );


    // ======================================
    // ROLAR ATÉ RESULTADO
    // ======================================

    resultado.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });
}


// ==========================================
// FORMATAR MOEDA
// ==========================================

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}


// ==========================================
// CRIAR GRÁFICO
// ==========================================

function criarGrafico(dados) {

    const canvas =
        document.getElementById(
            "grafico"
        );


    // Destruir gráfico anterior

    if (graficoAtual) {

        graficoAtual.destroy();
    }


    const labels =
        dados.map(
            item => item.mes
        );


    const valores =
        dados.map(
            item => item.acumulado
        );


    const meta =
        dados.length > 0
            ? dados[dados.length - 1].acumulado
            : 0;


    const corTexto =
        document.body.classList.contains("claro")
            ? "#475569"
            : "#94a3b8";


    const corGrade =
        document.body.classList.contains("claro")
            ? "#e2e8f0"
            : "#334155";


    graficoAtual =
        new Chart(
            canvas,
            {

                type: "line",

                data: {

                    labels: labels,

                    datasets: [

                        {

                            label:
                                "Total acumulado",

                            data: valores,

                            borderColor:
                                "#38bdf8",

                            backgroundColor:
                                "rgba(56, 189, 248, 0.12)",

                            borderWidth: 3,

                            fill: true,

                            tension: 0.3,

                            pointRadius: 3,

                            pointHoverRadius: 6

                        }

                    ]

                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {

                            labels: {

                                color:
                                    corTexto

                            }

                        }

                    },


                    scales: {

                        x: {

                            ticks: {

                                color:
                                    corTexto,

                                maxTicksLimit: 8

                            },

                            grid: {

                                color:
                                    corGrade

                            }

                        },


                        y: {

                            beginAtZero: true,

                            ticks: {

                                color:
                                    corTexto,

                                callback:
                                    function(valor) {

                                        return formatarMoeda(
                                            valor
                                        );
                                    }

                            },

                            grid: {

                                color:
                                    corGrade

                            }

                        }

                    }

                }

            }
        );
}


// ==========================================
// SALVAR META
// ==========================================

btnSalvar.addEventListener(
    "click",
    salvarMeta
);


function salvarMeta() {

    const meta =
        parseFloat(
            metaInput.value
        );

    const mensal =
        parseFloat(
            mensalInput.value
        );

    const inicio =
        inicioInput.value;

    const nome =
        nomeMetaInput.value.trim()
            || "Minha Meta";


    if (!meta || !mensal || !inicio) {

        alert(
            "Preencha os dados da meta antes de salvar."
        );

        return;
    }


    const metas =
        JSON.parse(
            localStorage.getItem(
                "metasPlanejador"
            )
        ) || [];


    const novaMeta = {

        id:
            Date.now(),

        nome:
            nome,

        meta:
            meta,

        mensal:
            mensal,

        inicio:
            inicio

    };


    metas.push(
        novaMeta
    );


    localStorage.setItem(

        "metasPlanejador",

        JSON.stringify(
            metas
        )

    );


    carregarMetas();


    alert(
        "Meta salva com sucesso! 💾"
    );
}


// ==========================================
// CARREGAR METAS
// ==========================================

function carregarMetas() {

    const metas =
        JSON.parse(
            localStorage.getItem(
                "metasPlanejador"
            )
        ) || [];


    if (metas.length === 0) {

        listaMetas.innerHTML = `

            <div class="sem-metas">

                Você ainda não possui
                metas salvas.

            </div>

        `;

        return;
    }


    listaMetas.innerHTML = "";


    metas.forEach(
        meta => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "meta-item";


            div.innerHTML = `

                <div class="meta-info">

                    <strong>
                        🎯 ${meta.nome}
                    </strong>

                    <span>
                        Meta:
                        ${formatarMoeda(meta.meta)}
                        |
                        Mensal:
                        ${formatarMoeda(meta.mensal)}
                        |
                        Início:
                        ${formatarInicio(meta.inicio)}
                    </span>

                </div>


                <div class="meta-acoes">

                    <button
                        class="btn-carregar"
                        onclick="carregarMeta(${meta.id})"
                    >
                        Abrir
                    </button>

                    <button
                        class="btn-excluir"
                        onclick="excluirMeta(${meta.id})"
                    >
                        Excluir
                    </button>

                </div>

            `;


            listaMetas.appendChild(
                div
            );

        }
    );
}


// ==========================================
// FORMATAR DATA DE INÍCIO
// ==========================================

function formatarInicio(valor) {

    const partes =
        valor.split("-");


    const data =
        new Date(
            Number(partes[0]),
            Number(partes[1]) - 1,
            1
        );


    return data.toLocaleDateString(
        "pt-BR",
        {
            month: "short",
            year: "numeric"
        }
    );
}


// ==========================================
// CARREGAR UMA META
// ==========================================

function carregarMeta(id) {

    const metas =
        JSON.parse(
            localStorage.getItem(
                "metasPlanejador"
            )
        ) || [];


    const meta =
        metas.find(
            item =>
                item.id === id
        );


    if (!meta) {

        return;
    }


    metaInput.value =
        meta.meta;

    mensalInput.value =
        meta.mensal;

    inicioInput.value =
        meta.inicio;

    nomeMetaInput.value =
        meta.nome;


    calcularMeta();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });
}


// ==========================================
// EXCLUIR META
// ==========================================

function excluirMeta(id) {

    const confirmar =
        confirm(
            "Tem certeza que deseja excluir esta meta?"
        );


    if (!confirmar) {

        return;
    }


    let metas =
        JSON.parse(
            localStorage.getItem(
                "metasPlanejador"
            )
        ) || [];


    metas =
        metas.filter(
            item =>
                item.id !== id
        );


    localStorage.setItem(

        "metasPlanejador",

        JSON.stringify(
            metas
        )

    );


    carregarMetas();
}


// ==========================================
// GERAR EXCEL
// ==========================================

btnExcel.addEventListener(
    "click",
    gerarExcel
);


function gerarExcel() {

    if (
        planejamentoAtual.length === 0
    ) {

        alert(
            "Primeiro calcule uma meta."
        );

        return;
    }


    const meta =
        parseFloat(
            metaInput.value
        );


    const nome =
        nomeMetaInput.value.trim()
            || "Minha Meta";


    // ======================================
    // CABEÇALHO
    // ======================================

    const planilha = [

        ["PLANEJADOR DE METAS"],

        [],

        ["Meta", meta],

        [
            "Valor mensal",
            parseFloat(
                mensalInput.value
            )
        ],

        [
            "Nome da meta",
            nome
        ],

        [],

        [
            "Mês",
            "Depósito (R$)",
            "Total acumulado (R$)",
            "Falta (R$)",
            "Status"
        ]

    ];


    // ======================================
    // ADICIONAR DADOS
    // ======================================

    planejamentoAtual.forEach(
        item => {

            planilha.push([

                item.mes,

                item.deposito,

                item.acumulado,

                item.falta,

                item.status

            ]);

        }
    );


    // ======================================
    // CRIAR EXCEL
    // ======================================

    const wb =
        XLSX.utils.book_new();


    const ws =
        XLSX.utils.aoa_to_sheet(
            planilha
        );


    // ======================================
    // LARGURA DAS COLUNAS
    // ======================================

    ws["!cols"] = [

        { wch: 25 },

        { wch: 20 },

        { wch: 25 },

        { wch: 20 },

        { wch: 20 }

    ];


    // ======================================
    // ADICIONAR PLANILHA
    // ======================================

    XLSX.utils.book_append_sheet(

        wb,

        ws,

        "Planejamento"

    );


    // ======================================
    // BAIXAR
    // ======================================

    XLSX.writeFile(

        wb,

        "Minha_Meta.xlsx"

    );
}


// ==========================================
// CARREGAR METAS AO ABRIR O SITE
// ==========================================

carregarMetas();