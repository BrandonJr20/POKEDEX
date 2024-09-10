const otherPokemons = document.querySelector('#otherPokemons');
const pokeURL = 'https://pokeapi.co/api/v2/pokemon/';
const pokebusqueda = document.querySelector('#pokebusqueda')

// Busqueda de pokemones a traves de id o nombre
pokebusqueda.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const query = pokebusqueda.value.trim().toLowerCase();

        if (query) {
            fetch(pokeURL + query)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Pokémon no encontrado');
                    }
                    return response.json();
                })
                .then(data => mostrarAtributos(data))
                .catch(error => {
                    alert(error.message);
                });
        }
    }
});

for (let i = 1; i <= 151; i++) {
    fetch(pokeURL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data));
}

fetch(pokeURL + 1)
    .then((response) => response.json())
    .then(data => mostrarAtributos(data));


function mostrarPokemon(poke) {
    const div = document.createElement("div");

    // Esta funcion agrega uno o dos ceros dependiendo si el numero es unidad o decena
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = '00' + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = '0' + pokeId;
    }

    div.classList.add('otherPokemon');
    div.innerHTML = `
            <img src="${poke.sprites.other['official-artwork'].front_default}" alt="${poke.name}">
            <h2>#${pokeId}</h2>
            <h2>${poke.name}</h2>
    `;
    otherPokemons.append(div);

    // Con el siguiente div, me permite dar clic  a los objetos
    div.addEventListener('click', () => {
        fetch(pokeURL + poke.id)
            .then(response => response.json())
            .then(data => mostrarAtributos(data));
    });
}

const vistaAtributos = document.querySelector('#vistaAtributos');

function mostrarAtributos(poke) {
    vistaAtributos.innerHTML = ''; // Limpia los detalles previos
    const div = document.createElement('div');

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join(' ');

    let habilidades = poke.abilities.map((ability) => `<p class="${ability.ability.name} habilidad">${ability.ability.name}</p>`);
    habilidades = habilidades.join(' ');

    let height = poke.height.toString();
    height = height + ' M';

    let weight = poke.weight.toString();
    weight = weight + ' KG';

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = '00' + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = '0' + pokeId;
    }

    div.classList.add('vistaAtributos');
    div.innerHTML = `
        <section class="pokemonVista" id="pokemonVista">
            <div class="nombrePokemon">
                <img src="recursos/img/pokebola.png" alt="">
                <h1>${poke.name}</h1>
            </div>
            <div class="imagenPokemon">
                <img src="${poke.sprites.other['official-artwork'].front_default}" alt="${poke.name}">
            </div>
        </section>
        <section class="pokemonAtributos" id="pokemonAtributos">
            <div class="atributos">
                <div class="atributo">
                    <h3>POKEMON #</h3>
                    <span>${pokeId}</span>
                </div>
                <div class="atributo">
                    <h3>LEVEL</h3>
                    <span>100</span>
                </div>
                <div class="atributo">
                    <h3>TYPE</h3>
                    <span>${tipos}</span>
                </div>
                <div class="atributo">
                    <h3>HABILITY</h3>
                    <span>${habilidades}</span>
                </div>
                <div class="atributo">
                    <h3>HEIGHT</h3>
                    <span>${height}</span>
                </div>
                <div class="atributo">
                    <h3>WEIGHT</h3>
                    <span>${weight}</span>
                </div>
            </div>
        </section>
    `;
    vistaAtributos.append(div);
}
