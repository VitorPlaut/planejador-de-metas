# 💰 Planejador de Metas

Aplicação web desenvolvida para ajudar no planejamento financeiro pessoal.

O **Planejador de Metas** permite informar uma meta financeira, definir quanto será guardado por mês e escolher o mês e o ano de início. A aplicação calcula automaticamente quanto tempo será necessário para atingir o objetivo e apresenta a evolução da economia.

Além disso, é possível salvar metas no navegador, visualizar um gráfico de progresso e exportar o planejamento completo para uma planilha Excel.

---

## 🚀 Demonstração

🌐 **Acesse o projeto:**
https://vitorplaut.github.io/planejador-de-metas/

---

## 📸 Preview

![Preview do Planejador de Metas](assets/print.png)

---

## ✨ Funcionalidades

* 🎯 Definição de uma meta financeira
* 💰 Definição do valor que será guardado por mês
* 📅 Escolha do mês e ano de início
* 📊 Cálculo automático do tempo necessário para atingir a meta
* 📈 Gráfico de evolução da economia
* 📋 Visualização do valor acumulado mês a mês
* 💾 Salvamento de metas no navegador
* 🔄 Carregamento de metas salvas
* 🗑️ Exclusão de metas
* 📥 Exportação do planejamento para Excel
* 🌙 Tema escuro
* ☀️ Tema claro
* 📱 Layout responsivo para celular, tablet e computador

---

## 📊 Informações apresentadas

Após calcular uma meta, o sistema apresenta:

| Informação   | Descrição                             |
| ------------ | ------------------------------------- |
| 💰 Meta      | Valor total que deseja alcançar       |
| 💵 Por mês   | Valor que será guardado mensalmente   |
| 📅 Tempo     | Quantidade de meses necessária        |
| 🏁 Previsão  | Mês e ano em que a meta será atingida |
| 📈 Progresso | Evolução do planejamento              |
| 📊 Gráfico   | Crescimento do valor acumulado        |

---

## 📥 Exportação para Excel

O projeto utiliza a biblioteca **SheetJS** para gerar uma planilha `.xlsx` diretamente no navegador.

A planilha contém:

* Mês
* Valor do depósito
* Total acumulado
* Valor restante
* Status da meta

Exemplo:

| Mês           |  Depósito |   Acumulado |        Falta | Status    |
| ------------- | --------: | ----------: | -----------: | --------- |
| Agosto 2026   | R$ 400,00 |   R$ 400,00 | R$ 19.600,00 | Guardando |
| Setembro 2026 | R$ 400,00 |   R$ 800,00 | R$ 19.200,00 | Guardando |
| Outubro 2026  | R$ 400,00 | R$ 1.200,00 | R$ 18.800,00 | Guardando |

---

## 💡 Exemplo de uso

Imagine uma pessoa que deseja comprar uma moto:

**Meta:** R$ 20.000
**Valor mensal:** R$ 400
**Início:** Agosto de 2026

Resultado:

**50 meses** para atingir a meta.

O sistema calcula automaticamente cada mês até chegar aos R$ 20.000.

---

## 🛠️ Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Chart.js
* SheetJS
* LocalStorage
* Git
* GitHub Pages

---

## 📁 Estrutura do projeto

```text
planejador-de-metas/
│
├── index.html
├── style.css
├── script.js
├── assets/
│   └── print.png
│
└── README.md
```

---

## 🧠 O que pratiquei neste projeto

Este projeto foi desenvolvido para colocar em prática conceitos de desenvolvimento web, como:

* Manipulação do DOM
* Eventos em JavaScript
* Funções
* Arrays e objetos
* Estruturas de repetição
* Validação de dados
* `localStorage`
* Geração de arquivos Excel
* Criação de gráficos
* Responsividade com CSS
* Organização de arquivos
* Git e GitHub
* Deploy utilizando GitHub Pages

---

## 🔮 Próximas melhorias

* [ ] Adicionar diferentes valores de depósito por mês
* [ ] Permitir adicionar dinheiro extra em determinados meses
* [ ] Adicionar cálculo de rendimento de investimentos
* [ ] Criar simulação de financiamento
* [ ] Adicionar comparação entre guardar dinheiro e financiar
* [ ] Criar histórico de depósitos
* [ ] Adicionar diferentes tipos de gráficos
* [ ] Criar categorias para as metas
* [ ] Melhorar a exportação para Excel
* [ ] Criar uma versão com banco de dados
* [ ] Criar sistema de login para sincronizar metas

---

## 📚 Como executar localmente

Clone o repositório:

```bash
git clone https://github.com/VitorPlaut/planejador-de-metas.git
```

Entre na pasta:

```bash
cd planejador-de-metas
```

Depois abra o arquivo:

```text
index.html
```

Você também pode utilizar a extensão **Live Server** no VS Code para executar o projeto localmente.

---

## 🌐 Deploy

O projeto está hospedado gratuitamente utilizando **GitHub Pages**.

Repositório:

https://github.com/VitorPlaut/planejador-de-metas

Site:

https://vitorplaut.github.io/planejador-de-metas/

---

## 🤝 Contribuição

Sugestões e melhorias são bem-vindas.

Caso encontre algum problema ou tenha uma ideia para melhorar o projeto, você pode abrir uma **Issue** ou enviar um **Pull Request**.

---

## 👨‍💻 Desenvolvedor

Desenvolvido por **Vitor Plaut**.

🔗 GitHub:
https://github.com/VitorPlaut

---

⭐ Se você gostou do projeto, considere deixar uma estrela no repositório!
