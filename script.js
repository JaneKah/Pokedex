let currentPokemon;
let currentPokemonInfo;
let currentSpecies;
let pokemonLimit = 30;
let allPokemonsData = [];
let allPokomonsSpeciesData = [];
let allPokemonsDataInfo = [];
let pokemonNames = [];
let pokemonNameInfo;
let id;
let startNumber = 0;
let limit = 30;
let offset = 0;
let scrollToLoad = true;
let maxPokemonCount = 990;
let alreadyLoading = false;


// render first 30 Pokemons
async function showFirstPokemons() {
    for (let i = startNumber; i < pokemonLimit; i++) {
        id = i + 1;
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemonsData.push(currentPokemon);
        pokemonNames.push(currentPokemon.name);
        renderPokemonCards(i);
    }
    window.addEventListener('scroll', ScrollToMorePokemons);
}

// load pokemons data for info cards
async function loadPokemonInfo() {
    for (let i = startNumber; i < pokemonLimit; i++) {
        id = i + 1;
        let url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
        let secondUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let response = await fetch(url);
        let secondResponse = await fetch(secondUrl);
        currentSpecies = await response.json();
        currentPokemonInfo = await secondResponse.json();
        allPokomonsSpeciesData.push(currentSpecies);
        allPokemonsDataInfo.push(currentPokemonInfo);
        renderPokemonInfo(i);
    }
}


let ScrollToMorePokemons = async () => {
    if (window.scrollY + window.innerHeight >= document.body.clientHeight && !alreadyLoading) {
        if (pokemonLimit >= maxPokemonCount) {
            window.removeEventListener('scroll', ScrollToMorePokemons);
            return;
        }
        alreadyLoading = true;
        for (i = pokemonLimit; i < pokemonLimit + 30; i++) {
            id = i + 1;
            let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
            let response = await fetch(url);
            currentPokemon = await response.json();
            allPokemonsData.push(currentPokemon);
            pokemonNames.push(currentPokemon.name);
            renderPokemonCards(i);
        }

        for (let i = pokemonLimit; i < pokemonLimit + 30; i++) {
            id = i + 1;
            let url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
            let secondUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
            let response = await fetch(url);
            let secondResponse = await fetch(secondUrl);
            currentSpecies = await response.json();
            currentPokemonInfo = await secondResponse.json();
            allPokomonsSpeciesData.push(currentSpecies);
            allPokemonsDataInfo.push(currentPokemonInfo);
            renderPokemonInfo(i);
        }
        pokemonLimit += 30;
        alreadyLoading = false;
    }
}


// render pokemon cards 
function renderPokemonCards(i) {
    let id = i + 1;
    let img = currentPokemon['sprites']['other']['dream_world']['front_default'];
    let pokemonName = currentPokemon['name'];
    let changedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

    document.getElementById('pokedex-container').innerHTML += generateInfoCard(i, id, changedPokemonName, img);
}

// render pokemon types from API for pokemon cards in main page
function loadPokemonTypes() {
    let pokemonType = "";
    for (j = 0; j < currentPokemon.types.length; j++) {
        type = currentPokemon['types'][j]['type']['name'];
        pokemonType += ` <span class="type-info">${type}</span>`;
    }
    return pokemonType;
}


//  render pokemon types from API for pokemon more info cards
function getPokemonTypes(i) {
    let types = allPokemonsDataInfo[i].types;
    let pokemonType = "";
    for (i = 0; i < types.length; i++) {
        type = types[i]['type']['name'];
        pokemonType += ` <span class="type-info">${type}</span>`;
    }
    return pokemonType;
}


//render pokemon info data
function renderPokemonInfo(i) {
    pokemonNameInfo = allPokemonsDataInfo[i]['name'];
    let changedPokemonName = pokemonNameInfo.charAt(0).toUpperCase() + pokemonNameInfo.slice(1);
    document.getElementById('pokemon-name').innerHTML = changedPokemonName;
    document.getElementById('pokemon-id').innerHTML = '#' + Number(i + 1);
    document.getElementById('pokemon-type-info').innerHTML = getPokemonTypes(i);
    document.getElementById('pokemon-height').innerHTML = allPokemonsDataInfo[i].height / 10 + " m";
    document.getElementById('pokemon-weight').innerHTML = allPokemonsDataInfo[i].weight / 10 + " kg";
    document.getElementById('pokemon-abilities').innerHTML = loadAbilities(i);
    document.getElementById('info-text').innerHTML = allPokomonsSpeciesData[i]['flavor_text_entries'][6]['flavor_text'];
    document.getElementById('base-stats').innerHTML = getBaseStats(i);
    document.getElementById('pokemon-info-card').style = `background-color: var(--c-${allPokemonsDataInfo[i]['types'][0]['type']['name']})`;
}


