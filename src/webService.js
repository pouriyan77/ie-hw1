const webServicePaths = require('./webServicePaths')
const express = require('express')
const fs = require('fs')
const pointInPolygon = require('point-in-polygon')
const webService = express()
const resourseFilePath = '../polygons.json'

const isResourceJsonUpdated = true
const polygonsCoordinates = undefined
let resourceJsonObject = undefined

const getPolygonsCoordinates = (jsonObject) => {
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

webService.use(express.urlencoded({
    extended: true
}))
webService.use(express.json())

webService.use(webServicePaths.testPoint_get, (req, res, next) => {
    if(isResourceJsonUpdated)
    {
       polygonsCoordinates = getPolygonsCoordinates(resourceJsonObject)
       console.log("Polygons coordinates updated");
       
       isResourceJsonUpdated = false
    }
    next()
})

webService.get(webServicePaths.testPoint_get, (req, res, next) => {
    const {lat, lon} = req.query
    console.log(`${lat} and ${lon} requested`)
    let response = {polygons : []}
    polygonsCoordinates.forEach((coordinates, polygonName) => {
        if(pointInPolygon([lon, lat], coordinates))
        {
            response.polygons.push(polygonName)
        }
    })
    res.send(response)
})

webService.put(webServicePaths.addPolygon_put, (req, res, next) => {
    let requestBody = req.body
    let response = {success : false}
    // response.success = true
    res.send((resourceJsonObject))
})


const writeGeoJsonToFile = (geoJsonString, filePath) => {
    fs.writeFile(filePath, geoJsonString, (err) => {
        if(err) throw err
        console.log("Resource File Updated");
    })
}


let port = process.env.PORT
if(port === null || port ==="")
{
    port = 8000;
}
webService.listen(8000, () => {
    // initially load file to memory
    fs.readFile(resourseFilePath, "utf-8", (err, data) => {
        if(err) throw "Cannot Read File"
        resourceJsonObject = JSON.parse(data)
    })

    // update resource file every 60 minutes
    setInterval(writeGeoJsonToFile(resourceJsonObject), 3600000)

    console.log("App Is Running:")
})

