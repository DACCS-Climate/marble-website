options.forEach((option) => {
    option.button.onclick = () => {
        // only continue if changing which option is shown (replace will return false if d-none is not present)
        if (!option.div || option.div.classList.replace("d-none", "d-flex")) {
            option.button.classList.add("text-primary"); // change button color
            window.location.hash = option.hash;
            options.forEach((other) => {
                if (other !== option) {
                    if(other.div){
                        other.div.classList.replace("d-flex", "d-none"); // hide all other options
                    }
                    other.button.classList.remove("text-primary"); // revert button color of other options
                }
            })
        }
    }
})

setInitialOption = () => {
    if (window.location.hash) {
        options.forEach((option) => {
            if (`#${option.hash}` === window.location.hash) {
                option.button.click();
            }
        })
    }
}

// show selected option if hash is present when page is loaded
window.onload = setInitialOption

// call this function manually in case the window has already loaded since then the onload event will have already
// fired. This can happen if this script is loaded asynchronously.
if (document.readyState === "complete") {
    setInitialOption()
}