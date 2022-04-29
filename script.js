let currentPokemon;
let currentSpecies;
let pokemonLimit = 10;


async function loadPokemon() {

    for (let i = 1; i < pokemonLimit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log('Loaded pokemon', currentPokemon);
        renderPokemonCards(i);
    }
    renderPokemonInfo(i);
}


async function loadPokemonInfo() {
    for (let i = 1; i < pokemonLimit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
        let response = await fetch(url);
        currentSpecies = await response.json();
        console.log('Loaded pokemon', currentSpecies);
    }
    renderPokemonInfo(i);
}


function renderPokemonCards(i) {

    let img = currentPokemon['sprites']['other']['dream_world']['front_default'];
    let pokemonName = currentPokemon['name'];
    let changedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);


    document.getElementById('pokedex-container').innerHTML +=
        `<div class="pokemon-card" style="background-color: var(--c-${currentPokemon['types'][0]['type']['name']})" >
    <div class="pokemon-card-top">
        <div>#${i}</div>
    </div>
    <div class="pokemon-card-body">
        <div class="pokemon-info-left">
            <span>${changedPokemonName}</span>
            <div class="pokemon-type">
            ${getPokemonTypes()}
            </div>
        </div>
        <div class="img-container">
            <img src="${img}" alt="">
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


function renderPokemonInfo(i) {
    let pokemonName = currentPokemon['name'];
    let changedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    document.getElementById('pokemon-name').innerHTML = changedPokemonName;
    document.getElementById('pokemon-id').innerHTML = '#' + i;
    document.getElementById('pokemon-type').innerHTML = getPokemonTypes();
    document.getElementById('pokemon-height').innerHTML = currentPokemon.height / 10 + " m";
    document.getElementById('pokemon-weight').innerHTML = currentPokemon.weight / 10 + " kg";
    document.getElementById('pokemon-abilities').innerHTML = getAbilities();
    document.getElementById('info-text').innerHTML = currentSpecies['flavor_text_entries'][6]['flavor_text'];
    document.getElementById('base-stats').innerHTML = getBaseStats();
}


function getAbilities() {
    let pokemonAbilities = "";
    for (i = 0; i < currentPokemon.abilities.length; i++) {
        ability = currentPokemon['abilities'][i]['ability']['name'];
        pokemonAbilities += ` <span>${ability}<br></span>`;
    }
    return pokemonAbilities;
}

function getBaseStats() {
    let statsNames = ['HP', 'Attack', 'Defense', 'Sp. Atk.', 'Sp. Def.', 'Speed'];
    let statsContent = "";
    for (let i = 0; i < currentPokemon.stats.length; i++) {
        statsContent += `
            <div class="stats-names">
                <div class="inline">
                <div style="min-width: 100px;">
                <b>${statsNames[i]} </b>
                </div>
                <div style="min-width: 35px;"><span> ${currentPokemon.stats[i].base_stat}</span>
                </div> 
                <div class="progress">
                <span class="progress-bar" style="width: ${currentPokemon.stats[i].base_stat / 2}%"></span>
              </div>
              </div>
            </div>
        `
    }
    return statsContent;
}