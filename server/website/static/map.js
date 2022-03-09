const TOM_TOM_API_KEY = "sAySjo9SKcvsUOpYgP6XTSmMqmpnGHEY"
const defaultFilters = [["tourism", "museum"]]
const radius = 10000
let waiting = false
const waitingTime = 2000

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

        fetch(`http://overpass-api.de/api/interpreter?data=${query}`)
            .then(data => data.json())
            .then(response => {
                document.querySelectorAll(".node").forEach(node => node.remove())
                response.elements.forEach(node => {
                    const nodeElement = document.createElement("div")
                    mapElement.appendChild(nodeElement)
                    // nodeElement.classList.add("")
                    nodeElement.classList.add("node")
                    new tt.Marker({
                        element: nodeElement
                    })
                        .setLngLat([node.lon, node.lat])
                        .addTo(map)
                })
            })
            .catch(error => {
                waiting = false
            })
        makeQuery([[1, 1], [2, 2], [3, 3]], 45, position)

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

// NOTE: "onbeforeunload" for addEventListener


function makeQuery(arr, radius, { coords: { latitude, longitude } }) {
    return arr.map(([group, subgroup]) => `node[${group}=${subgroup}](around:${radius}, ${latitude}, ${longitude});`)
}