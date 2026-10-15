/* =========================
   ANIMAIS DO QUIZ
========================= */

const animais = [

    {
        nome: "Veado campeiro",
        imagem: "IMG/Veado-Campeiro.jpg",
        som: "SONS/Veado som.mp3"
    },

    {
        nome: "Tatu bola",
        imagem: "IMG/Tatu-Bola.jpg",
        som: "SONS/Tatu Bola som.mp3"
    },

    {
        nome: "Lobo Guará",
        imagem: "IMG/Lobo-Guará.webp",
        som: "SONS/Lobo Guara som.mp3"
    },

    {
        nome: "Sabiá do campo",
        imagem: "IMG/Sabia-do-Campo.jpg",
        som: "SONS/Sabia do Campo som.mp3"
    },

    {
        nome: "Ema",
        imagem: "IMG/Ema.jpg",
        som: "SONS/Ema som.mp3"
    },

    {
        nome: "Jararaca",
        imagem: "IMG/Jararaca.jpg",
        som: "SONS/Jararaca Som.mp3"
    }

];


/* =========================
   VARIÁVEIS
========================= */

let perguntaAtual = 0;

let pontos = 0;

let respondeu = false;


/* =========================
   ELEMENTOS DO HTML
========================= */

const telaInicial =
    document.getElementById("tela-inicial");

const telaQuiz =
    document.getElementById("tela-quiz");

const telaFinal =
    document.getElementById("tela-final");

const botaoIniciar =
    document.getElementById("botao-iniciar");

const botaoSom =
    document.getElementById("botao-som");

const botaoProximo =
    document.getElementById("botao-proximo");

const botaoReiniciar =
    document.getElementById("botao-reiniciar");

const audio =
    document.getElementById("audio-animal");

const opcoes =
    document.getElementById("opcoes");

const resultado =
    document.getElementById("resultado");

const numeroPergunta =
    document.getElementById("numero-pergunta");

const pontuacao =
    document.getElementById("pontuacao");

const barraProgresso =
    document.getElementById("barra-progresso");

const statusSom =
    document.getElementById("status-som");

const pontuacaoFinal =
    document.getElementById("pontuacao-final");

const mensagemFinal =
    document.getElementById("mensagem-final");


/* =========================
   INICIAR QUIZ
========================= */

botaoIniciar.addEventListener("click", function () {

    telaInicial.classList.remove("ativa");

    telaQuiz.classList.add("ativa");

    perguntaAtual = 0;

    pontos = 0;

    carregarPergunta();

});


/* =========================
   CARREGAR PERGUNTA
========================= */

function carregarPergunta() {

    respondeu = false;

    const animalCorreto = animais[perguntaAtual];

    /* Atualiza número da pergunta */

    numeroPergunta.textContent =
        `${perguntaAtual + 1} / ${animais.length}`;


    /* Atualiza pontuação */

    pontuacao.textContent =
        `Pontos: ${pontos}`;


    /* Atualiza barra */

    const progresso =
        ((perguntaAtual + 1) / animais.length) * 100;

    barraProgresso.style.width =
        `${progresso}%`;


    /* Configura áudio */

    audio.src = animalCorreto.som;

    audio.load();


    statusSom.textContent =
        "Clique para ouvir o som";


    botaoSom.textContent =
        "▶ OUVIR SOM";


    /* Limpa resultado */

    resultado.textContent = "";

    resultado.className = "resultado";


    /* Esconde botão próximo */

    botaoProximo.style.display = "none";


    /* Cria opções */

    criarOpcoes(animalCorreto);

}


/* =========================
   CRIAR OPÇÕES
========================= */

