const CHAVE = "api_key=f02a5f7bcc77dd33b91bcaf1c736f800"
const URLPrincipal = "https://api.themoviedb.org/3"
const urlFilmesPopulares = "/discover/movie?sort_by=popularity.desc&"
const img =  "https://image.tmdb.org/t/p/w500"
const pesquisarFilme = URLPrincipal + "/search/movie?" + CHAVE + "&query="
let filmesPopulares = document.querySelector("#filmespopulares")
const urlPopulares = URLPrincipal + urlFilmesPopulares + CHAVE

function pegarFilmes(url) {
    fetch(url).then(resp => resp.json()).then((dados) => {
        colocarNoHTML(dados.results)
    })
}
pegarFilmes(urlPopulares)

function colocarNoHTML(dados) {
    filmesPopulares.innerHTML = ""
    dados.forEach((filme) => {
        const {title, popularity, date_release, poster_path, id } = filme
        let div = document.createElement('div')
        div.classList.add('containerPopulares')

        div.innerHTML = `
                <div class="col divPopulares">
                  <img class="Cd" src="${img + poster_path}" alt="some text" width=220 height=310>
                  <a href="${"https://www.themoviedb.org/movie/" + id}">Nome do Filme: ${title}</a>
                  <p>Popularidade: ${popularity} </p>
                  <p>Data de estréia: ${date_release}</p>
               </div>
        `
        filmesPopulares.appendChild(div)

    })
}

let pesquisa = document.getElementById('pesquisa')
let formulario = document.getElementById('formulario')
console.log(pesquisa.value)


formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    let valuePesquisa = pesquisa.value
    if(valuePesquisa) {
        pegarFilmes(pesquisarFilme + valuePesquisa)
    }
})



