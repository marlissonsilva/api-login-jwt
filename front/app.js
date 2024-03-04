const url = "http://localhost:3010/"


const registerForm = document.querySelector('[data-js="form-register"]')
const loginForm = document.querySelector('[data-js="form-login"]')
const loginAdminForm = document.querySelector('[data-js="form-login-admin"]')


registerForm.addEventListener('submit', async event => {
    event.preventDefault()
    const user = {
        name: registerForm.name.value,
        email: registerForm.email.value,
        password: registerForm.password.value
    }
    console.log(user)

    try {
        const options = {
            method: "POST",
            headers: new Headers({ "content-type": "application/json", }),
            body: JSON.stringify(user),
        };
        const response = await fetch(`${url}user/register`, options);
        if (response) {
            console.log(response)
            alert("Usuário adicionado");
            registerForm.reset()
            return
        }
        throw new Error("Não foi possível adicionar o novo Usuário");

    } catch (error) {
        console.log(error);
    }

})


loginForm.addEventListener('submit', async event => {
    event.preventDefault()
    const user = {
        email: loginForm.email.value,
        password: loginForm.password.value
    }
    console.log(user)

    try {
        const options = {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify(user),

        };
        const response = await fetch(`${url}user/login`, options);
        if (response) {
            console.log(response)
            console.log(options)
            alert("Usuário Logado");
            loginForm.reset()
            return
        }
        throw new Error("Não foi possível fazer login");

    } catch (error) {
        console.log(error);
    }

})


loginAdminForm.addEventListener('submit', async event => {
    event.preventDefault()
    const token = localStorage.getItem('authorization-token');
    console.log(token)
    fetch(`${url}admin/`, {
        method: 'GET',
        headers: {
            'authorization-token': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer a requisição: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Manipular os dados recebidos da API
            console.log(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    // console.error('Token não encontrado no localStorage')


})


