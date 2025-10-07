document.querySelector("button").addEventListener("click", getCountryInfo);

function getCountryInfo() {
  const exploreCountry = document.getElementById("country").value;

  //restcountries api website https://restcountries.com/#rest-countries
  // include name, region, population, continent, coat of arms, flags, maps

  const url = `https://restcountries.com/v3.1/name/${exploreCountry}`;

  console.log(exploreCountry);

  fetch(url)
    .then((res) => {
      return res.json();
    })

    .then((data) => {
      console.log("restcountries sends info");

      console.log(data);
      document.querySelector("h2").innerText =`Capital: ${data[0].capital[0]} `;
      document.querySelector(
        "h3"
      ).innerText = ` Continent: ${data[0].continents[0]} | Population: ${data[0].population} | Region: ${data[0].region} `;

      const firstImg = document.getElementById("firstImg");
      firstImg.src = data[0]?.coatOfArms?.png || data[0]?.coatOfArms?.svg || "";

      const flagImg = document.getElementById("flag");
      flagImg.src = data[0]?.flags?.png || data[0]?.flags?.svg || "";

      // not working as embed so grabbed some help from chatgpt to open in new tab instead
      // document.querySelector("div").innerText = data[0]?.maps?.googleMaps || data[0]?.maps?.openStreetMaps || '';

      document.querySelector("div").innerHTML = `<a href="${
        data[0]?.maps?.googleMaps || data[0]?.maps?.openStreetMaps || ""
      }" target="_blank"> View on Map </a>`;

      // Get the first currency object from the currencies object on data[0].
      // Example: if data[0].currencies === { MXN: { name: "Mexican peso", symbol: "$" } }
      // then Object.values(...) returns [{ name: "Mexican peso", symbol: "$" }]
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values and help from Justin Joshi to realize we needed the word keys instead of values here
      const currency = Object.keys(data[0].currencies)[0];
      console.log(currency);

      // complete these and add second fetch
      //convert exchange rates api website https://docs.abstractapi.com/exchange-rates/live

      let urlNew = `https://exchange-rates.abstractapi.com/v1/live?api_key=edd05433fd364ca8aa878120797231e8&base=${currency}`;
      console.log("show me the currency", currency);
      fetch(urlNew)
        .then((res) => res.json())

        .then((data) => {
          console.log("exchange rates site sends info", data);

          const rate = data["exchange_rates"].USD;
          document.querySelector(
            "h5"
          ).innerText = `Exchange rate from USD: ${rate}`;
          console.log("show me the data", data);

        })
        .catch((err) => {
          console.error("error", err);
        });
    });
}
