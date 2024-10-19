const alertPlaceholder = document.getElementById('alerta')

function mostrarAlerta(mensagem, tipo) {
    const alerta = document.createElement('div')
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`
    alerta.role = 'alert'
    alerta.innerHTML = `${mensagem}`
    alertPlaceholder.appendChild(alerta)

    setTimeout(() => {
        alerta.remove()
    }, 5000)
}


//LOGIN
function login(event) {
    event.preventDefault()

    const email = document.getElementById('emailInput').value
    const senha = document.getElementById('senhaInput').value
    console.log(email)
    console.log(senha)

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    })
    .then(response => {
        if (response.ok) {
            mostrarAlerta('Login bem-sucedido. Aguarde e te levaremos de volta em segurança!', 'success')
            setTimeout(() => {
                window.location.href = '../index.html'
            }, 5000)
        } else {
            mostrarAlerta('Email ou senha incorretos.', 'danger')
        }
    })
    .catch(error => {
        console.error(error)
        mostrarAlerta('Ops! Tropeçamos em um cabo e já estamos reconectando.', 'danger')
    })
}