import Mustache from 'mustachejs';

// TODO write your code here

const allPokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';
const onePokeUrl = 'https://pokeapi.co/api/v2/pokemon/35';

// image: sprites/other/dream_world/front_default
// name
// type(s): types/type/name

//1- Select cards container and templates
const cardsContainer = document.querySelector('#cardsContainer');
const cardTemplate = document.querySelector('#cardTemplate');
const infoTemplate = document.querySelector('#infoTemplate');
const infoContainer = document.querySelector('#infoContainer');

const showPokeInfo = (pokeCard, pokeInfo) => {
  pokeCard.addEventListener("click", (event) => {
    console.log(event);
    const output = Mustache.render(infoTemplate.innerHTML, pokeInfo);
    infoContainer.innerHTML = output;
  });
}

//2- Fetch all the pokemons
fetch(allPokeUrl)
  .then((response) => response.json())
  .then((data) => {
    data.results.forEach(pokemon => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((data) => {
          const newCard = cardTemplate.innerHTML;
          const info = {
            imageUrl: data.sprites.other.dream_world.front_default,
            name: data.name,
            types: data.types
          }
          const output = Mustache.render(newCard, info);
          cardsContainer.insertAdjacentHTML("beforeend", output);
          showPokeInfo(cardsContainer.lastElementChild, info);
        });
    });
  });
//3- Iterate through the pokemons
//4- fetch information
//5- Update template for mustache
//6- Change cardsContainer by updating the template

