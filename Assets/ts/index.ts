const pokemonContainer = document.querySelector(".pokemon-container") as HTMLElement;
const previous = document.querySelector("#previous") as HTMLButtonElement;
const next = document.querySelector("#next") as HTMLButtonElement;

let urlAPI = 'https://pokeapi.co/api/v2/pokemon/';

let limit = 17;
let offset = 1;

type Pokemon = {
    id: number;
    name: string;
    stats: { stat: { name: string }; base_stat: number }[];
    sprites: { front_default: string };
}

const fetchData = async (id: number) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data = await response.json();
        dibujarCards(data);
    } catch (error) {
        console.log(error);
    }
};

const dibujarCards = async (pokemon: Pokemon) => {
    previous.disabled = false;
    next.disabled = false;

    let stats = '';
    for (let i = 0; i < pokemon.stats.length; i++) {
        stats += `<p class="col-6 text-start"><span class="fw-bold">${pokemon.stats[i].stat.name}: </span>${pokemon.stats[i].base_stat}</p>`;
    }
    let cardIndividual = `
        <div class="flip-card col-12 col-sm-6 col-md-4">
            <div class="card-container">
                <div class="pokemon-block shadow bg-light p-1 rounded-3">
                    <div>
                        <img src="${pokemon.sprites.front_default}">
                    </div>
                    <p>#${pokemon.id}</p>
                    <p class="name">${pokemon.name}</p>
                </div>
                <div class="pokemon-block-back shadow bg-light p-1 rounded-3">
                    <div class="stats-container row p-3">
                        ${stats}
                    </div>
                </div>
            </div>
        </div>
        `;
    pokemonContainer.innerHTML += cardIndividual;
};

function fetchPokemons(offset: number, limit: number) {
    for (let i = offset; i <= offset + limit; i++) {
        fetchData(i);
    }
}

function removeChildNodes(parent: HTMLElement) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit);

const irAtras = () => {
    if (offset !== 1) {
        offset -= 9;
        removeChildNodes(pokemonContainer);
        fetchPokemons(offset, limit);
    } else {
        previous.disabled = true;
    }
};

const irSiguiente = () => {
    offset += 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
};

next.addEventListener('click', irSiguiente);
previous.addEventListener('click', irAtras);
