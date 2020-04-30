let url = "https://gist.githubusercontent.com/imWildCat/e033a98668c11e195a01d616e9925318/raw/bb6e8b4a1f7b736486117a2ca1b7cc4f01bfc99b/uk_cities.json"

let cities = [];
fetch(url)
  .then(blob => blob.json())
  .then(data => cities.push(...data)); //fetch is a promise so we use .then and blob.json() - which returns ANOTHER promise
function filterMatches(wordToMatch, cities) {
  return cities.filter(item => item.en_name.toLowerCase().includes(wordToMatch.toLowerCase()) || item.cn_name.includes(wordToMatch));
}

function displayMatches() {
  const matches = filterMatches(this.value, cities);
  let html = matches.map(city => {
    //const regex = new RegExp(this.value, "gi");
    //let cityName = city.en_name.replace(regex, `<span class="hl">${this.value}</span>`);
    let cityName = city.en_name.toLowerCase().replace(this.value.toLowerCase(), `<span class="hl">${this.value}</span>`);
    let cityNameCn = city.cn_name.replace(this.value, `<span class="hl">${this.value}</span>`);
    return `<li>
              <span>${cityName}</span>
              <span>${cityNameCn}</span>
            </li>`;
  }).join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);