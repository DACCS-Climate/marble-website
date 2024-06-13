options.forEach((option) => {
    if(option.div){
        option.button.onclick = () => {
            // only continue if changing which option is shown (replace will return false if d-none is not present)
            if (option.div.classList.replace("d-none", "d-flex")) {
                option.button.classList.add("text-primary"); // change button color
                window.location.hash = option.hash;
                options.forEach((other) => {
                    if (other !== option) {
                        other.div.classList.replace("d-flex", "d-none"); // hide all other options
                        other.button.classList.remove("text-primary"); // revert button color of other options
                    }
                })
            }
        }
    }
    else{
        option.button.onclick = () => {
            // only continue if changing which option is shown (replace will return false if d-none is not present)
            option.button.classList.add("text-primary"); // change button color
            window.location.hash = option.hash;
            options.forEach((other) => {
                if (other !== option) {
                    other.button.classList.remove("text-primary"); // revert button color of other options
                }
            })
        }
    }
})

// show selected option if hash is present when page is loaded
window.onload = () => {
    if (window.location.hash) {
        options.forEach((option) => {
            if (`#${option.hash}` === window.location.hash) {
                option.button.click();
            }
        })
    }
}
