'use strict'

async function pegarUsuarios() {
    const endpoint = 'https://back-login.vercel.app/usuarios';
    const usuariosApi = await fetch(endpoint);
    const listaUsuarios = await usuariosApi.json();
    return listaUsuarios;
}

const mensagemError = document.getElementById('mensagemError')
mensagemError.classList.add('sumir')


async function validarUsuario () {

    try {
        
        const listaUsuarios = await pegarUsuarios()

        console.log(listaUsuarios);

        let email = document.getElementById('email').value
        let senha = document.getElementById('senha').value

        listaUsuarios.forEach(usuario => {
        
            if(email == usuario.email && senha == usuario.senha){
                console.log('foi');
                window.location.href = `./chat/chat.html?idUsuario=${usuario.id}`
                mensagemError.classList.remove('aparecer')
                mensagemError.classList.add('sumir')
            } else {
                mensagemError.classList.remove('sumir')
                mensagemError.classList.add('aparecer')
            }
        });
    } catch (error) {
        alert('A aplicação esta com um erro - Contate o ADMIN')
    }
}
  