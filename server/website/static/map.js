const TOM_TOM_API_KEY = "sAySjo9SKcvsUOpYgP6XTSmMqmpnGHEY"
const defaultFilters = [["tourism", "museum"]]
let radius = 10000
let waiting = false
const waitingTime = 2000
const infoBubble = document.querySelector("section.place-info")

const mapElement = document.querySelector(".map")

function watchPosition() {
    navigator.geolocation.watchPosition(showResults, showError)
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            window.location = window.location + "error/permission-denied"
            break
        case error.POSITION_UNAVAILABLE:
            window.location = window.location + "error/position-unavailable"
            break
        case error.TIMEOUT:
            window.location = window.location + "error/timeout"
            break
        case error.UNKNOWN_ERROR:
            window.location = window.location + "error/unknown-error"
            break
    }
}

function showResults(position) {
    showPosition(position)
}

function showPosition(position) {
    const lngLat = [position.coords.longitude, position.coords.latitude]
    const userElement = document.createElement("div")
    mapElement.appendChild(userElement)
    userElement.classList.add("user")

    const map = tt.map({
        key: TOM_TOM_API_KEY,
        container: mapElement,
        stylesVisibility: {
            trafficIncidents: true,
            trafficFlow: true
        },
        center: lngLat,
        zoom: 17
    })

    const user = new tt.Marker({
        element: userElement
    })
        .setLngLat(lngLat)
        .addTo(map)

    showPosition = function (position) {
        if (waiting) {
            return
        }
        waiting = true
        const lngLat = [position.coords.longitude, position.coords.latitude]
        user.setLngLat(lngLat)
        let filters = []

        document.querySelectorAll(".filters__subgroup:checked").forEach(filter => filters.push([filter.dataset.filterGroup, filter.dataset.filterSubgroup]))

        if (filters[0] === undefined) {
            filters = defaultFilters
        }

        const query = `[out:json];
        (${makeQuery(filters, radius, position).join(" ")});
        out center;`

        fetch(`https://overpass-api.de/api/interpreter?data=${query}`)
            .then(data => data.json())
            .then(response => {
                document.querySelectorAll(".node").forEach(node => node.remove())
                response.elements.forEach(node => {
                    const nodeElement = document.createElement("div")
                    nodeElement.onclick = () => {
                        console.log(node)
                        const title = document.querySelector("p.place-info__title")
                        const text = document.querySelector("p.place-info__text")
                        if (!infoBubble.classList.contains("place-info--hidden") && title.textContent == (node.tags.name || node.tags["name:en"])) {
                            infoBubble.classList.add("place-info--hidden")
                        } else {
                            title.textContent = node.tags.name || node.tags["name:en"]
                            text.innerHTML = `${(node.tags["addr:street"] && "Address: " + node.tags["addr:street"] + "<br>") || ""}
                            ${(node.tags["opening_hours"] && "Opening hours: " + node.tags["opening_hours"] + "<br>") || ""}
                            ${(node.tags["website"] && "Website: " + node.tags["website"] + "<br>") || ""}`
                            infoBubble.classList.remove("place-info--hidden")
                        }
                    }
                    mapElement.appendChild(nodeElement)
                    nodeElement.classList.add("node")
                    new tt.Marker({
                        element: nodeElement
                    })
                        .setLngLat([node.lon, node.lat])
                        .addTo(map)

                    // const popup = new tt.Popup({ offset: [0, -25] }).setHTML(node.tags.name || node.tags["name:en"])
                    // nodeMarker.setPopup(popup)
                    // nodeMarker.addEventListener("click", () => nodeMarker.togglePopup())
                })
            })
            .catch(() => {
                waiting = false
            })

        setTimeout(() => { waiting = false }, waitingTime)
    }

    showPosition(position)
}

watchPosition()

const filterBtn = document.querySelector("#filter-toggle")
const filtersPage = document.querySelector(".filters")
filterBtn.addEventListener("click", () => {
    filtersPage.classList.toggle("active")
})

const profileBtn = document.querySelector("#profile-toggle")
const profilePage = document.querySelector(".profile")
profileBtn.addEventListener("click", () => {
    profilePage.classList.toggle("active")
})

const blogBtn = document.querySelector("#blog-toggle")
const blogPage = document.querySelector(".blog")
blogBtn.addEventListener("click", () => {
    blogPage.classList.toggle("active")
})

const radiusSlider = document.querySelector("#slider")
const radiusValueBox = document.querySelector("#slider-value")

radiusSlider.value = 10
radiusValueBox.value = 10

radiusSlider.addEventListener("change", () => {
    radiusSlider.min = 1
    radiusSlider.max = 100
    radiusValueBox.value = radiusSlider.value
    radius = radiusValueBox.value * 1000
})

radiusValueBox.addEventListener("change", () => {
    radiusValueBox.value = Math.max(0, radiusValueBox.value)
    radiusValueBox.value = Math.min(radiusValueBox.value, 100)
    radiusSlider.value = radiusValueBox.value
    radius = radiusValueBox.value * 1000
})

// NOTE: "onbeforeunload" for addEventListener


function makeQuery(arr, radius, { coords: { latitude, longitude } }) {
    return arr.map(([group, subgroup]) => `node[${group}=${subgroup}](around:${radius}, ${latitude}, ${longitude});`)
}

if (document.querySelector("aside#profile").dataset["logged"] == "True") {
    fetch("/places")
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log(error))
}