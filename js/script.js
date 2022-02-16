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

async function loadTable() {
  const response = await swapiGet("films/");
  const tableData = response.data.results;
  tableData.forEach((film) => {
    $("#films-table").append(
      `<tr>
      <td>${film.title}</td>
      <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
      <td>${film.director}</td>
      <td>${film.episode_id}</td>
      </tr>`
    );
  });
}

function swapiGet(params) {
  return axios.get(`https://swapi.dev/api/${params}`);
}

loadValues();
loadTable();

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
  const response = await swapiGet("vehicles/");
  const vehiclesArray = response.data.results;
  const dataArray = [];
  dataArray.push(["Veículos", "Passageiros"]);

  vehiclesArray.forEach((vehicle) => {
    dataArray.push([vehicle.name, Number(vehicle.passengers)]);
  });

  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    title: "Maiores veículos",
    legend: "none",
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}
