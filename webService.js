const webServicePaths = require('./webServicePaths')
const express = require('express')
const fs = require('fs')
const pointInPolygon = require('point-in-polygon')
const webService = express()
let resourceJson = undefined
// console.log(resourceJson)

const getPolygonsCoordinates = (jsonString) => {
    let jsonObject = JSON.parse(jsonString)
    let featuresArray = jsonObject.features
    let polygonsCoordinates = new Map()
    for(let feature of featuresArray)
    {
        let name = feature.properties.name
        let coordinates = feature.geometry.coordinates[0]
        polygonsCoordinates.set(name, coordinates)
    }
    return polygonsCoordinates
}

fs.readFile("./polygons.json", "utf-8", (err, data) => {
    if(err) throw err
    resourceJson = data
})
// console.log(resourceJson)

webService.get(webServicePaths.isPointInPolygon_get, (req, res, next) => {
    const {lat, lon} = req.query
    console.log(`${lat} and ${lon}`)
    const polygonsCoordinates = getPolygonsCoordinates(resourceJson)
    let response = {polygons : []}
    polygonsCoordinates.forEach((coordinates, polygonName) => {
        if(pointInPolygon([lon, lat], coordinates))
        {
            response.polygons.push(polygonName)
        }
    })
    res.send(response)
    // console.log("salam")
    // res.send("Pouriya")
})

webService.listen(4002, () => {
    console.log("App Is Running")
})

