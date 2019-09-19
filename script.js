let alleSites;
const dest = document.querySelector("#templateModtager");
const temp = document.querySelector("#site_template");
let filter = "alle";
let køn = "begge";



document.addEventListener("DOMContentLoaded", getJson);



async function getJson() {
    let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/1Zq4nXm7sL2Vz-tsqLB3qSKQFgW6RReynNH7SS47RqWw/od6/public/values?alt=json");

    // console.log("jsonData", jsonData);

    alleSites = await jsonData.json();
    // console.log("alleSites", alleSites);
    visSites();
}

function visSites() {
    console.log("filter", filter);
    console.log("køn", køn);
    dest.innerHTML = "";
    alleSites.feed.entry.forEach(site => {
        if ((filter == "alle" || filter == site.gsx$kategori.$t) && (køn == "begge" || køn == site.gsx$underkategori.$t)) {

            const klon = temp.cloneNode(true).content;
            klon.querySelector(".navn").textContent = site.gsx$navn.$t;
            klon.querySelector(".billede1").src = "img/" + site.gsx$billede.$t + ".png";
            dest.appendChild(klon);

            dest.lastElementChild.addEventListener("click", () => {
                visSingle(site)
            });

            addEventlistenertoButtons();
        }
    })
}

function addEventlistenertoButtons() {
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering);
    })

    //    document.querySelectorAll(".filter_køn").forEach(elm => {
    //        elm.addEventListener("click", filtrering_køn);
    //    })

    // console.log("klik knap", addEventlistenertoButtons);
}

function filtrering() {
    filter = this.dataset.kategori;
    document.querySelector("h1").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    })

    this.classList.add("valgt");

    visSites();
    //console.log("filtrering sker", filtrering);
}

//function filtrering_køn() {
//    køn = this.dataset.køn;
//    visSites();
//    // console.log("filtrering_køn sker", filtrering_køn);
//}

function visSingle(site) {
    document.querySelector("#popup").style.display = "block";
    document.querySelector("#popup .lukpopup").addEventListener("click", lukSingle);

    document.querySelector(".enkeltSite h2").textContent = site.gsx$navn.$t;
    document.querySelector(".enkeltSite .billede").src = "img/" + site.gsx$billede.$t + ".png";
    document.querySelector(".enkeltSite a").href = site.gsx$hjemmeside.$t;
    document.querySelector(".enkeltSite p").textContent = site.gsx$tekst.$t;
    console.log("visSingle", visSingle);
}

function lukSingle() {
    document.querySelector("#popup").style.display = "none";
}
