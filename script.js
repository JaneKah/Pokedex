let currentPokemon;
let pokemonLimit = 301;


async function loadPokemon() {

    for (let i = 1; i < pokemonLimit; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded pokemon', currentPokemon);
    renderPokemonCards(i);
    }
   
}



function renderPokemonCards(i) {
    
        let img = currentPokemon['sprites']['other']['dream_world']['front_default'];
        let pokemonName = currentPokemon['name'];
        let changedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);


    document.getElementById('pokedex-container').innerHTML +=
    `<div class="pokemon-card" style="background-color: var(--c-${currentPokemon['types'][0]['type']['name']})" >
    <div class="pokemon-card-top">
        <div id="pokemon-id">#${i}</div>
    </div>
    <div class="pokemon-card-body">
        <div class="pokemon-info-left">
            <span id="pokemon-name">${changedPokemonName}</span>
            <div class="pokemon-type">
            ${getPokemonTypes()}
            </div>
        </div>
        <div class="img-container">
            <img id="pokemon-img" src="${img}" alt="">
        </div>
    </div>
</div>` 
}

function getPokemonTypes() {
    let pokemonType = "";
    for (i = 0; i < currentPokemon.types.length; i++) {
        type = currentPokemon['types'][i]['type']['name'];
        pokemonType += ` <span class="type-info">${type}</span>`;
    }
    return pokemonType;
}


