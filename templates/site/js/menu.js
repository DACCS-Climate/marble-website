document.addEventListener("DOMContentLoaded", function () {

    var homeButton = document.getElementById('homeMenuButton');
    var technologyButton = document.getElementById('technologyMenuButton');
    var nodeButton = document.getElementById('nodeMenuButton');
    var tutorialsButton = document.getElementById('tutorialsMenuButton');
    var communityButton = document.getElementById('communityMenuButton');
    var aboutButton = document.getElementById('aboutMenuButton');

    technologyButton.addEventListener("click", function(event){
        //window.location.href="index.html#technology";
        //event.preventDefault();
        //return true;
        var navbar = document.getElementById("navbarSupportedContent");
        //var bsOffcanvas = new bootstrap.Offcanvas(navbar)
        var offcanvasPanel = bootstrap.Offcanvas.getInstance(navbar);
        offcanvasPanel.toggle();
        window.location.href = "index.html#technology";
        //hide.bs.offcanvas
    });

    var currentURL = window.location.href;
    var currentPath = window.location.pathname;

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

