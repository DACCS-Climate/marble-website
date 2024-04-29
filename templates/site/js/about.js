let committee_options = [
    {
        "div": document.getElementById("executiveCommittee"),
        "button": document.getElementById("executiveMenuButton")
    },
    {
        "div": document.getElementById("scientificCommittee"),
        "button": document.getElementById("scientificMenuButton")
    },
]

committee_options.forEach((option) => {
    option.button.onclick = () => {
        // only continue if changing which committee is shown (replace will return false if d-none is not present)
        if (option.div.classList.replace("d-none", "d-flex")) {
            option.button.classList.add("text-primary"); // change button color
            committee_options.forEach((other) => {
                if (other !== option) {
                    other.div.classList.replace("d-flex", "d-none"); // hide all other committees
                    other.button.classList.remove("text-primary"); // revert button color of other committees
                }
            })
        }
    }
})
