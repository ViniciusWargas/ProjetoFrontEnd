const formulario = document.getElementById("form-contato");

if (formulario) {
    const mensagemStatus = document.getElementById("mensagem-status");
    const botaoHistorico = document.getElementById("botao-historico");
    const botaoLimpar = document.getElementById("botao-limpar");
    const listaMensagens = document.getElementById("lista-mensagens");

    let mensagensSalvas = [];

    try {
        const dadosSalvos = localStorage.getItem("mensagensContato");
        const dados = JSON.parse(dadosSalvos);

        if (Array.isArray(dados)) {
            mensagensSalvas = dados;
        }
    } catch (erro) {
        mensagemStatus.textContent = "Não foi possível carregar as mensagens.";
    }

    function atualizarHistorico() {
        listaMensagens.replaceChildren();

        if (mensagensSalvas.length === 0) {
            const aviso = document.createElement("p");
            aviso.textContent = "Nenhuma mensagem cadastrada.";
            listaMensagens.appendChild(aviso);
            return;
        }

        for (let i = 0; i < mensagensSalvas.length; i++) {
            const mensagem = mensagensSalvas[i];

            const card = document.createElement("article");
            card.classList.add("card-mensagem");

            const titulo = document.createElement("h3");
            titulo.textContent = mensagem.assunto;

            const nome = document.createElement("p");
            nome.textContent = "Nome: " + mensagem.nome;

            const email = document.createElement("p");
            email.textContent = "E-mail: " + mensagem.email;

            const motivo = document.createElement("p");
            motivo.textContent = "Motivo: " + mensagem.motivo;

            const texto = document.createElement("p");
            texto.textContent = "Mensagem: " + mensagem.mensagem;

            const data = document.createElement("p");
            data.textContent = "Data: " + mensagem.data;

            card.appendChild(titulo);
            card.appendChild(nome);
            card.appendChild(email);
            card.appendChild(motivo);
            card.appendChild(texto);
            card.appendChild(data);

            listaMensagens.appendChild(card);
        }
    }

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const assunto = document.getElementById("assunto").value.trim();
        const motivo = document.getElementById("motivo").value;
        const mensagem = document.getElementById("mensagem").value.trim();

        if (
            nome === "" ||
            email === "" ||
            assunto === "" ||
            motivo === "" ||
            mensagem === ""
        ) {
            mensagemStatus.textContent = "Preencha todos os campos.";
            return;
        }

        const novaMensagem = {
            nome: nome,
            email: email,
            assunto: assunto,
            motivo: motivo,
            mensagem: mensagem,
            data: new Date().toLocaleString("pt-BR")
        };

        mensagensSalvas.push(novaMensagem);

        try {
            localStorage.setItem(
                "mensagensContato",
                JSON.stringify(mensagensSalvas)
            );

            mensagemStatus.textContent =
                "Mensagem salva no navegador com sucesso! Obrigado, " + nome + ".";

            formulario.reset();
            atualizarHistorico();

        } catch (erro) {
            mensagensSalvas.pop();
            mensagemStatus.textContent =
                "Não foi possível salvar a mensagem neste navegador.";
        }
    });

    botaoHistorico.addEventListener("click", function() {
        if (listaMensagens.hidden) {
            atualizarHistorico();

            listaMensagens.hidden = false;
            botaoHistorico.textContent = "Esconder mensagens";
            botaoHistorico.setAttribute("aria-expanded", "true");

        } else {
            listaMensagens.hidden = true;
            botaoHistorico.textContent = "Mostrar mensagens";
            botaoHistorico.setAttribute("aria-expanded", "false");
        }
    });

    botaoLimpar.addEventListener("click", function() {
        try {
            localStorage.removeItem("mensagensContato");
            mensagensSalvas = [];

            atualizarHistorico();

            mensagemStatus.textContent =
                "Histórico de mensagens apagado com sucesso.";

        } catch (erro) {
            mensagemStatus.textContent =
                "Não foi possível apagar o histórico.";
        }
    });
}

const botaoCuriosidade = document.getElementById("botao-curiosidade");
const botaoTodasCuriosidades = document.getElementById("botao-todas-curiosidades");
const textoCuriosidade = document.getElementById("texto-curiosidade");
const listaCuriosidades = document.getElementById("lista-curiosidades");

const curiosidades = [
    "Curitiba foi fundada oficialmente em 29 de março de 1693.",
    "O nome Curitiba tem origem indígena e está relacionado à presença de pinheiros na região.",
    "A imigração europeia teve forte influência na cultura, arquitetura e gastronomia da cidade.",
    "Curitiba se tornou capital do Paraná em 1853.",
    "O planejamento urbano moderno da cidade começou a ganhar força durante o século XX.",
    "O IPPUC foi criado em 1965 para auxiliar no planejamento e desenvolvimento urbano de Curitiba.",
    "O Plano Diretor de 1966 ajudou a organizar o crescimento urbano e o sistema de transporte da cidade.",
    "Os parques e bosques de Curitiba também preservam referências culturais de diferentes grupos de imigrantes."
];

