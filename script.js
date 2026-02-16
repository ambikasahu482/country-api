const countriesContainer = document.querySelector('.countries-container');
const filterByRegion = document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container input');
const themeChanger = document.querySelector('.theme-changer');

let allCountriesData = [];

// Load All Countries
async function getAllCountries() {
  try {
    const res = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital'
    );

    if (!res.ok) {
      throw new Error("API Error: " + res.status);
    }

    const data = await res.json();

    allCountriesData = data;
    renderCountries(data);

  } catch (err) {
    console.log(err);
  }
}

getAllCountries();


// Filter By Region
filterByRegion.addEventListener('change', async () => {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/region/${filterByRegion.value}?fields=name,flags,population,region,capital`
    );

    const data = await res.json();

    renderCountries(data);

  } catch (err) {
    console.log(err);
  }
});


// Render Countries
function renderCountries(data) {

  if (!Array.isArray(data)) {
    console.log("Invalid Data:", data);
    return;
  }

  countriesContainer.innerHTML = '';

  data.forEach((country) => {

    const countryCard = document.createElement('a');

    countryCard.classList.add('country-card');

    countryCard.href = `/country.html?name=${country.name.common}`;

    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common} flag" />

      <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>

        <p><b>Population:</b> ${country.population.toLocaleString('en-IN')}</p>

        <p><b>Region:</b> ${country.region}</p>

        <p><b>Capital:</b> ${country.capital?.[0] || "N/A"}</p>
      </div>
    `;

    countriesContainer.append(countryCard);
  });
}


// Search
searchInput.addEventListener('input', (e) => {

  const value = e.target.value.toLowerCase();

  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(value)
  );

  renderCountries(filteredCountries);
});


// Theme
themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});