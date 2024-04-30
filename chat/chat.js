'use strict';

const requisicao = document.getElementById('requisicao');
const mensagens = document.getElementById('mensagens');
const idUsuario = new URLSearchParams(window.location.search).get('idUsuario');

console.log(idUsuario);
descobrirNomeUsuario(idUsuario)



requisicao.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        const requisicaoTexto = requisicao.value;

        if (requisicaoTexto !== '') {
            consultaGemini(requisicaoTexto)
            adicionarMensagem('You', requisicaoTexto);
            requisicao.value = '';
        } else {
            requisicao.value = ''
        }
    }
});

async function descobrirNomeUsuario(idUsuario) {

    const listausuarios = await pegarUsuarios()

    listausuarios.forEach(usuario => {
        if(usuario.id == idUsuario) {
            const nomeUsuario = usuario.nome
            colocarNomeUsuario(nomeUsuario)
        }
    });
}

function colocarNomeUsuario(nome){
    const nomeUsuario = document.getElementById('nomeUsuario')
    nomeUsuario.textContent = nome
}

async function pegarUsuarios() {
    const endpoint = 'https://back-login.vercel.app/usuarios';
    const usuariosApi = await fetch(endpoint);
    const listaUsuarios = await usuariosApi.json();
    return listaUsuarios;
}

function adicionarMensagem(nome, texto) {
    const divMensagem = document.createElement('div');
    divMensagem.classList.add('mensagem');

    const divEscritor = document.createElement('div');
    divEscritor.classList.add('escritor');

    const imgUsuario = document.createElement('img');
    imgUsuario.src = '../img/image-removebg-preview.png';

    const nomeUsuario = document.createElement('h3');
    nomeUsuario.textContent = nome;

    const divTexto = document.createElement('div');
    divTexto.classList.add('texto');

    const pTexto = document.createElement('p');
    pTexto.textContent = texto;

    divEscritor.append(imgUsuario, nomeUsuario);
    divTexto.appendChild(pTexto);
    divMensagem.append(divEscritor, divTexto);

    mensagens.appendChild(divMensagem);

    rolarParaBaixo();
}

function adicionarMensagemIa(texto){
    const divMensagem = document.createElement('div');
    divMensagem.classList.add('mensagem');

    const divEscritor = document.createElement('div');
    divEscritor.classList.add('escritor');

    const imgUsuario = document.createElement('img');
    imgUsuario.src = '../img/Love_Death___Robots-removebg-preview 1.png';

    const nomeUsuario = document.createElement('h3');
    nomeUsuario.textContent = 'Zen-IA';

    const divTexto = document.createElement('div');
    divTexto.classList.add('texto');

    const pTexto = document.createElement('p');
    pTexto.textContent = texto;

    divEscritor.append(imgUsuario, nomeUsuario);
    divTexto.appendChild(pTexto);
    divMensagem.append(divEscritor, divTexto);

    mensagens.appendChild(divMensagem);

    rolarParaBaixo();
}

function ajustarTamanho() {
    const textarea = document.getElementById('requisicao');

    textarea.style.height = '';
    const altura = textarea.scrollHeight;

    textarea.style.height = altura + 'px';
}


function rolarParaBaixo() {
    mensagens.scrollTop = mensagens.scrollHeight;
}

const consultaGemini = (question) => {

    const keyGoogle = 'AIzaSyBZaybh57iVi23jcLvzuIrabNG4f3td60A'

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + keyGoogle;

    const requestData = {
        contents: [
            {
                parts: [
                    {
                        text: `${question}`
                    }
                ]
            }
        ]
    }

    const requestOptions = {

        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    }

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
        const responseTextIa = data.candidates[0].content.parts[0].text;
        respostaIa(responseTextIa);
    })
    
    
    .catch(error => console.error('Error: ', error))

}


const respostaIa = (responseTextIa) => {

    const textIa = responseTextIa
    const textoFormatado = textIa.replace(/\*/g, '\n');
    console.log(textoFormatado);
    adicionarMensagemIa(textoFormatado)
    
    // const textAreaPt = document.getElementById('textoIa')
    // textAreaPt.value = responseTextIa
}

ajustarTamanho();