let indiceCuriosidade = 0;

if (botaoCuriosidade && textoCuriosidade) {
    botaoCuriosidade.addEventListener("click", function() {
        textoCuriosidade.textContent = curiosidades[indiceCuriosidade];

        indiceCuriosidade++;

        if (indiceCuriosidade >= curiosidades.length) {
            indiceCuriosidade = 0;
        }
    });
}

if (botaoTodasCuriosidades && listaCuriosidades) {
    botaoTodasCuriosidades.addEventListener("click", function() {
        if (listaCuriosidades.innerHTML === "") {
            const lista = document.createElement("ul");

            for (let i = 0; i < curiosidades.length; i++) {
                const item = document.createElement("li");

                item.textContent = curiosidades[i];

                lista.appendChild(item);
            }

            listaCuriosidades.appendChild(lista);

            botaoTodasCuriosidades.textContent = "Esconder curiosidades";
        } else {
            listaCuriosidades.innerHTML = "";

            botaoTodasCuriosidades.textContent = "Mostrar todas";
        }
    });
}

const botoesGastronomia = document.querySelectorAll(".filtro-gastronomia");
const cardsGastronomia = document.querySelectorAll(".card-filtravel");
const resultadoGastronomia = document.getElementById("resultado-gastronomia");

if (botoesGastronomia.length > 0 && resultadoGastronomia) {

    botoesGastronomia.forEach(function(botao) {

        botao.addEventListener("click", function() {

            const categoriaSelecionada = botao.dataset.categoria;
            let quantidade = 0;

            cardsGastronomia.forEach(function(card) {

                if (
                    categoriaSelecionada === "todos" ||
                    card.dataset.categoria === categoriaSelecionada
                ) {
                    card.classList.remove("d-none");
                    quantidade++;
                } else {
                    card.classList.add("d-none");
                }

            });

            botoesGastronomia.forEach(function(outroBotao) {

                outroBotao.classList.remove("btn-success", "ativo");
                outroBotao.classList.add("btn-outline-success");
                outroBotao.setAttribute("aria-pressed", "false");

            });

            botao.classList.remove("btn-outline-success");
            botao.classList.add("btn-success", "ativo");
            botao.setAttribute("aria-pressed", "true");

            resultadoGastronomia.textContent =
                "Exibindo " + quantidade +
                (quantidade === 1 ? " prato." : " pratos.");

        });

    });

}

const botoesFavoritos = document.querySelectorAll(".botao-favorito");
const listaFavoritos = document.getElementById("lista-favoritos");
const quantidadeFavoritos = document.getElementById("quantidade-favoritos");
const botaoLimparFavoritos = document.getElementById("limpar-favoritos");
const statusFavoritos = document.getElementById("status-favoritos");

if (listaFavoritos && quantidadeFavoritos && botaoLimparFavoritos) {

    const museus = [
        { id: "mon", nome: "Museu Oscar Niemeyer" },
        { id: "mupa", nome: "Museu Paranaense" },
        { id: "mis", nome: "Museu da Imagem e do Som" },
        { id: "holocausto", nome: "Museu do Holocausto de Curitiba" }
    ];

    let favoritos = [];

    try {
        const dados = JSON.parse(localStorage.getItem("museusFavoritos"));

        if (Array.isArray(dados)) {
            favoritos = dados.filter(function(id) {
                return museus.some(function(museu) {
                    return museu.id === id;
                });
            });
        }
    } catch (erro) {
        statusFavoritos.textContent = "Não foi possível carregar os favoritos.";
    }

    function atualizarFavoritos() {
        listaFavoritos.replaceChildren();

        for (let i = 0; i < museus.length; i++) {
            const museu = museus[i];

            if (favoritos.includes(museu.id)) {
                const item = document.createElement("div");

                item.classList.add("item-favorito");
                item.textContent = museu.nome;

                listaFavoritos.appendChild(item);
            }
        }

        quantidadeFavoritos.textContent =
            "Você possui " + favoritos.length +
            (favoritos.length === 1 ? " museu favorito." : " museus favoritos.");

        if (favoritos.length === 0) {
            const aviso = document.createElement("p");
            aviso.textContent = "Nenhum museu favoritado ainda.";
            listaFavoritos.appendChild(aviso);
        }

        botaoLimparFavoritos.disabled = favoritos.length === 0;

        botoesFavoritos.forEach(function(botao) {
            const favoritado = favoritos.includes(botao.dataset.id);

            botao.textContent = favoritado
                ? "Remover dos favoritos"
                : "Adicionar aos favoritos";

            botao.classList.toggle("favoritado", favoritado);
            botao.setAttribute("aria-pressed", String(favoritado));
        });
    }

    function salvarFavoritos(novosFavoritos) {
        try {
            localStorage.setItem(
                "museusFavoritos",
                JSON.stringify(novosFavoritos)
            );

            favoritos = novosFavoritos;
            statusFavoritos.textContent = "";
            atualizarFavoritos();

        } catch (erro) {
            statusFavoritos.textContent =
                "Não foi possível salvar os favoritos neste navegador.";
        }
    }

    botoesFavoritos.forEach(function(botao) {
        botao.addEventListener("click", function() {
            const id = botao.dataset.id;
            let novosFavoritos;

            if (favoritos.includes(id)) {
                novosFavoritos = favoritos.filter(function(item) {
                    return item !== id;
                });
            } else {
                novosFavoritos = [...favoritos, id];
            }

            salvarFavoritos(novosFavoritos);
        });
    });

    botaoLimparFavoritos.addEventListener("click", function() {
        salvarFavoritos([]);
    });

    atualizarFavoritos();
}

