// Get value from input field and uppercase the value
function searchPokemon() {
    let search = document.getElementById('search');
    search.value.toUpperCase();
    renderSearchResult(search.value.toUpperCase());
}


// Render search result
function renderSearchResult(searchValue) {
    document.getElementById('pokedex-container').innerHTML = '';
    for (let i = 0; i < allPokemonsData.length; i++) {
        if (pokemonNames[i].toUpperCase().includes(searchValue)) {
            renderPokemonSearchResult(i, i+1, pokemonNames);
        }
    }
}

// Render searched pokemons

function renderPokemonSearchResult(i, id, pokemonNames) {

    let img = allPokemonsData[i]['sprites']['other']['dream_world']['front_default'];
    let changedPokemonName = pokemonNames[i].charAt(0).toUpperCase() + pokemonNames[i].slice(1);

    document.getElementById('pokedex-container').innerHTML +=
        `<div onclick="openInfoCard(${i})" class="pokemon-card" style="background-color: var(--c-${allPokemonsData[i]['types'][0]['type']['name']})" >
    <div class="pokemon-card-top">
        <div class="pokemon-id">#${id}</div>
    </div>
    <div class="pokemon-card-body">
        <div class="pokemon-info-left">
            <span id="pokemon-name">${changedPokemonName}</span>
            <div class="pokemon-type">
            ${loadPokemonTypesForSearchResult(i)}
            </div>
        </div>
        <div class="img-container">
            <img id="pokemon-img" src="${img}" alt="">
        </div>
    </div>
</div>`
}

// get types of pokemon shown

function loadPokemonTypesForSearchResult(i) {
    let pokemonType = "";
    let pokemonTypes = allPokemonsData[i].types; 
    for (i = 0; i < pokemonTypes.length; i++) {
        type = pokemonTypes[i].type.name;
        pokemonType += ` <span class="type-info">${type}</span>`;
    }
    return pokemonType;
}
