const personagens = document.querySelector("#personagens");
const especies = document.querySelector("#especies");
const planetas = document.querySelector("#planetas");
const naves = document.querySelector("#naves");

function loadValues() {
  Promise.all([
    swapiGet("people/"),
    swapiGet("vehicles/"),
    swapiGet("planets/"),
    swapiGet("starships/"),
  ]).then(function (results) {
    personagens.innerHTML = results[0].data.count;
    especies.innerHTML = results[1].data.count;
    planetas.innerHTML = results[2].data.count;
    naves.innerHTML = results[3].data.count;
  });
}

function swapiGet(params) {
  return axios.get(`https://swapi.dev/api/${params}`);
}

loadValues();
