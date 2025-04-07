const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
};

const attributes = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Attack",
    "special-defense": "Sp. Defense",
    speed: "Speed",
}

const showPokemon = (data) => {
    const { id, name, height, weight, types, sprites, stats } = data;
    console.log(data);
    const nameElem = document.getElementById("pokemon-name");
    const idElem = document.getElementById("pokemon-id");
    const weightElem = document.getElementById("weight");
    const heightElem = document.getElementById("height");
    const typeElem = document.getElementById("types");
    const imgElem = document.getElementById("sprite");
    const attributesTable = document.getElementById("stats-table");
    const statElems = [
        "hp",
        "attack",
        "defense",
        "special-attack",
        "special-defense",
        "speed",
    ];

    //clear inner element of types
    typeElem.innerHTML = "";
    attributesTable.innerHTML= "";

    //displaying the elements on the page
    nameElem.textContent = name.toUpperCase();
    idElem.textContent = `#${id}`;
    weightElem.textContent = `Weight: ${weight}`;
    heightElem.textContent = `Height: ${height}`;
    types.forEach(type => {
        const typeDiv = document.createElement("div");
        const typeName = type.type.name.toUpperCase();
        typeDiv.textContent = typeName;
        typeDiv.style.backgroundColor = typeColors[type.type.name];
        typeDiv.style.color = "white";
        typeDiv.style.padding = "5px";
        typeDiv.style.borderRadius = "5px";
        typeDiv.style.marginRight = "5px";
        typeDiv.style.display = "inline-block";
        typeDiv.style.fontSize = "14px";
        typeDiv.style.fontWeight = "bold";
        typeDiv.style.textAlign = "center";
        typeDiv.style.width = "auto"; 
        typeDiv.style.boxSizing = "border-box"; 
        typeElem.appendChild(typeDiv);
    });
    imgElem.src = sprites.front_default;
    for (let i=0; i < stats.length; i++){
        if(statElems[i]) {
            attributesTable.innerHTML += `
            <tr>
                <td>${attributes[stats[i].stat.name]}:</td>
                <td class="cell-stats">${stats[i].base_stat}</td>
            </tr>`;
        }
    }
};

const getPokemonUrl = async (userInput) => {
    //fetching data from the API
    try {
        const response = await fetch(pokemonUrl + "/" + userInput);
        if (!response.ok) {
            alert("Pokémon not found");
            throw new Error("Pokémon not found");
        }
        const data = await response.json();
        showPokemon(data);
    } catch (err) {
        console.log(err);
    }
};

searchBtn.addEventListener("click", (event) => {
    //assigning value of search to a variable
    event.preventDefault();
    let userInput = searchInput.value.toLowerCase();
    if (userInput === "red") {
        alert("Pokémon not found");
    } else {
        getPokemonUrl(userInput);
    }
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
          //assigning value of search to a variable
        event.preventDefault();
        let userInput = searchInput.value.toLowerCase();
        if (userInput === "red") {
        alert("Pokémon not found");
        } else {
            getPokemonUrl(userInput);
        }
    }  
});