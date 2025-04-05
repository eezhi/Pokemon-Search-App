const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const showPokemon = (data) => {
    const { id, name, height, weight, types, sprites, stats } = data;

    const nameElem = document.getElementById("pokemon-name");
    const idElem = document.getElementById("pokemon-id");
    const weightElem = document.getElementById("weight");
    const heightElem = document.getElementById("height");
    const typeElem = document.getElementById("types");
    const imgElem = document.getElementById("sprite");
    const hpElem = document.getElementById("hp");
    const attackElem = document.getElementById("attack");
    const defenseElem = document.getElementById("defense");
    const specialAttElem = document.getElementById("special-attack");
    const specialDefElem = document.getElementById("special-defense");
    const speedElem = document.getElementById("speed");

    //clear inner element of types
    typeElem.innerHTML = "";

    //displaying the elements on the page
    nameElem.textContent = name.toUpperCase();
    idElem.textContent = `#${id}`;
    weightElem.textContent = `Weight: ${weight}`;
    heightElem.textContent = `Height: ${height}`;
    types.forEach(type => {
        const typeDiv = document.createElement("div");
        typeDiv.innerHTML = `<div>${type.type.name.toUpperCase()}</div>`;
        typeElem.appendChild(typeDiv);
    });
    imgElem.src = sprites.front_default;
    hpElem.textContent = ` ${stats[0].base_stat}`; //Removed the "HP:" prefix, since it is now in the table.
    attackElem.textContent = ` ${stats[1].base_stat}`; //Removed the "Attack:" prefix, since it is now in the table.
    defenseElem.textContent = ` ${stats[2].base_stat}`; //Removed the "Defense:" prefix, since it is now in the table.
    specialAttElem.textContent = ` ${stats[3].base_stat}`; //Removed the "Sp. Attack:" prefix, since it is now in the table.
    specialDefElem.textContent = ` ${stats[4].base_stat}`; //Removed the "Sp. Defense:" prefix, since it is now in the table.
    speedElem.textContent = ` ${stats[5].base_stat}`; //Removed the "Speed:" prefix, since it is now in the table.
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