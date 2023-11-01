
    
    /**
     * Object record to populate the record div in the webpage.
     */
    let records = [
        {name: 'Vicarious', artist: 'Tool', album: '10000 Days'},
        {name: "Dreams", artist: "Fleetwood Mac", album: "Rumours"},
        {name: "The Grudge", artist: "Tool", album: "Lateralus"},
        {name: "Sober", artist: "Tool", album: "10000 Days"},
        {name: "Amari", artist: "J.Cole", album: "The Off-Season"},
        {name: "Tear in my Heart", artist: "21 Pilots", album: "BlurryFace"}
    ];

    console.log(records)

    records = records.map(obj => {
        if(obj.name === "Vicarious" && obj.artist === 'Tool') {
            return {...obj, name:"Jambi"};
        }
        return obj;
    });
     console.log(records)


    /**
     * Loop through each record in the object to read the input and
     * plug it in the RECORD UL.
     * 
     * This arrow function also provides option to add the music into
     * current playlist(MY MUSIC)
     */
    records.forEach((record) => {

        //Gettting record list by using its id.
        let ul = document.getElementById('rec-ul');
        
        // Creating and formatting the li to install in the list.
        let doc = document.createElement('li');
        doc.style.display = 'flex';
        doc.style.justifyContent = 'space-between';

        // Using record name to create li title.
        let text = document.createTextNode(record.name);

        // Creating and formatting the div that holds the add/cross options
        let div = document.createElement('div');
        div.style.marginRight = '1rem';
        div.style.background = '#ffffffcc';
        div.style.borderRadius = '50%';
        div.style.height = '1.4rem';
        div.style.width = '1.4rem';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';

        // i tag that gets '+' and 'x' icons from font awesome.
        let i = document.createElement('i');
        i.className = "fa fa-plus";
        i.style.color = "#000000cc";
        i.style.fontSize = "1.2rem";

        /**
         * 
         * Adding eventListener to i to get the icons to toggle between '+' and 'x'
         * This eventListener is active when user clicks the add option in every records.
         * The function attached to the eventListener also sends the record data to current
         * library to add the track in the table.  
         */ 
        i.addEventListener("click", function(e) {
            this.classList.toggle('fa-times');
            alert('Record is added');

            var table = document.getElementById('music-table');

            let newRow = table.insertRow(-1);
            
            let newtitle = newRow.insertCell(0);
            let newAlbum = newRow.insertCell(1);
            let newArtist = newRow.insertCell(2);

            newtitle.innerText = record.name;
            newAlbum.innerText = record.album;
            newArtist.innerText = record.artist;

        }, false);

        div.appendChild(i)
        doc.appendChild(text);
        doc.appendChild(div);
        ul.appendChild(doc);
    });

    /**
     * Inform user that they picked a certain time-slot!
     */
    const pth = document.getElementById('time-list').getElementsByTagName('li');
    for(var i = 0; i < pth.length; i++) {
        pth[i].addEventListener("click", function(e) {
            alert("Time picked: " + this.innerText);
        });
    }

    