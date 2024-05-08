let currentPage = 1;
let loadCharacters = [];
let isloading = false;



const obtenerPersonajes = async() => {
    try{

        const response = await fetch("https://rickandmortyapi.com/api/character")
        const data = await response.json();

        return data.results;
    }catch(error){ 
        console.log(`el error es: ${error}` ); 
    }
}
const enviarDatos = (id , name, species, status, image , imagen, location) => {
    const rataArchico = "../personaje.html";

    fetch(rutaArchivoHTML)
    .then(response => response.text)
    .then(html =>{
        const parse = new DOMParser();
        const doc = parse.parseFromString(html, 'text/html');

        const imagePage = doc.getElementById("imagePage");
        imagePage.src = image;
        imagePage.classList.add("card-img-top");
    })

    //console.log(`El id es: ${id}`)
}

const crearTargetas = async(results = [] )=> {
    let personajesRow = document.getElementById("personajesRow");
    results.map ( ( result) =>  {
        const {id , name, species, status, image : imagen, location}  = result;
        const {name :nombres, url} = location;

        const divRow = document.createElement("div");
        divRow.classList.add("col-xl-3");
        divRow.classList.add("col-lg-3");
        divRow.classList.add("col-md-3");
        divRow.classList.add("col-sm-12");
        divRow.classList.add("col-xs-12");
        divRow.classList.add("mt-2");
        divRow.classList.add("mt-2");

        const card = document.createElement("div");
        card.classList.add("card");

        const image = document.createElement("img");
        image.src=imagen;
        image.classList.add("card-img-top");

        const divBody =document.createElement("div");
        divBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = name;

        const subTitle = document.createElement("p");
        subTitle.classList.add("card-text");
        subTitle.textContent= "species";

        const subTitle2 = document.createElement("p");
        subTitle2.classList.add("card-text");
        subTitle2.textContent= "status";

        const subTitle3 = document.createElement("p");
        subTitle3.classList.add("card-text");
        subTitle3.textContent= "nombre";


        const btnVer = document.createElement("button");
        btnVer.classList.add("btn");
        btnVer.classList.add("btn-warning")
        btnVer.textContent = "Ver mas";
        btnVer.addEventListener("click",() => {
            enviarDatos(id , name, species, status, image , imagen, location)

        });

        divRow.appendChild(card);

        card.appendChild(image);
        card.appendChild(divBody);

        divBody.appendChild(title) //; no se sabe
        divBody.appendChild(subTitle);
        divBody.appendChild(subTitle2);
        divBody.appendChild(subTitle3);
        divBody.appendChild(btnVer);

        personajesRow.appendChild(divRow);


    })

    
}
//llamando 
obtenerPersonajes()
    .then( data => crearTargetas(data))
    .catch(error => console.log(error))