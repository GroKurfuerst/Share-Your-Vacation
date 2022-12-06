mapboxgl.accessToken = accessToken
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [lng, lat], // starting position [lng, lat]
    zoom: 5, // starting zoom
    projection: 'globe' // display the map as a 3D globe
})
map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
})

new mapboxgl.Marker()
    .setLngLat([lng, lat])
    // .setPopup(
    //     new mapboxgl.Popup({ offset: 25 })
    //         .setHTML(
    //             `<h5>${campground.title}</h5>`
    //         )
    // )
    .addTo(map)
