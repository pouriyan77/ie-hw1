const webServicePaths = require('./webServicePaths')
const express = require('express')
const fs = require('fs')
const pointInPolygon = require('point-in-polygon')
const webService = express()
const resourceFilePath = './polygons.json'

let isResourceJsonUpdated = true
let polygonsCoordinates = undefined
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

webService.get(webServicePaths.getResourceFileContents_get, (req, res) => {
    res.send(resourceJsonObject)
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


webService.use(webServicePaths.addPolygon_put, (err, req, res, next) => {
    // handle not json bodies
    if(err.status === 400)
    {
        const errorMessage = "Wrong Json Format"
        let response = {success : false,
            message : `${errorMessage}`}

        console.log(errorMessage);
        
        return res.send(response);
    }
    next()
  });

webService.put(webServicePaths.addPolygon_put, (req, res, next) => {
    const successMessage = "New Polygon Added";
    let requestBody = req.body
    let response = {success : true,
                    message : `${successMessage}`}
    
    // update resource json object
    resourceJsonObject.features.push(requestBody)
    isResourceJsonUpdated = true
    console.log(successMessage);
    
    res.send(response)
})

let port = process.env.PORT
if(port === null || port ==="")
{
    port = 8000;
}
webService.listen(port, () => {
    // initially load file to memory
    fs.readFile(resourceFilePath, "utf-8", (err, data) => {
        if(err) throw "Cannot Read File"
        resourceJsonObject = JSON.parse(data)
        console.log("File Loaded to memory");
    })

    const writeGeoJsonToFile = (geoJsonString, filePath) => {
        fs.writeFile(filePath, geoJsonString, (err) => {
            if(err) throw err
            console.log("Resource File Updated");
        })
    }
    
    // update resource file every 60 minutes
    setInterval(() => {
        writeGeoJsonToFile(JSON.stringify(resourceJsonObject), resourceFilePath)
    }, 36000)

    console.log("App Is Running:")
})

