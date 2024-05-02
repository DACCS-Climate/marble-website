document.addEventListener("DOMContentLoaded", function () {

    var homeButton = document.getElementById('homeMenuButton');
    var technologyButton = document.getElementById('technologyMenuButton');
    var nodeButton = document.getElementById('nodeMenuButton');
    var tutorialsButton = document.getElementById('tutorialsMenuButton');
    var communityButton = document.getElementById('communityMenuButton');
    var aboutButton = document.getElementById('aboutMenuButton');

    var currentURL = window.location.href;
    var currentPath = window.location.pathname;

    var navbar = document.getElementById("navbarSupportedContent");
    var bsOffcanvas = new bootstrap.Offcanvas(navbar)
    var navbarButton = document.getElementById("navbarButton");

    navbarButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        bsOffcanvas.toggle();
    })

    technologyButton.addEventListener("click", () => {
        bsOffcanvas.toggle();
    })

    if (currentPath.includes("index.html") && currentURL.includes("index.html#technology") == false) {
        homeButton.classList.add("text-primary");
        technologyButton.classList.remove("text-primary");
        nodeButton.classList.remove("text-primary");
        tutorialsButton.classList.remove("text-primary");
        communityButton.classList.remove("text-primary");
        aboutButton.classList.remove("text-primary");
    } else if (currentURL.includes("index.html#technology")) {
        homeButton.classList.remove("text-primary");
        technologyButton.classList.add("text-primary");
        nodeButton.classList.remove("text-primary");
        tutorialsButton.classList.remove("text-primary");
        communityButton.classList.remove("text-primary");
        aboutButton.classList.remove("text-primary");

    } else if (currentPath.includes("node.html")) {
        homeButton.classList.remove("text-primary");
        technologyButton.classList.remove("text-primary");
        nodeButton.classList.add("text-primary");
        tutorialsButton.classList.remove("text-primary");
        communityButton.classList.remove("text-primary");
        aboutButton.classList.remove("text-primary");
    } else if (currentPath.includes("about.html")) {
        homeButton.classList.remove("text-primary");
        technologyButton.classList.remove("text-primary");
        nodeButton.classList.remove("text-primary");
        tutorialsButton.classList.remove("text-primary");
        communityButton.classList.remove("text-primary");
        aboutButton.classList.add("text-primary");

    } else {
        homeButton.classList.remove("text-primary");
        technologyButton.classList.remove("text-primary");
        nodeButton.classList.remove("text-primary");
        tutorialsButton.classList.remove("text-primary");
        communityButton.classList.remove("text-primary");
        aboutButton.classList.remove("text-primary");
    }
})

function goToTechnology(){

}

