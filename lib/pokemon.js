import Mustache from 'mustachejs';

const allPokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';
const onePokeUrl = 'https://pokeapi.co/api/v2/pokemon/35';

// fetch the container by id
const cardContainer = document.getElementById('cardsContainer');
const infoContainer = document.getElementById('infoContainer');
// fetch the template by id
const cardTemplate = document.getElementById('cardTemplate').innerHTML;
const infoTemplate = document.getElementById('infoTemplate').innerHTML;

const initDisplayInfo = (card, data) => {
  // listen to a click on the card
  card.addEventListener('click', (event) => {
    // change the dom, display the card on right side
    const output = Mustache.render(infoTemplate, data);
    infoContainer.innerHTML = output;
  });
};

const displayCardList = (data) => {
  const cardComplete = Mustache.render(cardTemplate, data);
  cardContainer.insertAdjacentHTML('beforeend', cardComplete);
};

const fetchOnePoke = (pokemonURL) => {
  fetch(pokemonURL)
    .then((response) => response.json())
    .then((data) => {
      // inspect the data and get the:
      // 1) name
      // 2) image (sprites/other/dream_world/front_default)
      // 3) type (forEach over the types)
      const types = data.types.map((type) => type.type.name);
      const pokeData = {
        name: data.name,
        imageUrl: data.sprites.other.dream_world.front_default,
        types: types,
      };
      // inject that stuff into the template with Mustache.render
      displayCardList(pokeData);
      // append that HTML into the container
      initDisplayInfo(cardContainer.lastElementChild, pokeData);
    });
};
const fetchPokeList = () => {
  fetch(allPokeUrl)
    .then((response) => response.json())
    .then((data) => {
      // for each in the array of objects (data.results)
      data.results.forEach((result) => {
        // get and fetch the single poke url
        fetchOnePoke(result.url);
      });
    });
};

// fetch allPokeUrl
fetchPokeList();
