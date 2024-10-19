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

let currentStep = 1;

function showStep(step) {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.style.display = 'none');
    document.getElementById(`step${step}`).style.display = 'block';
}

function nextStep() {
    if (validateStep(currentStep)) {
        if (currentStep < 4) {
            currentStep++
            showStep(currentStep)
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--
        showStep(currentStep)
    }
}

function validateStep(step) {
    let isValid = true
    const currentFields = document.querySelectorAll(`#step${step} input`)

    currentFields.forEach(field => {
        if (field.value.trim() === "") {
            field.classList.add("is-invalid")
            isValid = false
        } else {
            field.classList.remove("is-invalid")
        }
    });

    return isValid
}

showStep(currentStep)


function finalizarCadastro(event) {
    if (validateStep(currentStep)) {
        cadastrarUsuario(event)
    }
}

function cadastrarUsuario(event) {
    event.preventDefault()

    const dadosUsuario = {
        primeiroNome: document.getElementById('primeiroNome').value,
        sobrenome: document.getElementById('sobrenome').value,
        email: document.getElementById('emailInput').value,
        senha: document.getElementById('senhaInput').value,
        cpf: document.getElementById('cpfInput').value,
        cidade: document.getElementById('cidadeSelect').value,
        estado: document.getElementById('estadoSelect').value,
        telefone: document.getElementById('telefoneInput').value,
        dataNascimento: document.getElementById('nascimentoInput').value,
        bairro: document.getElementById('bairroInput').value,
        cep: document.getElementById('cepInput').value,
        rua: document.getElementById('enderecoInput').value,
        numeroCasa: document.getElementById('numeroInput').value,
    }

    fetch('/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            mostrarAlerta(data.message, 'success')
            if (data.camposFaltando) {
                mostrarAlerta(`Campos faltando: ${data.camposFaltando.join(', ')}`, 'warning')
            }
        } else {
            mostrarAlerta('Erro ao criar conta.', 'danger')
        }
    })
    .catch(err => {
        console.error('Erro na requisição:', err)
        mostrarAlerta('Erro ao criar conta.', 'danger')
    })
}

