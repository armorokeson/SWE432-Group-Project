// William Okeson
// G01349709

const updateTable = async () => {
    try {
        const response = await fetch('/listener?songs')

        if (response.ok) {
            const songs = await response.json()
            updateHtmlTable(songs)
        }
    } catch (err) {
        console.log('Error updating table: ', err)
    }
}

// Function to update the HTML table with the provided list of songs
const updateHtmlTable = (songs) => {
    let table = document.querySelector(".my-music table");

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    
    songs.forEach(song => {
        let newRow = table.insertRow();
        let nameCell = newRow.insertCell(0);
        let artistCell = newRow.insertCell(1);

        nameCell.textContent = song.title;
        artistCell.textContent = song.artist;
    });
};

// Event listener for when the plus icon is pressed to add a song to the playlist
document.getElementById("add-song").addEventListener("click", async () => {
    let numSongs = document.querySelector(".my-music table").rows.length + 1
    let newSong = {
        title: "Song " + (numSongs),
        artist: "Artist " + (numSongs),
    }

    try {
        const response = await fetch('/listener', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSong)
        })

        if (response.ok) {
            // Song added successfully
            await updateTable()
            console.log('Song added successfully');
        } else {
            // Handle error response
            console.error('Error adding song:', response.statusText);
        }
    } catch (err) {
        console.log(err)
    }
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

const deleteSong = async (song) => {
    const body = { title: song }
    try {
        const response = await fetch('/listener', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        if (response.ok) {
            await updateTable()
            console.log("Song successfully deleted")
        } else {
            console.log("Failed to delete song")
        }
    } catch (error) {
        console.log(error)
    }
}

