const formulario = document.getElementById("form-contato");

if (formulario) {
    const mensagemStatus = document.getElementById("mensagem-status");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const assunto = document.getElementById("assunto").value;
        const mensagem = document.getElementById("mensagem").value;

        if (
            nome === "" ||
            email === "" ||
            assunto === "" ||
            mensagem === ""
        ) {
            mensagemStatus.textContent = "Preencha todos os campos.";
        } else {
            mensagemStatus.textContent =
                "Mensagem enviada com sucesso! Obrigado pelo contato, " + nome + ".";

            formulario.reset();
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