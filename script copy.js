let currentPokemon;
let currentPokemonInfo;
let currentSpecies;
let pokemonLimit = 10;
let allPokemonsData = [];
let allPokomonsSpeciesData = [];
let allPokemonsDataInfo = [];

async function loadPokemon() {

    for (let i = 1; i < pokemonLimit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log('Loaded pokemon', currentPokemon);
        renderPokemonCards(i);
        allPokemonsData.push(currentPokemon);
    }
}


async function loadPokemonInfo(i) {
    for (let i = 1; i < pokemonLimit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
        let secondUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let secondResponse = await fetch(secondUrl);
        currentSpecies = await response.json();
        currentPokemonInfo = await secondResponse.json();
        allPokomonsSpeciesData.push(currentSpecies);
        allPokemonsDataInfo.push(currentPokemonInfo);
    }
    renderPokemonInfo(i);
}


function renderPokemonCards(i) {

    let img = currentPokemon['sprites']['other']['dream_world']['front_default'];
    let pokemonName = currentPokemon['name'];
    let changedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

    document.getElementById('pokedex-container').innerHTML +=
        `<div onclick="openInfoCard(${i})" class="pokemon-card" style="background-color: var(--c-${currentPokemon['types'][0]['type']['name']})" >
    <div class="pokemon-card-top">
        <div class="pokemon-id">#${i}</div>
    </div>
    <div class="pokemon-card-body">
        <div class="pokemon-info-left">
            <span id="pokemon-name">${changedPokemonName}</span>
            <div class="pokemon-type">
            ${loadPokemonTypes()}
            </div>
        </div>
        <div class="img-container">
            <img id="pokemon-img" src="${img}" alt="">
        </div>
    </div>
</div>`
}


function loadPokemonTypes() {
    let pokemonType = "";
    for (i = 0; i < currentPokemon.types.length; i++) {
        type = currentPokemon['types'][i]['type']['name'];
        pokemonType += ` <span class="type-info">${type}</span>`;
    }
    return pokemonType;
}


function getPokemonTypes(i) {
    let types = allPokemonsDataInfo[i].types;
    let pokemonType = "";
    for (i = 0; i < types.length; i++) {
        type = allPokemonsDataInfo[i]['types'][i]['type']['name'];
        pokemonType += ` <span class="type-info">${type}</span>`;
    }
    return pokemonType;
}


function renderPokemonInfo(i) {
  
    let pokemonName = allPokemonsDataInfo[i]['name'];
    let changedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    document.getElementById('pokemon-name').innerHTML = changedPokemonName;
    document.getElementById('pokemon-id').innerHTML = '#' + Number(i+1);
    document.getElementById('pokemon-type-info').innerHTML = getPokemonTypes(i);
    document.getElementById('pokemon-height').innerHTML = allPokemonsDataInfo[i].height / 10 + " m";
    document.getElementById('pokemon-weight').innerHTML = allPokemonsDataInfo[i].weight / 10 + " kg";
    document.getElementById('pokemon-abilities').innerHTML = loadAbilities();
    document.getElementById('info-text').innerHTML = allPokomonsSpeciesData[i]['flavor_text_entries'][6]['flavor_text'];
    document.getElementById('base-stats').innerHTML = getBaseStats(i);
    document.getElementById('pokemon-info-card').style = `background-color: var(--c-${allPokemonsDataInfo[i]['types'][0]['type']['name']})`;
   
}

function loadImages(i) {
    document.getElementById('previous-img').src = allPokemonsDataInfo[i-1]['sprites']['other']['dream_world']['front_default'];
    document.getElementById('next-img').src = allPokemonsDataInfo[i+1]['sprites']['other']['dream_world']['front_default'];
    document.getElementById('info-img').src = allPokemonsDataInfo[i]['sprites']['other']['dream_world']['front_default'];
}


function loadAbilities() {
    let abilities = "";
    let abilitiesLength = allPokemonsDataInfo[i].abilities;
    for (i = 0; i < abilitiesLength.length; i++) {
        ability = allPokemonsDataInfo[i]['abilities'][i]['ability']['name'];
        abilities += ` <span>${ability}<br></span>`;
    }
    return abilities;
}


function getBaseStats() {
    let statsNames = ['HP', 'Attack', 'Defense', 'Sp. Atk.', 'Sp. Def.', 'Speed'];
    let statsContent = "";
    for (let i = 0; i < allPokemonsDataInfo[i].stats.length; i++) {
        statsContent += `
            <div class="stats-names">
                <div class="inline">
                <div style="min-width: 100px;">
                <b class="stats-name">${statsNames[i]} </b>
                </div>
                <div style="min-width: 35px;"><span><b> ${allPokemonsDataInfo[i].stats[i].base_stat}</b></span>
                </div> 
                <div class="progress">
                <span class="progress-bar" style="width: ${allPokemonsDataInfo[i].stats[i].base_stat / 2}%"></span>
              </div>
              </div>
            </div>
        `
    }
    return statsContent;
}


function openBaseStats() {
    document.getElementById('about-tab').classList.remove('active');
    document.getElementById('about-tab').classList.add('inactive');
    document.getElementById('stats-tab').classList.remove('inactive');
    document.getElementById('stats-tab').classList.add('active');
    document.getElementById('about-info').classList.add('d-none');
    document.getElementById('base-stats-container').classList.remove('d-none');
}


function openInfoAbout() {
    document.getElementById('about-tab').classList.add('active');
    document.getElementById('about-tab').classList.remove('inactive');
    document.getElementById('stats-tab').classList.add('inactive');
    document.getElementById('stats-tab').classList.remove('active');
    document.getElementById('base-stats-container').classList.add('d-none');
    document.getElementById('about-info').classList.remove('d-none');
}


function closeInfoCard() {
    document.getElementById(`info-card-container`).classList.add('d-none');
}


function openInfoCard(i) {
    loadPokemonInfo(i);
    loadImages(i);
    document.getElementById(`info-card-container`).classList.remove('d-none');
}