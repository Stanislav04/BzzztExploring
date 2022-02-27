const TOM_TOM_API_KEY = "sAySjo9SKcvsUOpYgP6XTSmMqmpnGHEY"

const mapElement = document.querySelector("map")

function watchPosition() {
    navigator.geolocation.watchPosition(showResults, showError)
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            window.location = window.location + "/permission_denied"
            break
        case error.POSITION_UNAVAILABLE:
            window.location = window.location + "/position_unavailable"
            break
        case error.TIMEOUT:
            window.location = window.location + "/timeout"
            break
        case error.UNKNOWN_ERROR:
            window.location = window.location + "/unknown_error"
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
        zoom: 16
    })

    const user = new tt.Marker({
        element: userElement
    })
        .setLngLat(lngLat)
        .addTo(map)

    showPosition = function (position) {
        const lngLat = [position.coords.longitude, position.coords.latitude]
        user.setLngLat(lngLat)

        const data = ``

        fetch(`http://overpass-api.de/api/interpreter?data=${data}`)
            .then(data => data.json())
            .then(response => {
                document.querySelector("node").forEach(node => node.remove())
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
    }
}

watchPosition()