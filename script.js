// ==========================================
// PLANEJADOR DE METAS
// ==========================================


// Pegar o botão
const btnGerar = document.getElementById("btnGerar");


// Pegar o campo de início
const campoInicio = document.getElementById("inicio");


// ==========================================
// COLOCAR AUTOMATICAMENTE O MÊS E ANO ATUAL
// ==========================================

const hoje = new Date();

const anoAtual = hoje.getFullYear();

const mesAtual = String(
    hoje.getMonth() + 1
).padStart(2, "0");


// Definir o mês atual como padrão

campoInicio.value = `${anoAtual}-${mesAtual}`;


// ==========================================
// QUANDO CLICAR NO BOTÃO
// ==========================================

btnGerar.addEventListener(
    "click",
    gerarPlanilha
);


// ==========================================
// FUNÇÃO PRINCIPAL
// ==========================================

function gerarPlanilha() {

    // Pegar os valores

    const meta = parseFloat(
        document.getElementById("meta").value
    );

    const mensal = parseFloat(
        document.getElementById("mensal").value
    );

    const inicioInput =
        document.getElementById("inicio").value;


    // ==========================================
    // VALIDAR CAMPOS
    // ==========================================

    if (!meta || !mensal || !inicioInput) {

        alert(
            "Preencha todos os campos!"
        );

        return;
    }


    if (meta <= 0) {

        alert(
            "A sua meta precisa ser maior que R$ 0."
        );

        return;
    }


    if (mensal <= 0) {

        alert(
            "O valor mensal precisa ser maior que R$ 0."
        );

        return;
    }


    // ==========================================
    // CRIAR DATA INICIAL
    // ==========================================

    const partes = inicioInput.split("-");

    const ano = Number(partes[0]);

    const mes = Number(partes[1]);


    let data = new Date(
        ano,
        mes - 1,
        1
    );


    // ==========================================
    // VARIÁVEIS
    // ==========================================

    let acumulado = 0;

    let numeroMes = 0;


    // ==========================================
    // CABEÇALHO DA PLANILHA
    // ==========================================

    const planilha = [

        [
            "Mês",
            "Depósito (R$)",
            "Total Acumulado (R$)",
            "Falta (R$)",
            "Status"
        ]

    ];


    // ==========================================
    // CALCULAR OS MESES
    // ==========================================

    while (acumulado < meta) {

        numeroMes++;


        // Valor normal do depósito

        let deposito = mensal;


        // Se o último depósito passar da meta,
        // guardar somente o necessário

        if (
            acumulado + deposito > meta
        ) {

            deposito =
                meta - acumulado;
        }


        // Somar o depósito

        acumulado += deposito;


        // ==========================================
        // NOME DO MÊS EM PORTUGUÊS
        // ==========================================

        const nomeMes =
            data.toLocaleDateString(
                "pt-BR",
                {
                    month: "long",
                    year: "numeric"
                }
            );


        // ==========================================
        // CALCULAR O VALOR QUE FALTA
        // ==========================================

        const falta = Math.max(
            0,
            meta - acumulado
        );


        // ==========================================
        // STATUS
        // ==========================================

        const status =
            falta === 0
                ? "Meta atingida"
                : "Guardando";


        // ==========================================
        // ADICIONAR LINHA NA PLANILHA
        // ==========================================

        planilha.push([

            nomeMes,

            deposito,

            acumulado,

            falta,

            status

        ]);


        // ==========================================
        // IR PARA O PRÓXIMO MÊS
        // ==========================================

        data.setMonth(
            data.getMonth() + 1
        );


        // ==========================================
        // LIMITE DE SEGURANÇA
        // ==========================================

        if (numeroMes >= 120) {

            break;
        }
    }


    // ==========================================
    // CRIAR O ARQUIVO EXCEL
    // ==========================================

    const wb =
        XLSX.utils.book_new();


    const ws =
        XLSX.utils.aoa_to_sheet(
            planilha
        );


    // ==========================================
    // LARGURA DAS COLUNAS
    // ==========================================

    ws["!cols"] = [

        { wch: 22 },

        { wch: 20 },

        { wch: 25 },

        { wch: 18 },

        { wch: 20 }

    ];


    // ==========================================
    // ADICIONAR PLANILHA
    // ==========================================

    XLSX.utils.book_append_sheet(

        wb,

        ws,

        "Planejamento"

    );


    // ==========================================
    // BAIXAR EXCEL
    // ==========================================

    XLSX.writeFile(

        wb,

        "Minha_Meta.xlsx"

    );


    // ==========================================
    // DATA EM QUE A META SERÁ ATINGIDA
    // ==========================================

    const dataFinal = new Date(data);

    dataFinal.setMonth(
        dataFinal.getMonth() - 1
    );


    const dataFinalFormatada =
        dataFinal.toLocaleDateString(
            "pt-BR",
            {
                month: "long",
                year: "numeric"
            }
        );


    // ==========================================
    // MOSTRAR RESULTADO
    // ==========================================

    const resultado =
        document.getElementById(
            "resultado"
        );


    resultado.style.display = "block";


    resultado.innerHTML = `

        ✅ <strong>Planejamento criado!</strong>

        <br><br>

        🎯 Meta:
        <strong>
            R$ ${meta.toLocaleString(
                "pt-BR",
                {
                    minimumFractionDigits: 2
                }
            )}
        </strong>

        <br>

        💰 Valor guardado por mês:
        <strong>
            R$ ${mensal.toLocaleString(
                "pt-BR",
                {
                    minimumFractionDigits: 2
                }
            )}
        </strong>

        <br>

        📅 Início:
        <strong>
            ${data.toLocaleDateString(
                "pt-BR",
                {
                    month: "long",
                    year: "numeric"
                }
            )}
        </strong>

        <br>

        ⏱️ Tempo necessário:
        <strong>
            ${numeroMes} meses
        </strong>

        <br>

        🏁 Meta atingida em:
        <strong>
            ${dataFinalFormatada}
        </strong>

        <br><br>

        📊 A planilha
        <strong>Minha_Meta.xlsx</strong>
        foi baixada no seu computador.

    `;
}