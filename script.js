const apiURL = "https://api.lyrics.ovh";
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

// Event listeners:
form.addEventListener("submit", e => {
  e.preventDefault();

  const searchTerm = search.value.trim();
  //   console.log(searchTerm);

  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});

// Search by song or artist:
// function searchSongs(term) {
//   fetch(`${apiURL}/suggest/${term}`)
//     .then(res => res.json())
//     .then(data => console.log(data));
// }

// Now we'll make the search function but using async await:
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  //   console.log(data);
  showData(data);
}

// Show song and artist in DOM:
function showData(data) {}
