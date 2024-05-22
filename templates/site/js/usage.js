let options = [
    {
        "button": document.getElementById("studentMenuButton"),
        "div": document.getElementById("studentUser"),
        "hash": "usage-student"
    },
    {
        "button": document.getElementById("researcherMenuButton"),
        "div": document.getElementById("researcherUser"),
        "hash": "usage-researcher"
    },
    {
        "button": document.getElementById("hobbyistMenuButton"),
        "div": document.getElementById("hobbyistUser"),
        "hash": "usage-hobbyist"
    }
]

{% include "partials/menu-options.js" %}
