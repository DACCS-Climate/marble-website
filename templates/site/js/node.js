const converters = {
    "_default": (val) => val,
    "contact": (val) => {
        mailto_link = document.createElement("a")
        mailto_link.setAttribute("href", `mailto:${val}`)
        mailto_link.classList.add("undecorated-link")
        mailto_link.innerText = val
        return mailto_link
    },
    "date_added": (val) => {
        let date = new Date(val);
        return date.toLocaleDateString();
    },
    "status":(val) =>{
        let node_status = document.createElement("span")
        node_status.innerText = capitalize(val);
        node_status.classList.add(val === "online" ? "node-online" : "node-offline")
        return node_status
    },
    "registration_status":(val) => {
        let registration_status_elem = document.getElementById("registration_status");
        registration_status_elem.classList.add("error-text");
        return capitalize(val);
    },
    "links": (val, node_info) => {
        const found_links = {}
        const link_elems = {
            "service": document.getElementById("node-name-link"),
            "authenticate": document.getElementById("node-sign-in-button"),
            "registration": document.getElementById("node-registration-link-button")
        }
        val.forEach(link => {
            if (link_elems[link.rel]) {
                if (link.rel === "registration" && node_info.registration_status === "closed") { return }
                found_links[link.rel] = true;
                Object.entries(link).forEach(([attr, value]) => link_elems[link.rel].setAttribute(attr, value));
            }
        })
        Object.entries(link_elems).forEach(([rel, elem]) => {
            if (!found_links[rel]) {
                elem.classList.add("disabled")
            }
        })
    },
    "services": (val) => {
        const services_row = document.createElement("div");
        services_row.id = "nodeServices";
        services_row.classList.add("d-flex", "flex-wrap", "justify-content-between", "width-node-services-div");

        val.forEach( (service, index) => {
            const node_card_template = document.getElementById("node-card-template")
            const node_card = node_card_template.content.cloneNode(true);

            const name_elem = node_card.getElementById("node-card-template-name")
            const desc_elem = node_card.getElementById("node-card-template-description")
            const link_elem = node_card.getElementById("node-card-template-link")
            const doc_elem = node_card.getElementById("node-card-template-doc")


            name_elem.id = `node-card-${index}-name`
            desc_elem.id = `node-card-${index}-description`
            link_elem.id = `node-card-${index}-link`
            doc_elem.id = `node-card-${index}-doc`

            name_elem.innerText = service.name.toUpperCase();

            desc_elem.innerText = service.description
            service.links.forEach(link => {
                if (link.rel === "service") {
                    Object.entries(link).forEach(([attr, value]) => link_elem.setAttribute(attr, value));
                } else if (link.rel === "service-doc") {
                    Object.entries(link).forEach(([attr, value]) => doc_elem.setAttribute(attr, value));
                }
            })
            services_row.appendChild(node_card)
        })
        return services_row
    }
}

const nodeBackgroundClass=[
    "node-planet-background1",
    "node-planet-background2",
    "node-planet-background3"
]


document.addEventListener("DOMContentLoaded", function () {
    const githubURL = "{{ node_registry_url }}";
    let options = [];
    fetch(githubURL).then(resp => resp.json()).then(json => {
        const menu_elem = document.getElementById("nodeMenu");
        const node_dropdown_container = document.getElementById("nodeDropdownContainer")
        const node_dropdown_content = document.getElementById("nodeDropdownContent")

        var node_keys = Object.keys(json);
        var node_count = node_keys.length;

        if (node_count > 0) {
            const url_params = new URLSearchParams(window.location.search);
            const param_node_key = url_params.get("node");
            const url_hash = window.location.hash;
            let hash_node_key;

            if(url_hash){
                hash_node_key = url_hash.replace("#","");
                // Display the node's information and services from the hash string.
                getNode(hash_node_key);
            }
            else{
                const default_node_key = json[param_node_key] ? param_node_key : node_keys[0]
                // Display the first node's information and services by default.
                getNode(default_node_key);
            }
        }

        // Node Menu
        // If number of nodes larger than initial_node_count, create a menu with these first nodes, and create a dropdown
        // for the rest. If not, just create a menu with the nodes in the node registry
        const initial_node_count = 3;
        node_keys.forEach((key, index) => {
            const node_menu_item = document.createElement('div'); //Replace h3 tag for mobile
            node_menu_item.id = key;
            node_menu_item.classList.add("node-menu-header", "margin-node-menu-item");
            node_menu_item.addEventListener("click", (event) => {
                event.stopPropagation();
                getNode(key);
            })
        
            node_menu_item.innerText = json[key].name;
            if (index < initial_node_count) {
                const h3_node_menu_item = document.createElement("a");
                h3_node_menu_item.setAttribute("tabindex",  '"' + index +'"' );
                h3_node_menu_item.classList.add("node-menu-item")
                h3_node_menu_item.appendChild(node_menu_item)
                menu_elem.insertBefore(h3_node_menu_item, node_dropdown_container);
            } else {
                const h5_dropdown_item = document.createElement('h5');
                h5_dropdown_item.classList.add("dropdown-menu-item")
                h5_dropdown_item.appendChild(node_menu_item)
                node_menu_item.setAttribute("tabindex", `${index - initial_node_count}`)
                node_dropdown_content.appendChild(h5_dropdown_item);
            }

            /*Builds options array to change colour of menu items in Node page and add hash to Node page URL*/
            let options_object = {};
            options_object["button"] = node_menu_item;
            options_object["hash"] = key;
            
            options.push(options_object);

        })
        /*Uses options array to change colour of menu items in Node page and add hash to Node page URL*/
        {% include "partials/menu-options.js" %}

        if (node_count <= initial_node_count) {
            node_dropdown_container.remove();
        }
    });
})

function getNode(node_id){
    const githubURL = "{{ node_registry_url }}";
    const imageDivClasses = ["d-flex", "flex-column", "node-image-background"];
    fetch(githubURL).then(resp => resp.json()).then(json => {

        const node_info = json[node_id];
        const node_keys = Object.keys(json);

        let imageDiv = document.getElementById("nodeImageDiv");
        imageDivClasses.push(nodeBackgroundClass[node_keys.indexOf(node_id) % nodeBackgroundClass.length]);
        let currentImageDivClasses = imageDiv.classList;
        imageDiv.classList.remove(...currentImageDivClasses);
        imageDiv.classList.add(...imageDivClasses);

        Object.entries(node_info).forEach(([key, val]) => {
            const elem = document.getElementById(key);
            const converted_val = (converters[key] || converters["_default"])(val, node_info)

            if (elem !== null) {
                elem.replaceChildren(converted_val);
            }
        })

        let services_title = document.getElementById("servicesTitle");
        services_title.innerText = `Explore All Services by ${node_info["name"]}`;
    })
}

function capitalize(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}