function criarOpcoes(animalCorreto) {

    opcoes.innerHTML = "";

    /*
       Cria uma cópia dos animais
       para poder embaralhar.
    */

    let alternativas = [...animais];


    alternativas.sort(() => Math.random() - 0.5);


    alternativas.forEach(function (animal) {

        const botao =
            document.createElement("button");

        botao.classList.add("opcao");


        /* Imagem */

        const imagem =
            document.createElement("img");

        imagem.src = animal.imagem;

        imagem.alt = animal.nome;


        /* Nome */

        const nome =
            document.createElement("span");

        nome.textContent =
            animal.nome;


        /* Coloca imagem e nome */

        botao.appendChild(imagem);

        botao.appendChild(nome);


        /* Clique */

        botao.addEventListener("click", function () {

            verificarResposta(
                animal,
                botao,
                animalCorreto
            );

        });


        opcoes.appendChild(botao);

    });

}


/* =========================
   OUVIR SOM
========================= */

botaoSom.addEventListener("click", function () {

    if (audio.paused) {

        audio.play();

        botaoSom.textContent =
            "⏸ PAUSAR SOM";

        statusSom.textContent =
            "O som está tocando...";

    } else {

        audio.pause();

        botaoSom.textContent =
            "▶ OUVIR SOM";

        statusSom.textContent =
            "Som pausado";

    }

});


/* Quando o áudio terminar */

audio.addEventListener("ended", function () {

    botaoSom.textContent =
        "▶ OUVIR SOM";

    statusSom.textContent =
        "Clique para ouvir novamente";

});


/* =========================
   VERIFICAR RESPOSTA
========================= */

function verificarResposta(
    animalEscolhido,
    botaoEscolhido,
    animalCorreto
) {

    if (respondeu) {
        return;
    }


    respondeu = true;


    /* Desabilita todas as opções */

    const todosBotoes =
        document.querySelectorAll(".opcao");


    todosBotoes.forEach(function (botao) {

        botao.disabled = true;

    });


    /* Verifica se acertou */

    if (
        animalEscolhido.nome ===
        animalCorreto.nome
    ) {

        pontos++;


        botaoEscolhido.classList.add(
            "correta"
        );


        resultado.textContent =
            "✅ Muito bem! Você acertou!";


        resultado.classList.add(
            "certo"
        );

    } else {

        botaoEscolhido.classList.add(
            "errada"
        );


        /* Procura o botão da resposta correta */

        todosBotoes.forEach(function (botao) {

            const nome =
                botao.querySelector("span").textContent;


            if (
                nome === animalCorreto.nome
            ) {

                botao.classList.add(
                    "correta"
                );

            }

        });


        resultado.textContent =
            `❌ Errou! Era o ${animalCorreto.nome}.`;


        resultado.classList.add(
            "errado"
        );

    }


    /* Atualiza pontuação */

    pontuacao.textContent =
        `Pontos: ${pontos}`;


    /* Mostra botão próximo */

    botaoProximo.style.display =
        "inline-block";

}


/* =========================
   PRÓXIMA PERGUNTA
========================= */

botaoProximo.addEventListener("click", function () {

    perguntaAtual++;


    if (
        perguntaAtual >= animais.length
    ) {

        mostrarResultadoFinal();

    } else {

        carregarPergunta();

    }

});


/* =========================
   RESULTADO FINAL
========================= */

function mostrarResultadoFinal() {

    telaQuiz.classList.remove("ativa");

    telaFinal.classList.add("ativa");


    pontuacaoFinal.textContent =
        `${pontos} / ${animais.length}`;


    /* Mensagens diferentes */

    if (pontos === animais.length) {

        mensagemFinal.textContent =
            "🌟 Perfeito! Você conhece muito bem os animais do Pampa!";

    } else if (pontos >= 4) {

        mensagemFinal.textContent =
            "🌿 Muito bom! Você conhece bastante sobre a fauna do Pampa.";

    } else if (pontos >= 2) {

        mensagemFinal.textContent =
            "🐾 Bom trabalho! Você já conhece alguns animais do Pampa.";

    } else {

        mensagemFinal.textContent =
            "🌾 Continue aprendendo sobre a incrível fauna do Pampa!";

    }

}


/* =========================
   REINICIAR
========================= */

botaoReiniciar.addEventListener("click", function () {

    telaFinal.classList.remove("ativa");

    telaQuiz.classList.add("ativa");


    perguntaAtual = 0;

    pontos = 0;


    carregarPergunta();

});