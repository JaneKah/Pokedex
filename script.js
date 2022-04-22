let currentPokemon;



async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/1';
    let response = await fetch(url);
    let currentPokemon = await response.json();
    console.log('Loaded pokemon', currentPokemon);

    renderPokemonInfo(currentPokemon);
}

function renderPokemonInfo(currentPokemon) {
    let pokemonName = currentPokemon['name'];
    let changedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    document.getElementById('pokemon-name').innerHTML = changedPokemonName;
    document.getElementById('pokemon-img').src = currentPokemon['sprites']['other']['dream_world']['front_default'];
}


  