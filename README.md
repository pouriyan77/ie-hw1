# HW1
in this project there is a webservice that has three HTTP API.

* GET(/gis/testpoint) : that has two query parameters(lat, lon). after sending a request with these parameters(describing a 2D point) it says which polygons in the resourse file(polygons.json) include this point.
* PUT(/gis/addpolygon) : you should send a json that describe a polygon in the body of this request to add it to resource file.
* GET(/gis/getResourceFileContents): this request do not want any params and it returns the contents of resource file(polygons.json)

## What I Have Done

when the web service starts running, the content of the resource file(polygons.json) will be load to the memory and it sets a callback that will write the json in the memory to the resource file every 30 minutes.


### Test a point
when you test a point using first get request it will send you a json like this

https://hidden-falls-13184.herokuapp.com/gis/testPoint/?lat=34.03445260967645&lon=416.25

```JSON
{
    "polygons": [
        "poly2",
        "poly4"
    ]
}
```

### Add a polygon

when you want to add a polygon it will send you a json:

https://hidden-falls-13184.herokuapp.com/gis/addpolygon

on success:

```JSON
{
    "success": true,
    "message": "New Polygon Added"
}
```

when send a non-json file:

```JSON
{
    "success": false,
    "message": "Wrong Json Format"
}
```

### Get contents of the resource file(polygons.json)

https://hidden-falls-13184.herokuapp.com/gis/getResourceFileContents

```JSON
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "stroke": "#555555",
                "stroke-width": 2,
                "stroke-opacity": 1,
                "fill": "#555555",
                "fill-opacity": 0.5,
                "name": "poly1"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            413.173828125,
                            36.94989178681327
                        ],
                        [
                            403.9453125,
                            32.62087018318113
                        ],
                        [
                            417.12890625,
                            35.31736632923788
                        ],
                        [
                            413.173828125,
                            36.94989178681327
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "stroke": "#555555",
                "stroke-width": 2,
                "stroke-opacity": 1,
                "fill": "#555555",
                "fill-opacity": 0.5,
                "name": "poly2"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            413.96484375,
                            35.24561909420681
                        ],
                        [
                            405.52734375,
                            26.902476886279832
                        ],
                        [
                            413.9208984375,
                            24.046463999666567
                        ],
                        [
                            416.4697265625,
                            34.19817309627726
                        ],
                        [
                            413.96484375,
                            35.24561909420681
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "stroke": "#555555",
                "stroke-width": 2,
                "stroke-opacity": 1,
                "fill": "#555555",
                "fill-opacity": 0.5,
                "name": "poly3"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            411.94335937499994,
                            35.137879119634185
                        ],
                        [
                            402.36328125,
                            29.305561325527698
                        ],
                        [
                            417.08496093749994,
                            29.99300228455108
                        ],
                        [
                            415.283203125,
                            37.19533058280065
                        ],
                        [
                            411.94335937499994,
                            35.137879119634185
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "stroke": "#555555",
                "stroke-width": 2,
                "stroke-opacity": 1,
                "fill": "#555555",
                "fill-opacity": 0.5,
                "name": "poly4"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            421.962890625,
                            39.16414104768742
                        ],
                        [
                            404.12109375,
                            37.92686760148135
                        ],
                        [
                            403.24218749999994,
                            25.997549919572112
                        ],
                        [
                            421.435546875,
                            25.284437746983055
                        ],
                        [
                            421.962890625,
                            39.16414104768742
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "stroke": "#555555",
                "stroke-width": 2,
                "stroke-opacity": 1,
                "fill": "#555555",
                "fill-opacity": 0.5,
                "name": "poly5"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            429.65332031249994,
                            43.16512263158296
                        ],
                        [
                            423.6328125,
                            35.817813158696616
                        ],
                        [
                            430.48828125,
                            28.76765910569123
                        ],
                        [
                            434.8828125,
                            31.728167146023935
                        ],
                        [
                            428.818359375,
                            36.03133177633187
                        ],
                        [
                            429.65332031249994,
                            43.16512263158296
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "stroke": "#555555",
                "stroke-width": 2,
                "stroke-opacity": 1,
                "fill": "#555555",
                "fill-opacity": 0.5,
                "name": "poly6"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            424.9951171875,
                            44.02442151965934
                        ],
                        [
                            431.6748046875,
                            41.409775832009565
                        ],
                        [
                            434.2236328125,
                            43.70759350405294
                        ],
                        [
                            424.9951171875,
                            44.02442151965934
                        ]
                    ]
                ]
            }
        }
    ]
}
```

## Deployment

this application has deployed on [Heroku](https://heroku.com):

root directory:
https://hidden-falls-13184.herokuapp.com

## Load Testing

the result of load testing using [Artillery](https://artillery.io/) has shown below:

This command will create 1000 "virtual users" each of which will send 20 HTTP GET requests to
https://hidden-falls-13184.herokuapp.com/gis/testPoint/

```
artillery quick --count 1000 -n 20 https://hidden-falls-13184.herokuapp.com/gis/testPoint/
```

and the result is:

```artillery
All virtual users finished
Summary report @ 16:44:20(+0330) 2019-10-24
  Scenarios launched:  1000
  Scenarios completed: 670
  Requests completed:  13400
  RPS sent: 97.84
  Request latency:
    min: 168.4
    max: 119914.5
    median: 184
    p95: 804.1
    p99: 93812.6
  Scenario counts:
    0: 1000 (100%)
  Codes:
    200: 13400
  Errors:
    ETIMEDOUT: 330
```


