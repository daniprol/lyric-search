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
// function showData(data) {
//   let output = "";

//   data.data.forEach(song => {
//     output += `
//           <li>
//             <span><strong>${song.artist.name}</strong> - ${song.title}</span>
//             <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get lyrics</button>
//           </li>
//         `;
//   });
//   result.innerHTML = `
//     <ul class="songs">
//         ${output}
//     </ul>
//     `;
// }

// Newer way of showing data:
function showData(data) {
  result.innerHTML = `
        <ul class="songs">
            ${data.data
              .map(
                song => `
            <li>
                <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get lyrics</button>
            </li>`
              )
              .join("")}
        </ul>`;

  if (data.prev || data.next) {
    more.innerHTML = `
         ${
           data.prev
             ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
             : ""
         }
         ${
           data.next
             ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
             : ""
         }
        `;
  }
}
// Always remember to use the join() method after using map()!!!

// Get more songs when the 'next' button is pressed!
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

// Get lyrics button:
result.addEventListener("click", e => {
  //   console.log(e.target);
  const clickedEl = e.target;
  if (clickedEl.tagName === "BUTTON") {
    // console.log(123);
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});

// Get lyrics:
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  //   console.log(data);
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>`;

  more.innerHTML = "";
}
