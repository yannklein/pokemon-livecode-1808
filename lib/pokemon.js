// TODO write your code here

// import mustache
import Mustache from "mustachejs"
// select cardContainer
const container = document.querySelector("#cardsContainer");
const template = document.querySelector("#cardTemplate").innerHTML;
console.log(container);
console.log(template);
const urlPokemon = "https://pokeapi.co/api/v2/pokemon?limit=20";
// select cardTemplate
// console.log

// get the data from PokeAPI
fetch(urlPokemon)
.then(response => response.json())
.then((data) => {
  data.results.forEach((poke) => {
    const urlDetail = poke.url;
    fetch(urlDetail)
    .then(response => response.json())
      .then((data) => {
        console.log(data);
        const pokemon = {
          name: data.name,
          image: data.sprites.front_default,
          types: data.types.map((type) => type.type.name).join()
        }
        const output = Mustache.render(template, pokemon);
        container.insertAdjacentHTML("afterbegin", output);
      }
      )
    });
    // console.log(data.results);
  });
// exstract the results array from data
// iterate over the array 
// for each result we exstract the url 
// fetch again for second HTTP request
// exctract the name, image and types of the pokemons
// Put the data into template using mustache return a string
// insert JSON into HTML cardsContainer