const botoesFiltroEventos = document.querySelectorAll(".filtro-evento");
const cardsEventos = document.querySelectorAll(".card-evento");
const resultadoEventos = document.getElementById("resultado-eventos");

if (botoesFiltroEventos.length > 0 && resultadoEventos) {

    botoesFiltroEventos.forEach(function(botao) {

        botao.addEventListener("click", function() {

            const categoriaSelecionada = botao.dataset.categoria;
            let quantidade = 0;

            cardsEventos.forEach(function(card) {

                if (
                    categoriaSelecionada === "todos" ||
                    card.dataset.categoria === categoriaSelecionada
                ) {
                    card.hidden = false;
                    quantidade++;
                } else {
                    card.hidden = true;
                }

            });

            botoesFiltroEventos.forEach(function(outroBotao) {
                outroBotao.classList.remove("ativo");
                outroBotao.setAttribute("aria-pressed", "false");
            });

            botao.classList.add("ativo");
            botao.setAttribute("aria-pressed", "true");

            resultadoEventos.textContent =
                "Exibindo " + quantidade +
                (quantidade === 1 ? " evento." : " eventos.");

        });

    });

}

const botoesInteresse = document.querySelectorAll(".botao-interesse");
const listaInteresses = document.getElementById("lista-interesses");
const quantidadeInteresses = document.getElementById("quantidade-interesses");
const botaoLimparInteresses = document.getElementById("limpar-interesses");
const statusInteresses = document.getElementById("status-interesses");

if (listaInteresses && quantidadeInteresses && botaoLimparInteresses) {

    const eventos = [
        { id: "largo", nome: "Feira do Largo da Ordem" },
        { id: "teatro", nome: "Festival de Teatro de Curitiba" },
        { id: "exposicoes", nome: "Exposições no Museu Oscar Niemeyer" },
        { id: "jardim", nome: "Passeios culturais no Jardim Botânico" },
        { id: "natal", nome: "Natal em Curitiba" }
    ];

    let interesses = [];

    try {
        const dados = JSON.parse(localStorage.getItem("eventosInteresse"));

        if (Array.isArray(dados)) {
            interesses = dados.filter(function(id) {
                return eventos.some(function(evento) {
                    return evento.id === id;
                });
            });
        }
    } catch (erro) {
        statusInteresses.textContent = "Não foi possível carregar sua agenda.";
    }

    function atualizarInteresses() {
        listaInteresses.replaceChildren();

        for (let i = 0; i < eventos.length; i++) {
            const evento = eventos[i];

            if (interesses.includes(evento.id)) {
                const item = document.createElement("div");

                item.classList.add("item-interesse");
                item.textContent = evento.nome;

                listaInteresses.appendChild(item);
            }
        }

        quantidadeInteresses.textContent =
            "Você marcou " + interesses.length +
            (interesses.length === 1 ? " evento." : " eventos.");

        if (interesses.length === 0) {
            const aviso = document.createElement("p");
            aviso.textContent = "Nenhum evento marcado ainda.";
            listaInteresses.appendChild(aviso);
        }

        botaoLimparInteresses.disabled = interesses.length === 0;

        botoesInteresse.forEach(function(botao) {
            const marcado = interesses.includes(botao.dataset.id);

            botao.textContent = marcado
                ? "Remover da agenda"
                : "Tenho interesse";

            botao.classList.toggle("marcado", marcado);
            botao.setAttribute("aria-pressed", String(marcado));
        });
    }

    function salvarInteresses(novosInteresses) {
        try {
            localStorage.setItem(
                "eventosInteresse",
                JSON.stringify(novosInteresses)
            );

            interesses = novosInteresses;
            statusInteresses.textContent = "";
            atualizarInteresses();

        } catch (erro) {
            statusInteresses.textContent =
                "Não foi possível salvar a agenda neste navegador.";
        }
    }

    botoesInteresse.forEach(function(botao) {
        botao.addEventListener("click", function() {
            const id = botao.dataset.id;
            let novosInteresses;

            if (interesses.includes(id)) {
                novosInteresses = interesses.filter(function(item) {
                    return item !== id;
                });
            } else {
                novosInteresses = [...interesses, id];
            }

            salvarInteresses(novosInteresses);
        });
    });

    botaoLimparInteresses.addEventListener("click", function() {
        salvarInteresses([]);
    });

    atualizarInteresses();
}
