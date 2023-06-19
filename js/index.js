const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const form = document.querySelector(".form");
const search = document.querySelector(".input_search")
const pokeName = document.querySelector(".pokemon_name");
const pokeNumber = document.querySelector(".pokemon_number");
const pokeImage = document.querySelector(".pokemon_image");
const nextButton = document.querySelector(".btn-next");
const prevButton = document.querySelector(".btn-prev");

let numberPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const response = await fetch(`${BASE_URL}${pokemon}`);

    if (response.status === 200) {
        const data = await response.json();
        return data;
    }
};

const renderPokemon = async (pokemon) => {
    pokeName.innerHTML = "Loading...";
    pokeNumber.innerHTML = "";
    pokeImage.style.display = "none";
    const data = await fetchPokemon(pokemon);
    if (data) {
        pokeName.innerHTML = data.name;
        pokeNumber.innerHTML = data.id;
        pokeImage.style.display = "block";

        data.sprites.versions["generation-v"]["black-white"].animated
            .front_default
            ? (pokeImage.src =
                  data.sprites.versions["generation-v"][
                      "black-white"
                  ].animated.front_default)
            : (pokeImage.style.display = "none");

        numberPokemon = data.id;
    } else {
        pokeName.innerHTML = "404 not found";
        pokeNumber.innerHTML = "";
    }

    search.value = "";
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    renderPokemon(search.value.toLowerCase());
});

nextButton.addEventListener("click", (e) => {
    numberPokemon < 1010
        ? renderPokemon((numberPokemon = numberPokemon + 1))
        : "";
});
prevButton.addEventListener("click", (e) => {
    numberPokemon > 1 ? renderPokemon((numberPokemon = numberPokemon - 1)) : "";
});
