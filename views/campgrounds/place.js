const campgrounds = { 'features': [] }
for (let i = 0; i < '<%=l%>'; i++) {
    const lng = '<%= campgrounds[i].geometry.coordinates[0]%>'
    const lat = '<%= campgrounds[i].geometry.coordinates[1]%>'
    const geometry = { "type": "Point", "coordinates": [lng, lat] }
    campgrounds.features.push(geometry)
}