document.getElementById('senhaInput').addEventListener('blur', function() {
    const senha = this.value

    const senhaContemCaracteresInvalidos = /[^A-Za-z0-9!@#$%^&*()_+\[\]{};:\\|,.<>\/?~\-=%]/.test(senha);
    const senhaTamanhoValido = senha.length >= 8 && senha.length <= 20;

    if (senhaContemCaracteresInvalidos) {
        mostrarAlerta('A senha contém caracteres inválidos. Use apenas letras, números e os seguintes caracteres especiais: !@#$%^&*()_+[]{};:|,.<>/?~=-%', 'danger')
        this.value = ''
    } else if (!senhaTamanhoValido) {
        mostrarAlerta('A senha deve ter entre 8 a 20 caracteres.','danger')
        this.value = ''
    }
});

document.getElementById('confirmSenhaInput').addEventListener('blur', function() {
    const senha = document.getElementById('senhaInput').value
    const confirmacaoSenha = this.value

    if (confirmacaoSenha !== senha) {
        mostrarAlerta('A confirmação de senha deve ser idêntica à senha.','danger');
        this.value = ''
    }
});

document.getElementById('togglePassword').addEventListener('click', function() {
    const senhaInput = document.getElementById('senhaInput');
    const confirmSenhaInput = document.getElementById('confirmSenhaInput');

    const senhaVisivel = senhaInput.type === 'text'
    senhaInput.type = senhaVisivel ? 'password' : 'text'
    confirmSenhaInput.type = senhaVisivel ? 'password' : 'text'

    this.textContent = senhaVisivel ? 'Mostrar' : 'Ocultar'
})

const cidadesPorEstado = {
    "ACRE": ["RIO BRANCO", "CRUZEIRO DO SUL"],
    "ALAGOAS": ["MACEIÓ", "ARAPIRACA"],
    "AMAPÁ": ["MACAPÁ", "SANTANA"],
    "AMAZONAS": ["MANAUS", "PARINTINS"],
    "BAHIA": ["SALVADOR", "FEIRA DE SANTANA", "VITÓRIA DA CONQUISTA", "ILHÉUS", "JUAZEIRO"],
    "CEARÁ": ["FORTALEZA", "JUAZEIRO DO NORTE", "SOBRAL"],
    "DISTRITO FEDERAL": ["BRASÍLIA"],
    "ESPÍRITO SANTO": ["VITÓRIA", "VILA VELHA", "SERRA", "CACHOEIRO DE ITAPEMIRIM"],
    "GOIÁS": ["GOIÂNIA", "ANÁPOLIS", "APARECIDA DE GOIÂNIA"],
    "MARANHÃO": ["SÃO LUÍS", "IMPERATRIZ", "CAXIAS"],
    "MATO GROSSO": ["CUIABÁ", "VÁRZEA GRANDE", "RONDONÓPOLIS", "SINOP"],
    "MATO GROSSO DO SUL": ["CAMPO GRANDE", "DOURADOS", "TRÊS LAGOAS"],
    "MINAS GERAIS": ["BELO HORIZONTE", "UBERLÂNDIA", "CONTAGEM", "JUÍZ DE FORA", "BETIM"],
    "PARÁ": ["BELÉM", "ANANINDEUA", "SANTARÉM", "MARABÁ"],
    "PARAÍBA": ["JOÃO PESSOA", "CAMPINA GRANDE", "SANTA RITA"],
    "PARANÁ": ["CURITIBA", "LONDRINA", "MARINGÁ", "PONTA GROSSA", "CASCAVEL"],
    "PERNAMBUCO": ["RECIFE", "OLINDA", "CARUARU", "PETROLINA"],
    "PIAUÍ": ["TERESINA", "PARNAÍBA", "PICOS"],
    "RIO DE JANEIRO": ["RIO DE JANEIRO", "NITERÓI", "DUQUE DE CAXIAS", "NOVA IGUAÇU"],
    "RIO GRANDE DO NORTE": ["NATAL", "MOSSORÓ", "PARNAMIRIM"],
    "RIO GRANDE DO SUL": ["PORTO ALEGRE", "CAXIAS DO SUL", "PELOTAS", "SANTA MARIA", "NOVO HAMBURGO"],
    "RONDÔNIA": ["PORTO VELHO", "JI-PARANÁ", "ARIQUEMES"],
    "RORAIMA": ["BOA VISTA", "RORAINÓPOLIS"],
    "SANTA CATARINA": ["FLORIANÓPOLIS", "JOINVILLE", "BLUMENAU", "CHAPECÓ"],
    "SÃO PAULO": ["SÃO PAULO", "CAMPINAS", "BIRIGUI", "ARAÇATUBA", "SANTOS", "RIBEIRÃO PRETO", "SÃO JOSÉ DOS CAMPOS"],
    "SERGIPE": ["ARACAJU", "NOSSAS SENHORA DO SOCORRO"],
    "TOCANTINS": ["PALMAS", "ARAGUAÍNA", "GURUPI"]
}

function SelectEstados() {
    const estadoSelect = document.getElementById('estadoSelect')
    Object.keys(cidadesPorEstado).forEach(function (estado) {
        const option = document.createElement('option')
        option.value = estado
        option.textContent = estado
        estadoSelect.appendChild(option)
    })
}

document.getElementById('estadoSelect').addEventListener('change', function(){
    const estadoSelecionado = this.value
    const cidadeSelect = document.getElementById('cidadeSelect')

    cidadeSelect.removeAttribute('disabled')
    cidadeSelect.innerHTML = '<option selected> Escolha uma cidade</option>'

    cidadesPorEstado[estadoSelecionado].forEach(function(cidade){
       const option = document.createElement('option')
       option.value = cidade
       option.textContent = cidade
       cidadeSelect.appendChild(option)
    })
})

document.getElementById('cpfInput').addEventListener('blur', function() {
    const input = this.value.replace(/\D/g, '') 

    if (input.length === 11) {
        const xxx = input.slice(0, 3)
        const yyy = input.slice(3, 6)
        const zzz = input.slice(6, 9)
        const zz = input.slice(9)
        this.value = `${xxx}.${yyy}.${zzz}-${zz}`
    } else {
        mostrarAlerta('Formato incorreto, o CPF deve conter 11 dígitos.','danger');
        this.value = ''
    }
})

document.getElementById('telefoneInput').addEventListener('blur', function() {
    const input = this.value.replace(/\D/g, '') 

    if (input.length === 11) {
        const ddd = input.slice(0, 2)
        const xxx = input.slice(2, 7)
        const yyy = input.slice(7, 11)
        this.value = `(${ddd}) ${xxx}-${yyy}`
    } else {
        mostrarAlerta('Formato incorreto, o telefone deve conter 11 dígitos.','danger');
        this.value = ''
    }
})

document.getElementById('cepInput').addEventListener('blur', function() {
    const input = this.value.replace(/\D/g, '') 

    if (input.length === 8) {
        const xxx = input.slice(0, 5)
        const yyy = input.slice(5, 8)
        this.value = `${xxx}-${yyy}`
    } else {
        mostrarAlerta('Formato incorreto, o CEP deve conter 8 dígitos.','danger');
        this.value = ''
    }
})




function addCarrinho(idProduto) {
    fetch('/api/carrinho', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idProduto })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mostrarAlerta('Produto adicionado ao carrinho.', 'success')
        } else {
            mostrarAlerta('Erro ao adicionar produto ao carrinho.', 'danger')
        }
    })
}

window.onload = function () {
    SelectEstados()
}
