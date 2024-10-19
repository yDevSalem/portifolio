const head = document.head
const body = document.body

function addStyleLink(href) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    head.appendChild(link)
}

addStyleLink('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Montserrat:wght@400;700&family=Merriweather:wght@400;700&display=swap')
addStyleLink('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css')
addStyleLink('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css')
addStyleLink('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css')
function favicon(href) {
    const link = document.createElement('link')
    link.rel = 'icon'
    link.href = href
    head.appendChild(link)
}
favicon('/img/icon.png')

const BSJavaScript = document.createElement('script')
BSJavaScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
BSJavaScript.integrity = 'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz'
BSJavaScript.crossOrigin = 'anonymous'
BSJavaScript.defer = true
head.appendChild(BSJavaScript)

const Head = document.createElement('div')
Head.setAttribute('id', 'head')
Head.setAttribute('class', 'head')
body.prepend(Head)



const currentPage = window.location.pathname
const pages = ['sing-in_up.html', 'login_in.html']

if (!pages.some(page => currentPage.includes(page))) {
    const script = document.createElement('script')
    script.src = 'js/funcoes.js'
    document.head.appendChild(script)
}

const userStatus = document.createElement('div')
userStatus.setAttribute('id', 'userStatus')
userStatus.setAttribute('class', 'user-status')
Head.appendChild(userStatus)


fetch('/profile', { method: 'GET', credentials: 'include' })
    .then(response => {
        if (response.ok) {
            response.text().then(userName => {
                userStatus.innerHTML = `Olá, ${userName}! <button id="logoutButton">Logout</button>`
                document.getElementById('logoutButton').addEventListener('click', async () => {
                    await fetch('/logout', { method: 'POST', credentials: 'include' })
                    window.location.reload()
                })
            })
        }
    })
    .catch(error => console.error('Erro ao verificar o status do usuário:', error))




fetch('/html/nav_bar.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML('afterbegin', data)
    })
    .catch(error => console.error('Erro ao carregar a barra de navegação:', error))
