const searchbtn = document.getElementById("searchbtn");
const clearbtn = document.getElementById("clearbtn");
const result = document.getElementById("resultContainer");
const mydiv = document.getElementById("dropdown");
const close = document.getElementById("close-btn");
const query = document.getElementById("searchinput");

const clearsearch = () => {
  query.value = "";
  mydiv.style.display = "none";
  result.innerHTML = ""; // Clear previous results
  console.log("Clearing");
};

clearbtn.addEventListener("click", clearsearch);

const showResult = (name, img, info) => {
  mydiv.style.display = "block";

  result.innerHTML += `
    <div class="search-result">
      <h2 class="title">${name}</h2>
      <img class="search-img" src="${img}" alt="${name}">
      <p class="description">${info}</p>
    </div>
    <br/>
  `;
};

const closeDropdown = () => {
  mydiv.style.display = "none";
  query.value = "";
  result.innerHTML = "";
};

close.addEventListener("click", closeDropdown);

const searchError = () => {
  mydiv.style.display = "block";

  result.innerHTML = "<p class='notfound'>Sorry, we can't find your search</p>";
};

fetch("travelrecommendation.json")
  .then((res) => res.json())
  .then((data) => {
    const search = () => {
      const searchQuery = query.value.trim().toLowerCase();

      // Clear previous results
      result.innerHTML = "";
      let notfound = true;

      // Search through countries and cities
      data.countries.forEach((country) => {
        country.cities.forEach((city) => {
          if (
            city.name.toLowerCase().includes(searchQuery) ||
            city.description.toLowerCase().includes(searchQuery)
          ) {
            showResult(city.name, city.imageUrl, city.description);
            notfound = false;
          }
        });
      });

      // Search through temples
      data.temples.forEach((temple) => {
        if (temple.name.toLowerCase().includes(searchQuery)) {
          showResult(temple.name, temple.imageUrl, temple.description);
          notfound = false;
        }
      });

      // Search through beaches
      data.beaches.forEach((beach) => {
        if (beach.name.toLowerCase().includes(searchQuery)) {
          showResult(beach.name, beach.imageUrl, beach.description);
          notfound = false;
        }
      });

      // If no matches found, display error
      if (notfound) {
        searchError();
      }
    };

    searchbtn.addEventListener("click", search);

    query.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        search();
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    mydiv.style.display = "block";
    result.innerHTML =
      "<p class='notfound'>An error occurred while fetching data.</p>";
  });
