let currentPokemon;
let currentPokemonInfo;
let currentSpecies;
let pokemonLimit = 10;
let allPokemonsData = [];
let allPokomonsSpeciesData = [];
let allPokemonsDataInfo = [];
let pokemonNameInfo;
let id;

async function loadPokemon() {

    for (let i = 0; i < pokemonLimit; i++) {
        id = i + 1;
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log('Loaded pokemon', currentPokemon);
        renderPokemonCards(i, id);
        allPokemonsData.push(currentPokemon);
    }
}


async function loadPokemonInfo() {
    for (let i = 0; i < pokemonLimit; i++) {
        id = i + 1;
        let url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
        let secondUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
        let response = await fetch(url);
        let secondResponse = await fetch(secondUrl);
        currentSpecies = await response.json();
        currentPokemonInfo = await secondResponse.json();
        allPokomonsSpeciesData.push(currentSpecies);
        allPokemonsDataInfo.push(currentPokemonInfo);
    }
    renderPokemonInfo(i);
}

function renderPokemonCards(i, id) {

    let img = currentPokemon['sprites']['other']['dream_world']['front_default'];
    let pokemonName = currentPokemon['name'];
    let changedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

    document.getElementById('pokedex-container').innerHTML +=
        `<div onclick="openInfoCard(${i})" class="pokemon-card" style="background-color: var(--c-${currentPokemon['types'][0]['type']['name']})" >
    <div class="pokemon-card-top">
        <div class="pokemon-id">#${id}</div>
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
        type = types[i]['type']['name'];
        pokemonType += ` <span class="type-info">${type}</span>`;
    }
    return pokemonType;
}


function renderPokemonInfo(i) {
    pokemonNameInfo = allPokemonsDataInfo[i]['name'];
    let changedPokemonName = pokemonNameInfo.charAt(0).toUpperCase() + pokemonNameInfo.slice(1);
    document.getElementById('pokemon-name').innerHTML = changedPokemonName;
    document.getElementById('pokemon-id').innerHTML = '#' + Number(i+1);
    document.getElementById('pokemon-type-info').innerHTML = getPokemonTypes(i);
    document.getElementById('pokemon-height').innerHTML = allPokemonsDataInfo[i].height / 10 + " m";
    document.getElementById('pokemon-weight').innerHTML = allPokemonsDataInfo[i].weight / 10 + " kg";
    document.getElementById('pokemon-abilities').innerHTML = loadAbilities(i);
    document.getElementById('info-text').innerHTML = allPokomonsSpeciesData[i]['flavor_text_entries'][6]['flavor_text'];
    document.getElementById('base-stats').innerHTML = getBaseStats(i);
    document.getElementById('pokemon-info-card').style = `background-color: var(--c-${allPokemonsDataInfo[i]['types'][0]['type']['name']})`;
}


function loadImages(i) {
    
    document.getElementById('info-img').src = allPokemonsDataInfo[i]['sprites']['other']['dream_world']['front_default'];
    
    showNextImage(i);
    showPreviousImage(i);
}


function showNextImage(i) {
    let firstImage = allPokemonsDataInfo[0]['sprites']['other']['dream_world']['front_default'];
    if (i < allPokemonsDataInfo.length - 1) {
        document.getElementById('next-img').src = allPokemonsDataInfo[i+1]['sprites']['other']['dream_world']['front_default'];
    } else if (i == allPokemonsDataInfo.length - 1) {
        document.getElementById('next-img').src = firstImage;
    }
}


function showPreviousImage(i) {
    let lastPicture = allPokemonsDataInfo[allPokemonsDataInfo.length - 1]['sprites']['other']['dream_world']['front_default'];
    if (i > 0) {
        document.getElementById('previous-img').src = allPokemonsDataInfo[i-1]['sprites']['other']['dream_world']['front_default'];
    } else if (i == 0) {
        document.getElementById('previous-img').src = lastPicture;
    }
}


function showPreviousPokemon(i) {
    if (i > 0) {
        openInfoCard(i - 1);
    } else {
        openInfoCard(allPokemonsDataInfo.length - 1);
    }
}


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


function loadAbilities(i) {
    let abilities = "";
    let abilitiesInfo = allPokemonsDataInfo[i].abilities;
    for (i = 0; i < abilitiesInfo.length; i++) {
        ability = abilitiesInfo[i]['ability']['name'];
        abilities += ` <span>${ability}<br></span>`;
    }
    return abilities;
}


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
    generateHTML(i);
    renderPokemonInfo(i);
    loadImages(i);
    document.getElementById(`info-card-container`).classList.remove('d-none');
}


function generateHTML(i) {
    let infoCard = document.getElementById('info-card-container');
    infoCard.innerHTML = `
    <div class="pokedex-info-container">
            <div id="pokemon-info-card">
                <div class="pokemon-info-card-top">
                    <div onclick="closeInfoCard()" class="arrow"><img src="./img/arrow.png" alt=""></div>
                    <div class="pokemon-id" id="pokemon-id"></div>
                </div>
                <div class="pokemon-card-body-info">
                    <div class="pokemon-info-card-left">
                        <h1 id="pokemon-name"></h1>
                        <div id="pokemon-type-info" class="pokemon-type">
                            <span></span>
                        </div>
                    </div>
                    <img id="previous-img"  onclick="showPreviousPokemon(${i})"
                        src=""
                        alt="">
                    <img id="next-img" onclick="showNextPokemon(${i})"
                        src=""
                        alt="">
                    <div class="info-img ">
                        <img src="" id="info-img" alt="">
                    </div>

                </div>
            </div>
            <div class="info-container">
                <div class="tabs">
                    <div onclick="openInfoAbout()" id="about-tab" class="tab active">
                        About
                    </div>
                    <div onclick="openBaseStats()" id="stats-tab" class="tab inactive">
                        Base Stats
                    </div>
                </div>
                <div class="info-container-inner">
                    <div class="info-card-body" id="about-info">
                        <div id="info-text" class="info-text">
                            Lorem ipsum am dignissimos eaque nulla eligendi!
                        </div>
                        <div class="height-weight-container">
                            <div class="box">
                                <div>
                                    <span><b>Height:</b></span><br><br>
                                    <span id="pokemon-height">10m</span>
                                </div>
                            </div>
                            <div class="box">
                                <div>
                                    <p><b>Weight:</b></p>
                                    <p id="pokemon-weight"></p>
                                </div>
                            </div>
                        </div>
                        <div class="info-container-bottom">
                            <div class="abilities-box">
                                <p><b>Abilities:</b></p>
                                <p id="pokemon-abilities"></p>
                            </div>
                        </div>
                    </div>
                    <div class="info-card-body d-none" id="base-stats-container">
                        <div id="base-stats" class="stats">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}