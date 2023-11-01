// William Okeson
// G01349709

let numSongs = 3

// Event listener for when the plus icon is pressed to add a song to the playlist
document.getElementById("add-song").addEventListener("click", () => {
    let table = document.querySelector(".my-music table");
    let newRow = table.insertRow();

    let nameCell = newRow.insertCell(0);
    let artistCell = newRow.insertCell(1);

    numSongs++
    let newSong = {
        name: "Song " + (numSongs),
        artist: "Artist " + (numSongs)
    }

    nameCell.textContent = newSong.name
    artistCell.textContent = newSong.artist
})

// click event type: pressing "p" will play/pause the audio
let audio = document.getElementById("audio-player")
const pause = () => {
    if (!audio.paused) {
        audio.pause()
    } else {
        audio.play()
    }
}

document.addEventListener("keydown", (e) => {
    if (e.isComposing || e.key === 'p') {
        pause()
    }
})

// form validation
function validateReview(event) {
    let formData = document.forms["reviewForm"]["review-text"].value;
    if (formData == "") {
        alert("Cannot submit blank review")
        return false
    }
}

// sort songs alphabetically (will work more when we have more songs)
function sortSongs(songs) {
    let rows, switching, i, x, y, shouldSwitch;
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < rows.length - 1; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[0];
            y = rows[i + 1].getElementsByTagName("td")[0];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