// render images for pokemon info card
function loadImages(i) {
    document.getElementById('info-img').src = allPokemonsDataInfo[i]['sprites']['other']['dream_world']['front_default'];
    showNextImage(i);
    showPreviousImage(i);
}


// render image of next pokemon on info card
function showNextImage(i) {
    let firstImage = allPokemonsDataInfo[0]['sprites']['other']['dream_world']['front_default'];
    if (i < allPokemonsDataInfo.length - 1) {
        document.getElementById('next-img').src = allPokemonsDataInfo[i + 1]['sprites']['other']['dream_world']['front_default'];
    } else if (i == allPokemonsDataInfo.length - 1) {
        document.getElementById('next-img').src = firstImage;
    }
}


// render image of previous pokemon on info card
function showPreviousImage(i) {
    let lastPicture = allPokemonsDataInfo[allPokemonsDataInfo.length - 1]['sprites']['other']['dream_world']['front_default'];
    if (i > 0) {
        document.getElementById('previous-img').src = allPokemonsDataInfo[i - 1]['sprites']['other']['dream_world']['front_default'];
    } else if (i == 0) {
        document.getElementById('previous-img').src = lastPicture;
    }
}


// show previous pokemon info card
function showPreviousPokemon(i) {
    if (i > 0) {
        openInfoCard(i - 1);
    } else {
        openInfoCard(allPokemonsDataInfo.length - 1);
    }
}


// show next pokemon info card
function showNextPokemon(i) {
    if (i < allPokemonsDataInfo.length - 1) {
        openInfoCard(i + 1);
    } else if (i == allPokemonsDataInfo.length - 1) {
        openInfoCard(0);
    }
}


/* 
function transformPokemon() {
    document.getElementById('next-img').className = 'next-img';
}
*/

// render abilities data of pekomon to show on info card 
function loadAbilities(i) {
    let abilities = "";
    let abilitiesInfo = allPokemonsDataInfo[i].abilities;
    for (i = 0; i < abilitiesInfo.length; i++) {
        ability = abilitiesInfo[i]['ability']['name'];
        abilities += ` <span>${ability}<br></span>`;
    }
    return abilities;
}

// render statistics of pokemon powers on info card
function getBaseStats(i) {
    let stats = allPokemonsDataInfo[i].stats;
    let statsNames = ['HP', 'Attack', 'Defense', 'Sp. Atk.', 'Sp. Def.', 'Speed'];
    let statsContent = "";
    for (let i = 0; i < stats.length; i++) {
        statsContent += `
            <div class="stats-names">
                <div class="inline">
                <div style="min-width: 100px;">
                <b class="stats-name">${statsNames[i]} </b>
                </div>
                <div style="min-width: 35px;"><span><b> ${stats[i].base_stat}</b></span>
                </div> 
                <div class="progress">
                <span class="progress-bar" style="width: ${stats[i].base_stat / 2}%"></span>
              </div>
              </div>
            </div>
        `
    }
    return statsContent;
}

// open statistics tab on info card and show it as active tab
function openBaseStats() {
    document.getElementById('about-tab').classList.remove('active');
    document.getElementById('about-tab').classList.add('inactive');
    document.getElementById('stats-tab').classList.remove('inactive');
    document.getElementById('stats-tab').classList.add('active');
    document.getElementById('about-info').classList.add('d-none');
    document.getElementById('base-stats-container').classList.remove('d-none');
}

// open  informaton tab on info card and show it as active tab
function openInfoAbout() {
    document.getElementById('about-tab').classList.add('active');
    document.getElementById('about-tab').classList.remove('inactive');
    document.getElementById('stats-tab').classList.add('inactive');
    document.getElementById('stats-tab').classList.remove('active');
    document.getElementById('base-stats-container').classList.add('d-none');
    document.getElementById('about-info').classList.remove('d-none');
}

// close info pokemon card
function closeInfoCard() {
    document.getElementById(`info-card-container`).classList.add('d-none');
    document.body.style = "overflow: auto"
}

//open info card for more information about pokemon
function openInfoCard(i) {
    generateHTML(i);
    renderPokemonInfo(i);
    loadImages(i);
    document.body.style = "overflow: hidden"
    document.getElementById(`info-card-container`).classList.remove('d-none');
}





