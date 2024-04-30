'use strict'   

const requisicao = document.getElementById('requisicao')
const mensagens = document.getElementById('mensagens')

requisicao.addEventListener('keyup', function(event){

    if(event.keyCode === 13){

        const requisicaoTexto = requisicao.value

        const divMensagem = document.createElement('div')
        divMensagem.classList.add('mensagem')

        const divEscritor = document.createElement('div')
        divEscritor.classList.add('escritor')

        const imgEscritor = document.createElement('img')
        imgEscritor.src = '../img/image-removebg-preview.png'

        const nomeEscritor = document.createElement('h3')
        nomeEscritor.textContent = 'You'

        const divTexto = document.createElement('div')
    divTexto.classList.add('texto')

    const texto = document.createElement('p')
    texto.textContent = requisicaoTexto

    divTexto.appendChild(texto)
    divEscritor.replaceChildren(imgEscritor, nomeEscritor)
    divMensagem.replaceChildren(divEscritor, divTexto)
    console.log(divMensagem);
    mensagens.appendChild(divMensagem)
    }
})

{/* <div class="mensagem">
                <div class="usuario">
                    <img src="../img/image-removebg-preview.png" alt="">
                    <h3>You</h3>
                </div>
                <div class="texto">
                    <p>Obrigado</p>
                </div>
            </div> */}