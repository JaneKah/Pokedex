let currentPokemon;



async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    let currentPokemon = await response.json();
    console.log('Loaded pokemon', currentPokemon);

    renderPokemonInfo(currentPokemon);
}

function renderPokemonInfo(currentPokemon) {
    document.getElementById('pokemon-name').innerHTML = currentPokemon['name'];
    document.getElementById('pokemon-img').src = currentPokemon['sprites']['other']['dream_world']['front_default'];
}