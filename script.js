/// CONSUMIR EL API
const apiKey1 = '';
const contenedor_noticias = document.getElementById("contenido-noticias");
const input = document.getElementById("buscar-noticias");

document.querySelectorAll(".boton-filtro-noticias").forEach(boton =>{
    boton.addEventListener("click",cambiarColor)
})


//Función para cambiar el color de la barra de destacados, recientes, populares
function cambiarColor(){
    document.querySelectorAll(".boton-filtro-noticias").forEach(boton=>{
        boton.classList.remove("botones-filtros-activo");
        boton.classList.add("botones-filtros-noActivo");
    })
    this.classList.remove("botones-filtros-noActivo");
    this.classList.add("botones-filtros-activo");
}




//Función para obtener las noticias mediante la barra de busqueda
async function getNewsbySearch(query){
    let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey1}`
    try{
        const response = await fetch(url)
        const data = await response.json()
        displayNews(data.articles)
        console.log(url);
    }

    catch(error){
        console.log("No se ha encontrado la noticia", error);
    }
}
input.addEventListener("keydown", function(event){
    if(event.key=="Enter"){
        const texto = input.value;
        if(texto==""){
            alert("Ingrese su busqueda ")
        }
        getNewsbySearch(texto);
    }
});

//Función para obtener las noticias desde la API con una categoria dada
async function getNewsbyCategory(category="health"){
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey1}`;
    try{
        const response = await fetch(url);
        const dato = await response.json();
        displayNews(dato.articles)
    }
    catch(error){
        console.log("Error Obtenido en las noticias", error)
    }
}
function displayNews(articles){
    contenedor_noticias.innerHTML = "";
    articles.forEach(article =>{
        const newCard = document.createElement("div")
        newCard.classList.add("news-card");
        newCard.innerHTML=`
            <img class="img-api" src="${article.urlToImage || images/imgnot.jpg}" alt="news-Image">
            <h3>${article.title}</h3>
            <p>${article.description || "No hay descripción disponible"}</p>
            <a href="${article.url} target="_blank">Leer Mas</a>
        `;
        contenedor_noticias.appendChild(newCard);
    })
}

document.querySelectorAll(".boton-filtro").forEach(boton=>{
    boton.addEventListener("click",function(){
        const categoria = this.id.replace("filtro-","")
        console.log(categoria)
        getNewsbyCategory(categoria)
    })
})
getNewsbyCategory();    