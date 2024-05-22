let options = [
    {
        "div": document.getElementById("executiveCommittee"),
        "button": document.getElementById("executiveMenuButton"),
        "hash": "executive"
    },
    {
        "div": document.getElementById("scientificCommittee"),
        "button": document.getElementById("scientificMenuButton"),
        "hash": "scientific"
    }
]

{% include "partials/menu-options.js" %}
