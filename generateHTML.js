// generate HTML code for info card
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
                                    <span><b>Height:</b></span><br>
                                    <span id="pokemon-height">10m</span>
                                </div>
                            </div>
                            <div class="box">
                                <div>
                                    <span><b>Weight:</b></span><br>
                                    <span id="pokemon-weight"></span>
                                </div>
                            </div>
                        </div>
                        <div class="info-container-bottom">
                            <div class="abilities-box">
                                <div>
                                <b>Abilities:</b><br>
                                <span id="pokemon-abilities"></span>
                                </div>
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

function generateInfoCard(i, id, changedPokemonName, img) {
   return `<div onclick="openInfoCard(${i})" class="pokemon-card" style="background-color: var(--c-${currentPokemon['types'][0]['type']['name']})" >
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