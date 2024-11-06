import Mustache from 'mustachejs';

const allPokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';
const onePokeUrl = 'https://pokeapi.co/api/v2/pokemon/1';

// Data to get:
// 1) name
// 2) image (sprites/other/dream_world/front_default)
// 3) type (forEach over the types)

const addPokeCard = (pokemon) => {
  const pokeName = pokemon.name;
  const pokeUrl = pokemon.url;
  fetch(pokeUrl)
    .then((response) => response.json())
    .then((pokeDetail) => {
      // console.log(pokeDetail);
      const pokeimg = pokeDetail.sprites.other.dream_world.front_default;
      const poketype = pokeDetail.types.map((type) => type.type.name);
      // 4. Build the data for Mustache rendering
      const pokeData = {
        imageUrl: pokeimg,
        name: pokeName,
        types: poketype,
      };
      displayPokeCard(pokeData);
    });
};

const displayPokeCard = (pokeData) => {
  // 6. Use Mustache to build the hydrated your pokemon card from the pokeData and the card template
  const output = Mustache.render(cardsTemplate.innerHTML, pokeData);
  // 7. Insert the pokemon card into the left side container
  cardsContainer.insertAdjacentHTML('beforeend', output);
  // 8. Re-select that pokemon card we created
  const newPokeCard = cardsContainer.lastElementChild;
  // 9. Call displayPokeInfo when we click on that card
  newPokeCard.addEventListener('click', () => {
    displayPokeInfo(pokeData);
  });
};

// 1. Create a function that displays the pokemon info details on the right side
const displayPokeInfo = (pokeData) => {
  // 2. Select the info template and the info container
  const infoTemplate = document.querySelector('#infoTemplate');
  const infoContainer = document.querySelector('#infoContainer');
  // 3. Use Mustache to build the hydrated your pokemon details from the pokeData and the info template
  const output = Mustache.render(infoTemplate.innerHTML, pokeData);
  // 4. Insert the pokemon details into the right side container
  infoContainer.innerHTML = output;
};

// 1. select template and container
const cardsTemplate = document.querySelector('#cardTemplate');
const cardsContainer = document.querySelector('#cardsContainer');
// 2. fetch all the pokemon from api
fetch(allPokeUrl)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    // data.results is an array full of object --> [{name: "Bulbosaur", url: "www"}, {...}, {...}]
    data.results.forEach((pokemon) => {
      // 3. fetch detail info about each pokemon
      addPokeCard(pokemon);
    });
  });
