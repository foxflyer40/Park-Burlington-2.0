require('dotenv').config()

requestAnimationFrame()
async function initMap() {
  const mapData = await fetch("./BurlingtonParkingMap.geojson").then( res => res.json()).then( res => res)
  src = https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}&libraries=places&callback=initMap
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.478081, lng: -73.215},
    zoom: 15.3,
    styles: [
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "transit",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "transit.station.bus",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "on"
          }
        ]
      }
    ]
  });

  // Import parking map geojson file
  map.data.addGeoJson(mapData)

  // Import styles from mapData objects
  map.data.setStyle(function(feature) {
    let fillC = feature.getProperty('fill');
    let fillO = feature.getProperty('fill-opacity')
    let strokeC = feature.getProperty('stroke')
    let strokeO = feature.getProperty('stroke-opacity')
    let strokeW = feature.getProperty('stroke-width')
    
    return {
      fillColor: fillC,
      fillOpacity:  fillO,
      strokeColor: strokeC,
      strokeOpacity: strokeO,
      strokeWeight: strokeW,
    };
});
  var card = document.getElementById('pac-card');
  var input = document.getElementById('pac-input');
  var types = document.getElementById('type-selector');
  var strictBounds = document.getElementById('strict-bounds-selector');
  

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
  
  var autocomplete = new google.maps.places.Autocomplete(input);

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo('bounds', map);

  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(
      ['address_components', 'geometry', 'icon', 'name']);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindowContent.children['place-icon'].src = place.icon;
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-address'].textContent = address;
    infowindow.open(map, marker);
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    radioButton.addEventListener('click', function() {
      autocomplete.setTypes(types);
    });
  }

  setupClickListener('changetype-all', []);
  setupClickListener('changetype-address', ['address']);
  setupClickListener('changetype-establishment', ['establishment']);
  setupClickListener('changetype-geocode', ['geocode']);

  document.getElementById('use-strict-bounds')
      .addEventListener('click', function() {
        console.log('Checkbox clicked! New state=' + this.checked);
        autocomplete.setOptions({strictBounds: this.checked});
      });
}

const mapData = 
{
  "type": "FeatureCollection",
  "features": [
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.217678,
                          44.4781677,
                          0
                      ],
                      [
                          -73.2176509,
                          44.477749,
                          0
                      ],
                      [
                          -73.2175826,
                          44.4777498,
                          0
                      ],
                      [
                          -73.2175806,
                          44.4777208,
                          0
                      ],
                      [
                          -73.2165826,
                          44.4777508,
                          0
                      ],
                      [
                          -73.2166066,
                          44.4782258,
                          0
                      ],
                      [
                          -73.2175976,
                          44.4782028,
                          0
                      ],
                      [
                          -73.2176036,
                          44.4781688,
                          0
                      ],
                      [
                          -73.217678,
                          44.4781677,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "COLLEGE STREET GARAGE",
              "styleUrl": "#poly-7CB342-1701-105",
              "styleHash": "-5335bebf",
              "styleMapHash": {
                  "normal": "#poly-7CB342-1701-105-normal",
                  "highlight": "#poly-7CB342-1701-105-highlight"
              },
              "description": "<img src=\"https://doc-10-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/c9ven2kh1k5l9hqlpl63s1ifqo/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpVRJewyJwLf1gWm5xnNjnPT2cgugyL8ymzuk0Mdv6oLSjb0BgBDg6VfvKKromKrhNpMgqA3xCbSIUguax4eC88ykNRUXsvZDu7eTXYU2f-K29RB6k1UEgtfANKMEyr__L_XpSPO2JPXxl7PFCvIlmjK55f6TN-53QxLvdtft8Su29WF08-06flIMTZxTSE2P6wHY2hJ0KeNJORr9_SHiFG1MMx3XNT0IYX_YXnHV9QyepRx5nof4pHd4p4X4yuF3wG1SoYCFj9b1EBrx5r4E_jUm54OA?session=0&fife\" height=\"200\" width=\"auto\" /><br><br>Capacity:\t460<br>Address:\t60 College St<br>Public Access:\t24/7 <br>0-2 HRs:\tFree<br>2-4 HRs:\t$2 to $5<br>4-7 HRs:\t$6 to $8<br>Daily Max:\t$8 <br>*FREE on Sundays and city-recognized holidays<br>Accepts: Credit Card, Cash<br><br><img src=\"https://doc-00-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/ovktdplbnl32hdu0kgos7ehdnc/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqf4ARtQI3e0qXZtJ7T98Kdbll6Un1nphfcvjU5GIVPqe2CUxFS-zynQ0XyWUrxoetc8Fc_j8LbBFbeeQQ9Hy-QFBuGwoHn8rGtquXuOtyCdZcdomZLeKPDgH8E-U93sx1Xa-7pZzhdNBnUNqR40zrI8d6kpaqozASRE0qsA3bo7Ktv0B16s_5CtvxzMZ4AE2-M6FfLxGWcUM_JQRAxZLYCSqcqWkd592PKUgBV8tiZXX9tPeLuhrj_qIsAorxUtkFuivJFLjIMlsRwOcXTuyABc_0_Lg?session=0&fife\" height=\"200\" width=\"auto\" /><br><br><img src=\"https://doc-0s-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/m09pmi3b1hpk0f6uifs20ao3js/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpv64mEOttLOtvRqizrqxVW-gabPZP43TMIt70vExfnmAtLDirP9EVolad8YKZwIJr73R1jyPovstWRKjnx4pgcYMEmU56r1HACMHaRUj61qxzWjswFR-JiqIPkFfMjup51Q2w-eBORvQuAshMr6DNGwcNupiibhaWFxo24-Yks3lJtDzz7JYWzUbN2tjS4M5ar4cfMIQUJrfzm9i0dpdGd_nKsiMTia_6CtXoP7olMDiY2SLc5EwSgpo9J4j2DO-urDqF9bCv_gSpYOdGmKztSCQurkQ?session=0&fife\" height=\"200\" width=\"auto\" />",
              "stroke": "#7cb342",
              "stroke-opacity": 1,
              "stroke-width": 1.701,
              "fill": "#7cb342",
              "fill-opacity": 0.4117647058823529,
              "gx_media_links": "https://doc-10-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/c9ven2kh1k5l9hqlpl63s1ifqo/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpVRJewyJwLf1gWm5xnNjnPT2cgugyL8ymzuk0Mdv6oLSjb0BgBDg6VfvKKromKrhNpMgqA3xCbSIUguax4eC88ykNRUXsvZDu7eTXYU2f-K29RB6k1UEgtfANKMEyr__L_XpSPO2JPXxl7PFCvIlmjK55f6TN-53QxLvdtft8Su29WF08-06flIMTZxTSE2P6wHY2hJ0KeNJORr9_SHiFG1MMx3XNT0IYX_YXnHV9QyepRx5nof4pHd4p4X4yuF3wG1SoYCFj9b1EBrx5r4E_jUm54OA?session=0&fife https://doc-00-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/ovktdplbnl32hdu0kgos7ehdnc/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqf4ARtQI3e0qXZtJ7T98Kdbll6Un1nphfcvjU5GIVPqe2CUxFS-zynQ0XyWUrxoetc8Fc_j8LbBFbeeQQ9Hy-QFBuGwoHn8rGtquXuOtyCdZcdomZLeKPDgH8E-U93sx1Xa-7pZzhdNBnUNqR40zrI8d6kpaqozASRE0qsA3bo7Ktv0B16s_5CtvxzMZ4AE2-M6FfLxGWcUM_JQRAxZLYCSqcqWkd592PKUgBV8tiZXX9tPeLuhrj_qIsAorxUtkFuivJFLjIMlsRwOcXTuyABc_0_Lg?session=0&fife https://doc-0s-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/m09pmi3b1hpk0f6uifs20ao3js/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpv64mEOttLOtvRqizrqxVW-gabPZP43TMIt70vExfnmAtLDirP9EVolad8YKZwIJr73R1jyPovstWRKjnx4pgcYMEmU56r1HACMHaRUj61qxzWjswFR-JiqIPkFfMjup51Q2w-eBORvQuAshMr6DNGwcNupiibhaWFxo24-Yks3lJtDzz7JYWzUbN2tjS4M5ar4cfMIQUJrfzm9i0dpdGd_nKsiMTia_6CtXoP7olMDiY2SLc5EwSgpo9J4j2DO-urDqF9bCv_gSpYOdGmKztSCQurkQ?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.2170104,
                          44.4782703,
                          0
                      ],
                      [
                          -73.2170414,
                          44.4790907,
                          0
                      ],
                      [
                          -73.2177609,
                          44.4790623,
                          0
                      ],
                      [
                          -73.2177124,
                          44.4788763,
                          0
                      ],
                      [
                          -73.2177134,
                          44.4782523,
                          0
                      ],
                      [
                          -73.2170104,
                          44.4782703,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "LAKEVIEW GARAGE",
              "styleUrl": "#poly-7CB342-1501-110",
              "styleHash": "8e7bf17",
              "styleMapHash": {
                  "normal": "#poly-7CB342-1501-110-normal",
                  "highlight": "#poly-7CB342-1501-110-highlight"
              },
              "description": "<img src=\"https://doc-0c-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/be6p22626lqlduvfe6niotk1g0/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALr2mc6g1Cw24D-_4RNcfQfedrkHOZjQ1xNz5LurX1yWqth4PdCyYe6s7XiLcAmMxcF2GKAkU48xXfQ-PVJhWkDpm3T5LaPLubC8xr0CuK96E66GBox8DnHl1gY4PGXHF6rAgg6tqNuH3eUMQ4hw5mO_mj7ksdPNV7uGxEA3sm-z_VRICAZbzvY5XAVmTvscYfdhQO3CQWmpI4S-2Z425XVBtqOaUZysblfJ75WdILLVHX4ze_MaRIcU80PmA7i6NomAS6NCZWcTlLzlIOk1qMPdgKh48Q?session=0&fife\" height=\"200\" width=\"auto\" /><br><br>Capacity:\t678<br>Address:\t41 Cherry St<br>Public Access:\t24/7, 365<br> 0-2hrs:\tFree<br> 2-4hrs:\t$2 to $5<br> 4-7hrs:\t$6 to $8<br> Daily Max:\t$8<br>*FREE on Sundays and city-recognized holidays<br>Accepts: Credit Card, Cash<br><br><img src=\"https://doc-0o-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/1tttfmpus3giggpsrs6v6go7n4/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALoFKTKYuLhRxkqSYi4uuhLa0LjfwUHb3C3E3Qt4IgPTtYPDPba_MTAX1F2BKquPbxpwV6-T7GJnVf62mvUcAXndzsTHZHq5zEKwc_WROS_eZZNXPlmTOQkCO1A0LOoWi8Lr0H3H1tzVCyeaaoQd7g_-UvUUG3UAc5NStSyj-3Q2EvXjUhmfhdB0AywF08l7aDS9VxXVjea-VoOIe7WWuQLd5C36c8RDzlKirmW1OCLXeeXERVA7dcbiyaBtMoP-3md6g-HGZajhJAZqOyOL-lQyFCpLlA?session=0&fife\" height=\"200\" width=\"auto\" />",
              "stroke": "#7cb342",
              "stroke-opacity": 1,
              "stroke-width": 1.501,
              "fill": "#7cb342",
              "fill-opacity": 0.43137254901960786,
              "gx_media_links": "https://doc-0c-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/be6p22626lqlduvfe6niotk1g0/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALr2mc6g1Cw24D-_4RNcfQfedrkHOZjQ1xNz5LurX1yWqth4PdCyYe6s7XiLcAmMxcF2GKAkU48xXfQ-PVJhWkDpm3T5LaPLubC8xr0CuK96E66GBox8DnHl1gY4PGXHF6rAgg6tqNuH3eUMQ4hw5mO_mj7ksdPNV7uGxEA3sm-z_VRICAZbzvY5XAVmTvscYfdhQO3CQWmpI4S-2Z425XVBtqOaUZysblfJ75WdILLVHX4ze_MaRIcU80PmA7i6NomAS6NCZWcTlLzlIOk1qMPdgKh48Q?session=0&fife https://doc-0o-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/1tttfmpus3giggpsrs6v6go7n4/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALoFKTKYuLhRxkqSYi4uuhLa0LjfwUHb3C3E3Qt4IgPTtYPDPba_MTAX1F2BKquPbxpwV6-T7GJnVf62mvUcAXndzsTHZHq5zEKwc_WROS_eZZNXPlmTOQkCO1A0LOoWi8Lr0H3H1tzVCyeaaoQd7g_-UvUUG3UAc5NStSyj-3Q2EvXjUhmfhdB0AywF08l7aDS9VxXVjea-VoOIe7WWuQLd5C36c8RDzlKirmW1OCLXeeXERVA7dcbiyaBtMoP-3md6g-HGZajhJAZqOyOL-lQyFCpLlA?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.212245,
                          44.478632,
                          0
                      ],
                      [
                          -73.212229,
                          44.478315,
                          0
                      ],
                      [
                          -73.21168,
                          44.478334,
                          0
                      ],
                      [
                          -73.211702,
                          44.478724,
                          0
                      ],
                      [
                          -73.211273,
                          44.478743,
                          0
                      ],
                      [
                          -73.211287,
                          44.479061,
                          0
                      ],
                      [
                          -73.211837,
                          44.479041,
                          0
                      ],
                      [
                          -73.211813,
                          44.478651,
                          0
                      ],
                      [
                          -73.212245,
                          44.478632,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "MARKETPLACE GARAGE",
              "styleUrl": "#poly-7CB342-2101-105",
              "styleHash": "66bf2b6d",
              "styleMapHash": {
                  "normal": "#poly-7CB342-2101-105-normal",
                  "highlight": "#poly-7CB342-2101-105-highlight"
              },
              "description": "<img src=\"https://doc-00-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/34op07sc5gd2v5m7fglu2o0lak/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALo-0Jy-bNAy7P2cSvmI8xzAxtl3NatrjpNZVCSDMa7e9YY0gZMDDuAGH9a4VZ_WVTDlnXBoVdKpzFcmZVy-MJivcZ0GWoCmLsnV511Yz7T_yVHmKxzTXWJrk2WxPOcEHzOgJrR19O-ZWQI1UOs1HR23goStiFuUEqo7jTvU4RcjDnJHJAJfKjwCl8DLzrC1VGP5uFmBhBAGR-0OOwkjnJqqlBH0tI4SFLR7mxX4YMgm1lKteZz9g5e08nJemfGRdDr1D_JgnXUsaqYAalWP3VuFQSYHKQ?session=0&fife\" height=\"200\" width=\"auto\" /><br><br>Capacity:\t389<br>Address:\t147 Cherry St.<br>Public Access:\t24/7, 365<br> Rate:<br> 0-2hrs FREE<br> 2-2.5hrs $3.00<br> 2.5-3hrs $4.00<br> 3-3.5hrs $5.00<br> 3.5-4hrs $6.00<br> 4-5hrs $7.00<br> 5-6hrs $8.00<br> 6-7hrs $9.00<br> More than 7hrs $10.00<br>Accepts: Credit Card, Cash<br>*FREE on Sundays and city-recognized holidays<br><br><img src=\"https://doc-0c-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/mmifkfmac6oc1f2tgagt0d9ml8/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALq6oK5zmVtgIXY72Xs1ATUlsBNfBW2Sp9uEux01ynuL-mvBNDkEJKMqilvV5NnreYuVTnSxy1RbCzgo-MhCGFWxu_9-67rfwyjYMrnYnnPFJEarAPNM31sTk0IJarYV_xt4Hi3hUOdPLqaFMRXCPgWtc0jRjDACJP-UODkARoYRPpLSY_MmTKapIOPBulFfALmbNOtpXbeY3OQVaqxONI5h6MWvSs9S-qplwUNFC2f06IlfuOiKNV8FcZGTB8OfTa9rO8C77A6S_yDTzJDLP5Os-Tqq8A?session=0&fife\" height=\"200\" width=\"auto\" /><br><br><img src=\"https://doc-04-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/jmedv0en6pke7sfg4k38ec1vlg/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpbvKMehffaUgeHGbCKhNhFla8tNoXiG1ByJReVJR2cSOPLcWMco-7Y3BRlFAinz6acMeFHXnYYuZeEW36xrT7FRLSiU-E9KPTfK8Y7q_Laur421U5dpRGxgUGEO7xxi7CnC-ING6w4miIdgMjh-I8fMkiitG0ySaGEvF4LCU4o8YqvTSkTfHOQw_F8Bmi-AzYpaESHkPMpOTuAQxMmIbzH-ntNLImVA2q-Gxelm8qd1TcvBa5JDgtoyHEkAbHJgV2W_KF7AXayV6QmtCVNnE2d5fJ_oA?session=0&fife\" height=\"200\" width=\"auto\" />",
              "stroke": "#7cb342",
              "stroke-opacity": 1,
              "stroke-width": 2.101,
              "fill": "#7cb342",
              "fill-opacity": 0.4117647058823529,
              "gx_media_links": "https://doc-00-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/34op07sc5gd2v5m7fglu2o0lak/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALo-0Jy-bNAy7P2cSvmI8xzAxtl3NatrjpNZVCSDMa7e9YY0gZMDDuAGH9a4VZ_WVTDlnXBoVdKpzFcmZVy-MJivcZ0GWoCmLsnV511Yz7T_yVHmKxzTXWJrk2WxPOcEHzOgJrR19O-ZWQI1UOs1HR23goStiFuUEqo7jTvU4RcjDnJHJAJfKjwCl8DLzrC1VGP5uFmBhBAGR-0OOwkjnJqqlBH0tI4SFLR7mxX4YMgm1lKteZz9g5e08nJemfGRdDr1D_JgnXUsaqYAalWP3VuFQSYHKQ?session=0&fife https://doc-0c-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/mmifkfmac6oc1f2tgagt0d9ml8/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALq6oK5zmVtgIXY72Xs1ATUlsBNfBW2Sp9uEux01ynuL-mvBNDkEJKMqilvV5NnreYuVTnSxy1RbCzgo-MhCGFWxu_9-67rfwyjYMrnYnnPFJEarAPNM31sTk0IJarYV_xt4Hi3hUOdPLqaFMRXCPgWtc0jRjDACJP-UODkARoYRPpLSY_MmTKapIOPBulFfALmbNOtpXbeY3OQVaqxONI5h6MWvSs9S-qplwUNFC2f06IlfuOiKNV8FcZGTB8OfTa9rO8C77A6S_yDTzJDLP5Os-Tqq8A?session=0&fife https://doc-04-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/jmedv0en6pke7sfg4k38ec1vlg/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpbvKMehffaUgeHGbCKhNhFla8tNoXiG1ByJReVJR2cSOPLcWMco-7Y3BRlFAinz6acMeFHXnYYuZeEW36xrT7FRLSiU-E9KPTfK8Y7q_Laur421U5dpRGxgUGEO7xxi7CnC-ING6w4miIdgMjh-I8fMkiitG0ySaGEvF4LCU4o8YqvTSkTfHOQw_F8Bmi-AzYpaESHkPMpOTuAQxMmIbzH-ntNLImVA2q-Gxelm8qd1TcvBa5JDgtoyHEkAbHJgV2W_KF7AXayV6QmtCVNnE2d5fJ_oA?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.213733,
                          44.474684,
                          0
                      ],
                      [
                          -73.213712,
                          44.474297,
                          0
                      ],
                      [
                          -73.213317,
                          44.474307,
                          0
                      ],
                      [
                          -73.213355,
                          44.474687,
                          0
                      ],
                      [
                          -73.213733,
                          44.474684,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "194 SAINT PAUL NORTH GARAGE",
              "styleUrl": "#poly-7CB342-1701-110",
              "styleHash": "78622593",
              "styleMapHash": {
                  "normal": "#poly-7CB342-1701-110-normal",
                  "highlight": "#poly-7CB342-1701-110-highlight"
              },
              "description": "<img src=\"https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/g7ijadq2oqe0mpk7tjgphe0se8/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALo1_1nswI2IGKQAR48gf4GGvvFsFwAk0UiEtasq5l7Y2dmugqdw_rPGPkulRMJ-Q4dxselj4w66PdiPOqFgr20t9gqcjXKf1MYOeaYe0ujOKVPF7UTJxpNVZhmjznnYq2DWSl8o2p4jDF6WzOQ7mzUP5Iid7p99dy3ll7RULpIS58JVE7WGT3ny3HlIerQghhnrr0l60RtG9zqh1TLVaFg_oAsSQ2rShzv3tPviynb1KJoUkfC06kRK77rv5CMragwSfTgJqUPwcU5YcWGR8CWyf3Mn-g?session=0&fife\" height=\"200\" width=\"auto\" /><br><br>Capacity:\t24<br>Address:\t194 Saint Paul St<br>Public Access:\t24/7, 365<br>Rate:\t$1/hr<br>Accepts: Credit Card, Cash, ParkMobile App ",
              "stroke": "#7cb342",
              "stroke-opacity": 1,
              "stroke-width": 1.701,
              "fill": "#7cb342",
              "fill-opacity": 0.43137254901960786,
              "gx_media_links": "https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/g7ijadq2oqe0mpk7tjgphe0se8/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALo1_1nswI2IGKQAR48gf4GGvvFsFwAk0UiEtasq5l7Y2dmugqdw_rPGPkulRMJ-Q4dxselj4w66PdiPOqFgr20t9gqcjXKf1MYOeaYe0ujOKVPF7UTJxpNVZhmjznnYq2DWSl8o2p4jDF6WzOQ7mzUP5Iid7p99dy3ll7RULpIS58JVE7WGT3ny3HlIerQghhnrr0l60RtG9zqh1TLVaFg_oAsSQ2rShzv3tPviynb1KJoUkfC06kRK77rv5CMragwSfTgJqUPwcU5YcWGR8CWyf3Mn-g?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.213692,
                          44.474111,
                          0
                      ],
                      [
                          -73.213654,
                          44.473761,
                          0
                      ],
                      [
                          -73.213094,
                          44.47378,
                          0
                      ],
                      [
                          -73.213121,
                          44.474133,
                          0
                      ],
                      [
                          -73.213692,
                          44.474111,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "194 SAINT PAUL SOUTH GARAGE",
              "styleUrl": "#poly-7CB342-1601-110",
              "styleHash": "40a4f255",
              "styleMapHash": {
                  "normal": "#poly-7CB342-1601-110-normal",
                  "highlight": "#poly-7CB342-1601-110-highlight"
              },
              "description": "<img src=\"https://doc-0s-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/mf5eq2ti66gse07gc7u5iujeak/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALo8Fbgzc4KhJwbIx8IuGOkEQB8sa_NQBBG9b2bCKxVwFZUw5cawJ2ucSaC8K1Ly5T3_cdxFs0cZlYycs31pzbcTsgV1jWXteCKGyFBNo4sNdiKrwTV3UKAeHo1maTYpymwxPQwxZ1koB04Xhg1nH60HFy5dPiwHzBHbcvImfyeOwvgjgiZpJDSeICzzSgeUg3fJjMWa3qwS2Jb4X2A3EADg-NrhRJNMerbPiVV8uhRZK9yIYb1w95uCFxcA3f-JdBlk4gJD1IvLO4om_bZLDwGzmoICjQ?session=0&fife\" height=\"200\" width=\"auto\" /><br><br>Capacity:\t28<br>Address:\t194 Saint Paul St<br>Public Access:\t24/7, 365<br>Rate:\t$1/hr<br>Accepts: Credit Card, Cash, ParkMobile App<br>Enforced: 9am-9pm<br><br><img src=\"https://doc-10-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/ola5tgm30k9gd881qu68ip87k4/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALofhbjLWdOBx7Fw5UXqH51yEoTfRA7299l5J-4itvZ6h6u5IwskeXnodr6-X5eqfMRXrfdaJJWVNHOXidRp-OPBEW7cp_KBxf0w8_uqT_Esz20nbWIavwharJACe8eHhnUwMZqIrZIOjZPs5bmiB-S3_ZDdc97Ni3nMWlnKHNxxcD7bPLvbEkVb1fKONTLJCCm--m5PBB-HfG6Z-mW5o7iZBRRhG-rU1QeNYKleSGynq54c31Qf01LftPW4lKlIexJpjRlXAtvqqNSKqoB0EGtL5y0slg?session=0&fife\" height=\"200\" width=\"auto\" />",
              "stroke": "#7cb342",
              "stroke-opacity": 1,
              "stroke-width": 1.601,
              "fill": "#7cb342",
              "fill-opacity": 0.43137254901960786,
              "gx_media_links": "https://doc-0s-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/mf5eq2ti66gse07gc7u5iujeak/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALo8Fbgzc4KhJwbIx8IuGOkEQB8sa_NQBBG9b2bCKxVwFZUw5cawJ2ucSaC8K1Ly5T3_cdxFs0cZlYycs31pzbcTsgV1jWXteCKGyFBNo4sNdiKrwTV3UKAeHo1maTYpymwxPQwxZ1koB04Xhg1nH60HFy5dPiwHzBHbcvImfyeOwvgjgiZpJDSeICzzSgeUg3fJjMWa3qwS2Jb4X2A3EADg-NrhRJNMerbPiVV8uhRZK9yIYb1w95uCFxcA3f-JdBlk4gJD1IvLO4om_bZLDwGzmoICjQ?session=0&fife https://doc-10-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/ola5tgm30k9gd881qu68ip87k4/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALofhbjLWdOBx7Fw5UXqH51yEoTfRA7299l5J-4itvZ6h6u5IwskeXnodr6-X5eqfMRXrfdaJJWVNHOXidRp-OPBEW7cp_KBxf0w8_uqT_Esz20nbWIavwharJACe8eHhnUwMZqIrZIOjZPs5bmiB-S3_ZDdc97Ni3nMWlnKHNxxcD7bPLvbEkVb1fKONTLJCCm--m5PBB-HfG6Z-mW5o7iZBRRhG-rU1QeNYKleSGynq54c31Qf01LftPW4lKlIexJpjRlXAtvqqNSKqoB0EGtL5y0slg?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.209713,
                          44.478067,
                          0
                      ],
                      [
                          -73.209697,
                          44.477977,
                          0
                      ],
                      [
                          -73.209677,
                          44.477822,
                          0
                      ],
                      [
                          -73.2091723,
                          44.4779354,
                          0
                      ],
                      [
                          -73.209173,
                          44.477984,
                          0
                      ],
                      [
                          -73.209183,
                          44.478035,
                          0
                      ],
                      [
                          -73.209195,
                          44.478106,
                          0
                      ],
                      [
                          -73.209713,
                          44.478067,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "CITY MARKET LOT",
              "styleUrl": "#poly-01579B-1000-107",
              "styleHash": "-9ecd5f3",
              "styleMapHash": {
                  "normal": "#poly-01579B-1000-107-normal",
                  "highlight": "#poly-01579B-1000-107-highlight"
              },
              "description": "<img src=\"https://doc-00-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/bah3j0618iar352u5ormdf07mg/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpTQs3mpmTHcp-WUOMHV-fcl0FfwGXYQiOhXeDpxiSQD2OsXQ1nVybGP1q9kk5K-xd6Do1YEa7-lE686IrX7hjsqQ9-AmbIVFujKNi5i84mZrFpA-IsPNTQ5wvGy5nlXyEDE2qAIOlmmDk5u3jZUE_CFLyfE7ql7bAnrSH4M3V5Z-L4rgdIp7ld05hdKdL89gbcrlHaD8TlQfdRCE7OrTdVvT6tgpNovznwUZIAV_OH--hj8VQwi4AZ8OPKfFdzHdTsUBQjN1aqOhEvw0EtFHYEf1WBUw?session=0&fife\" height=\"200\" width=\"auto\" /><br><br>**Metered Parking<br>Capacity:\t22<br>Address:\t105 S Union St<br>Public Access: 5am-2:30am<br>Rate:\t$1/hr, 3hr max<br>Accepts: Cash, ParkMobile App <br>Managed by: City of Burlington<br><br><img src=\"https://doc-14-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/lphfeqiht5lfe64i4aqaqcgj8o/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqV3oD82FFz_2PffMUMUVvFFlr5kLAdbeXBbMyhVE63ANqiCPrmHV22ubGn7Y7-Zai41gqWNSbuGbinV4RwMjsgxpZO1K6_b2MU-aCqrSemRMtc1s6qnnC28ghpQQiAvSJlcxGQSWDmyTOnUD7tuPADO2HCfyPcMztvC26iROPIM4GtzEA-1DI6jLAhp14lgcI9ipAMKop1gSrDHwnin_Iveb1nvpEyIVDHVpKkalfKk8T4iAAueYGkgqu7rg8xKe6ckaOXJsJv6zraTnWVUN04T1j0aw?session=0&fife\" height=\"200\" width=\"auto\" /><br><br><img src=\"https://doc-0o-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/rk0gn7pgrcd4pvmd3598mpfcro/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpcQv_s7-TuTuJvJvxtPsIEGrwiTefePbSVp4gmXKG5pXONExCuJunNwICVV_r0RW4j37ULDADMGtpTSojCdGmMTu0hK9XZHNURHQTHGbkXZubh6nD0K-N2GScg2IuVsp1Afko_540maNCc-x1ybTyRu7xKZOZA23DSOiRczIJzwYVft6yCImxfW4IrVBK92gsQHNurBBh8eNE6let-c2fGnFFrZVk1WSA9xkUHrnsORrdUCJmoru1IFaZfrHdjI6b3XyxaVEMGGNL2-TFSLMloE1-K5A?session=0&fife\" height=\"200\" width=\"auto\" />",
              "stroke": "#01579b",
              "stroke-opacity": 1,
              "stroke-width": 1,
              "fill": "#01579b",
              "fill-opacity": 0.4196078431372549,
              "gx_media_links": "https://doc-00-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/bah3j0618iar352u5ormdf07mg/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpTQs3mpmTHcp-WUOMHV-fcl0FfwGXYQiOhXeDpxiSQD2OsXQ1nVybGP1q9kk5K-xd6Do1YEa7-lE686IrX7hjsqQ9-AmbIVFujKNi5i84mZrFpA-IsPNTQ5wvGy5nlXyEDE2qAIOlmmDk5u3jZUE_CFLyfE7ql7bAnrSH4M3V5Z-L4rgdIp7ld05hdKdL89gbcrlHaD8TlQfdRCE7OrTdVvT6tgpNovznwUZIAV_OH--hj8VQwi4AZ8OPKfFdzHdTsUBQjN1aqOhEvw0EtFHYEf1WBUw?session=0&fife https://doc-14-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/lphfeqiht5lfe64i4aqaqcgj8o/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqV3oD82FFz_2PffMUMUVvFFlr5kLAdbeXBbMyhVE63ANqiCPrmHV22ubGn7Y7-Zai41gqWNSbuGbinV4RwMjsgxpZO1K6_b2MU-aCqrSemRMtc1s6qnnC28ghpQQiAvSJlcxGQSWDmyTOnUD7tuPADO2HCfyPcMztvC26iROPIM4GtzEA-1DI6jLAhp14lgcI9ipAMKop1gSrDHwnin_Iveb1nvpEyIVDHVpKkalfKk8T4iAAueYGkgqu7rg8xKe6ckaOXJsJv6zraTnWVUN04T1j0aw?session=0&fife https://doc-0o-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/rk0gn7pgrcd4pvmd3598mpfcro/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpcQv_s7-TuTuJvJvxtPsIEGrwiTefePbSVp4gmXKG5pXONExCuJunNwICVV_r0RW4j37ULDADMGtpTSojCdGmMTu0hK9XZHNURHQTHGbkXZubh6nD0K-N2GScg2IuVsp1Afko_540maNCc-x1ybTyRu7xKZOZA23DSOiRczIJzwYVft6yCImxfW4IrVBK92gsQHNurBBh8eNE6let-c2fGnFFrZVk1WSA9xkUHrnsORrdUCJmoru1IFaZfrHdjI6b3XyxaVEMGGNL2-TFSLMloE1-K5A?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.2145996,
                          44.4820478,
                          0
                      ],
                      [
                          -73.2145688,
                          44.4817349,
                          0
                      ],
                      [
                          -73.2137708,
                          44.4817789,
                          0
                      ],
                      [
                          -73.2138124,
                          44.4820756,
                          0
                      ],
                      [
                          -73.2145996,
                          44.4820478,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "ELMWOOD LOT",
              "styleUrl": "#poly-01579B-1200-110",
              "styleHash": "4d9608b2",
              "styleMapHash": {
                  "normal": "#poly-01579B-1200-110-normal",
                  "highlight": "#poly-01579B-1200-110-highlight"
              },
              "description": "<img src=\"https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/a928mlv10b5cddvbn9h00e3cd4/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALradJZq4onMEXrXcewY3U3hzAKpZin8yDTZJLqiPurpyopzR1UdLDUP8sLpe4ukYAS1L1HY4mYbmwR0Xqv9Cuj9XmrWmdorrGSqIAYpCmlPe3aUxS0cyH0DDiVhr2-M9Ax2_CH08i49R533-7158qQNHbuPL6ifZ8a7s02voKqT-DUmrO-gf6QXIgkv_Fgh27nJn8YB0uIEMNV0J8skLYoLP9eA5M4PlPaMb-Z-PDKI9ZW23_wohwAK8UiT2C1UX5MQsMRLSmNK05X8UDIALYdh2EE2qA?session=0&fife\" height=\"200\" width=\"auto\" /><br><br>Capacity: 78<br>Address: Elmwood<br>Public Access: 5 p.m.-2 a.m.<br>Rate:\tFree<br>Note: Permit parking only outside the listed public parking times. <br><br><img src=\"https://doc-10-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/5m05u3divlol4a8hb9v4d0vqeg/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpqQTthQb4ZmWTnYcuQl9_84xTdqy6gkOnsqoW3a6mkMUEstScGIY7Isog9rNNLAWETdCS9k-Wr1n-7PPJKQtjOdmpnq0e_KMtZwedfTFWqOh-N_ZG3EPRIuVFCTr0q4-tY8SKnstNokJsZFwXILCdyzg53Y8LkIejuJfwb2MHtgx8BIlPxLaIlXoXFgI7T9drQqL9jLI0z2aUP4o59m2k2PLVxVK4AW88mYC0VHIaGSl4aQaT2UqnAhYs00mBjU9QgFsgaoiK4ki861coW7Yx8owon_A?session=0&fife\" height=\"200\" width=\"auto\" />",
              "stroke": "#01579b",
              "stroke-opacity": 1,
              "stroke-width": 1.2,
              "fill": "#01579b",
              "fill-opacity": 0.43137254901960786,
              "gx_media_links": "https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/a928mlv10b5cddvbn9h00e3cd4/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALradJZq4onMEXrXcewY3U3hzAKpZin8yDTZJLqiPurpyopzR1UdLDUP8sLpe4ukYAS1L1HY4mYbmwR0Xqv9Cuj9XmrWmdorrGSqIAYpCmlPe3aUxS0cyH0DDiVhr2-M9Ax2_CH08i49R533-7158qQNHbuPL6ifZ8a7s02voKqT-DUmrO-gf6QXIgkv_Fgh27nJn8YB0uIEMNV0J8skLYoLP9eA5M4PlPaMb-Z-PDKI9ZW23_wohwAK8UiT2C1UX5MQsMRLSmNK05X8UDIALYdh2EE2qA?session=0&fife https://doc-10-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/5m05u3divlol4a8hb9v4d0vqeg/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpqQTthQb4ZmWTnYcuQl9_84xTdqy6gkOnsqoW3a6mkMUEstScGIY7Isog9rNNLAWETdCS9k-Wr1n-7PPJKQtjOdmpnq0e_KMtZwedfTFWqOh-N_ZG3EPRIuVFCTr0q4-tY8SKnstNokJsZFwXILCdyzg53Y8LkIejuJfwb2MHtgx8BIlPxLaIlXoXFgI7T9drQqL9jLI0z2aUP4o59m2k2PLVxVK4AW88mYC0VHIaGSl4aQaT2UqnAhYs00mBjU9QgFsgaoiK4ki861coW7Yx8owon_A?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.222091,
                          44.481364,
                          0
                      ],
                      [
                          -73.223599,
                          44.48352,
                          0
                      ],
                      [
                          -73.22398,
                          44.483403,
                          0
                      ],
                      [
                          -73.223074,
                          44.482139,
                          0
                      ],
                      [
                          -73.222906,
                          44.481393,
                          0
                      ],
                      [
                          -73.222538,
                          44.481222,
                          0
                      ],
                      [
                          -73.222091,
                          44.481364,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "LAKE STREET EXTENSION LOT",
              "styleUrl": "#poly-01579B-1000-105",
              "styleHash": "-51440f1a",
              "styleMapHash": {
                  "normal": "#poly-01579B-1000-105-normal",
                  "highlight": "#poly-01579B-1000-105-highlight"
              },
              "description": "<img src=\"https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/ghbq494i8ejogkmjqen47su9do/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALrh0iQ37egIVpq4ECIdAtJuqBr6-zuieUl7UO-ADglDAr1GG5Nxs1TyWLjmCX9u36NsBnx4Oi4Le_wRcqBgXQylatMuDAB2rQQZRsqhJVKD9kf9QXe67sqaiBx2-9PnZI3ZdutbgLlX9q8LikqEd2p3a-vG6gFnfNsGhyhrcX6TVZrRVjlOuzbcflOTUuN0x9OlRQ-AYBri52kz_3LJm-0ZaDWSKaCE05ziaErH6nurfFGKA49RMVzH4iWSR5oTAuOIUHbAjjnkEvVFSZvPjFEqnayCjQ?session=0&fife\" height=\"200\" width=\"auto\" /><br><br>Capacity:\t94<br>Address:\t601 Lake Street<br>Public Access:\t24/7, 365 <br>Rate:\t$1/hr<br>Accepts: Credit Card, Cash, ParkMobile App <br><br><img src=\"https://doc-0g-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/0k1bjv0maju6v09cf5vmn3jm60/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqM-FbCmlxbSelJz5gThvNb6jCJDpX_GKIQG8RUte9kiiNMpmwbJEQ8iO_Zi5Se-cZxCbqM0o50d4acXXgv6K0nON4AIMZXvE6jgaPpop9gWihOwOg3djfejk0hSoWdPr54TpuhmMjvKGs8D0h--orUKvhECcs1QGRy0LOO4R-8NInCtQ8b672znTG4ro2Yijb8LXjNxA2OYaxIDJlX_x27SwcAD7Yk8jLQN5E9IsmPGmjnRO-g22QIbbRU5dFpMWTaNxfg_vYKmNGgdba3lzghUp_1xw?session=0&fife\" height=\"200\" width=\"auto\" /><br><br><img src=\"https://doc-0k-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/8m0mv5oenpsgvfne02a121k6c4/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpcNqMmbQMDXHHkUQ0oJOGZ7KNaQHIM7NWCWWLvM4OWOt5BMrm5-3MgZlZ1YNlkF4VtmTTPayZgR0yi2wR4aHnjyA8dTmnOnTbToTBamQGnnLnkoXE-I-P4ZneSE7Hh20WNJQhHkEel5OFfHkPALXR4O3kjUG8sp4SFK0eoSYLlezakK0Rq3uxzsgKzvJjNMHPOhkooqitEHDFbXpavoOp9GyMXvzRV8QN8KtjlH5bmddbpH-X72rRW5kiiQqKesQQHPHedD_Ul-05t5Ri53vnqY0YOMA?session=0&fife\" height=\"200\" width=\"auto\" />",
              "stroke": "#01579b",
              "stroke-opacity": 1,
              "stroke-width": 1,
              "fill": "#01579b",
              "fill-opacity": 0.4117647058823529,
              "gx_media_links": "https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/ghbq494i8ejogkmjqen47su9do/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALrh0iQ37egIVpq4ECIdAtJuqBr6-zuieUl7UO-ADglDAr1GG5Nxs1TyWLjmCX9u36NsBnx4Oi4Le_wRcqBgXQylatMuDAB2rQQZRsqhJVKD9kf9QXe67sqaiBx2-9PnZI3ZdutbgLlX9q8LikqEd2p3a-vG6gFnfNsGhyhrcX6TVZrRVjlOuzbcflOTUuN0x9OlRQ-AYBri52kz_3LJm-0ZaDWSKaCE05ziaErH6nurfFGKA49RMVzH4iWSR5oTAuOIUHbAjjnkEvVFSZvPjFEqnayCjQ?session=0&fife https://doc-0g-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/0k1bjv0maju6v09cf5vmn3jm60/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqM-FbCmlxbSelJz5gThvNb6jCJDpX_GKIQG8RUte9kiiNMpmwbJEQ8iO_Zi5Se-cZxCbqM0o50d4acXXgv6K0nON4AIMZXvE6jgaPpop9gWihOwOg3djfejk0hSoWdPr54TpuhmMjvKGs8D0h--orUKvhECcs1QGRy0LOO4R-8NInCtQ8b672znTG4ro2Yijb8LXjNxA2OYaxIDJlX_x27SwcAD7Yk8jLQN5E9IsmPGmjnRO-g22QIbbRU5dFpMWTaNxfg_vYKmNGgdba3lzghUp_1xw?session=0&fife https://doc-0k-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/8m0mv5oenpsgvfne02a121k6c4/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpcNqMmbQMDXHHkUQ0oJOGZ7KNaQHIM7NWCWWLvM4OWOt5BMrm5-3MgZlZ1YNlkF4VtmTTPayZgR0yi2wR4aHnjyA8dTmnOnTbToTBamQGnnLnkoXE-I-P4ZneSE7Hh20WNJQhHkEel5OFfHkPALXR4O3kjUG8sp4SFK0eoSYLlezakK0Rq3uxzsgKzvJjNMHPOhkooqitEHDFbXpavoOp9GyMXvzRV8QN8KtjlH5bmddbpH-X72rRW5kiiQqKesQQHPHedD_Ul-05t5Ri53vnqY0YOMA?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.210465,
                          44.476133,
                          0
                      ],
                      [
                          -73.210503,
                          44.476395,
                          0
                      ],
                      [
                          -73.210677,
                          44.47639,
                          0
                      ],
                      [
                          -73.210683,
                          44.476481,
                          0
                      ],
                      [
                          -73.210903,
                          44.476481,
                          0
                      ],
                      [
                          -73.210886,
                          44.476134,
                          0
                      ],
                      [
                          -73.210572,
                          44.476139,
                          0
                      ],
                      [
                          -73.210465,
                          44.476133,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "MAIN STREET LOT",
              "styleUrl": "#poly-01579B-1000-105",
              "styleHash": "-51440f1a",
              "styleMapHash": {
                  "normal": "#poly-01579B-1000-105-normal",
                  "highlight": "#poly-01579B-1000-105-highlight"
              },
              "description": "<img src=\"https://doc-0o-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/7mnlofm4uhr58kh0vll4v8ks4k/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALoacJeSdcPYrqc8GyKgLB9ztQeJlJ_Ax741WLqwUOzmKBkKTY6_NJyFUu-vboxVcrvRGnHAVk9SCaLeuYVbVZ2_fLNmSK-_FhcWvngUKJ1nTHH8vjZeQFtT2oe-3KxJMfiKOE8saPXHBk8OmUM4hzF4kpp9esFPXIVgLATvxYz2jIjThHBJfwSENT_pNX74JVLmP9ixuzrsjNeXhZebnXgCYAWWuz8g4nHtpa1Lwe3zcjlkwCR0r3VaINplsGHNTquDnb6ElISApruPaJZAaW7Q2UiWWw?session=0&fife\" height=\"200\" width=\"auto\" /><br><br>Capacity:\t42<br>Address:\t220 Main St<br>Public Access: 6am-2:30am<br>Rate:\t$1.50/hr<br>Accepts: Credit Card, Cash, ParkMobile App<br>Enforced: 9am-9m Mon-Sat<br><br><img src=\"https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/dfivaq7du5brhqc87tacq7qar4/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpxhgakCG1Pu7QPCSCO2B10qviQCCAuXsTHWw95wawLowSoQJsUXEuwssVVvC49gHKhvSlpdfR9ftW6wcWfvgtMyEhY2CzcGr5LIDJ42PvY_fdHsZki3QUusIHeF4dGooykXnJqaiJnPUusAZ8-wywm7I2Pv_-_sKakquearV33n5RfbxElWGRjmvSwSTsRetv46y9d8_dF3NwT60QlDsL-Ev-38hqOnfVYbPukABkQBORDPYVklE2nOOwwAGaQPc0gTztUrQyEdi6opAeWq9FyXrOJyQ?session=0&fife\" height=\"200\" width=\"auto\" /><br><br><img src=\"https://doc-0o-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/22nkp2sjjc6nm3d5jdimhd96m4/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALrsRJ5xxayKYulVVEYdSjQEMIUQcjwtBYnP5hh-pktdKIKhXhAhQapWIxArhRTFGkJEsgP9S_0ncDbVafktcE6iuSyZFoHWBT_J_cXfRQ9M6Uz9sedqy_y6O_WrSzye2-zc65_zOuiw8V2qiFH-LNre37atfbDijtiIS6nayo3pDes54h9n7LGf61lTPyKYTCApDPUwKRFZ0f7m3_00vTLZsYccu6W4dNroy3hqIXF7uyRpj9aPsSxrbp17nM5boaQvIZqSIP2BMd7QA0uZEEp7nqv_Gg?session=0&fife\" height=\"200\" width=\"auto\" />",
              "stroke": "#01579b",
              "stroke-opacity": 1,
              "stroke-width": 1,
              "fill": "#01579b",
              "fill-opacity": 0.4117647058823529,
              "gx_media_links": "https://doc-0o-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/7mnlofm4uhr58kh0vll4v8ks4k/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALoacJeSdcPYrqc8GyKgLB9ztQeJlJ_Ax741WLqwUOzmKBkKTY6_NJyFUu-vboxVcrvRGnHAVk9SCaLeuYVbVZ2_fLNmSK-_FhcWvngUKJ1nTHH8vjZeQFtT2oe-3KxJMfiKOE8saPXHBk8OmUM4hzF4kpp9esFPXIVgLATvxYz2jIjThHBJfwSENT_pNX74JVLmP9ixuzrsjNeXhZebnXgCYAWWuz8g4nHtpa1Lwe3zcjlkwCR0r3VaINplsGHNTquDnb6ElISApruPaJZAaW7Q2UiWWw?session=0&fife https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/dfivaq7du5brhqc87tacq7qar4/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpxhgakCG1Pu7QPCSCO2B10qviQCCAuXsTHWw95wawLowSoQJsUXEuwssVVvC49gHKhvSlpdfR9ftW6wcWfvgtMyEhY2CzcGr5LIDJ42PvY_fdHsZki3QUusIHeF4dGooykXnJqaiJnPUusAZ8-wywm7I2Pv_-_sKakquearV33n5RfbxElWGRjmvSwSTsRetv46y9d8_dF3NwT60QlDsL-Ev-38hqOnfVYbPukABkQBORDPYVklE2nOOwwAGaQPc0gTztUrQyEdi6opAeWq9FyXrOJyQ?session=0&fife https://doc-0o-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/22nkp2sjjc6nm3d5jdimhd96m4/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALrsRJ5xxayKYulVVEYdSjQEMIUQcjwtBYnP5hh-pktdKIKhXhAhQapWIxArhRTFGkJEsgP9S_0ncDbVafktcE6iuSyZFoHWBT_J_cXfRQ9M6Uz9sedqy_y6O_WrSzye2-zc65_zOuiw8V2qiFH-LNre37atfbDijtiIS6nayo3pDes54h9n7LGf61lTPyKYTCApDPUwKRFZ0f7m3_00vTLZsYccu6W4dNroy3hqIXF7uyRpj9aPsSxrbp17nM5boaQvIZqSIP2BMd7QA0uZEEp7nqv_Gg?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.220229,
                          44.47269,
                          0
                      ],
                      [
                          -73.219396,
                          44.472691,
                          0
                      ],
                      [
                          -73.219193,
                          44.472821,
                          0
                      ],
                      [
                          -73.219329,
                          44.473406,
                          0
                      ],
                      [
                          -73.220076,
                          44.473366,
                          0
                      ],
                      [
                          -73.220053,
                          44.473183,
                          0
                      ],
                      [
                          -73.220287,
                          44.473152,
                          0
                      ],
                      [
                          -73.220229,
                          44.47269,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "PERKINS PIER LOT",
              "styleUrl": "#poly-01579B-1000-110",
              "styleHash": "-638aa7c8",
              "styleMapHash": {
                  "normal": "#poly-01579B-1000-110-normal",
                  "highlight": "#poly-01579B-1000-110-highlight"
              },
              "description": "<img src=\"https://doc-0s-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/3kldd3ddbo1rs042cemdah58v8/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqBR00lGbgM5qY6Df3s2wTO-Jen_H1wEI8j-BsC7gZFfgHfajsWYfWVS1Az-VMTiVWPu8utwe3is0BK3lA0XNruNx_tKAP_q_3dBYc_ti-uZpizRXv_WiA6mCHIyXIjOayCuU75UuKPt_lni8KVu_L8wkrzWNIbQXbq47KQk_dzaCNFxO4Gx_kjwKeH0TRbjsOuno5WuWB0Me2iOEEuvE4K_tR6JurmvCqqwhJ4Y3nXOSN5pYhrzsQhdXPC3PfEC0tQwgFU_K3vXP_dZiJ6CyYvZfdfnQ?session=0&fife\" height=\"200\" width=\"auto\" /><br><br>Capacity:\t150<br>Address:\t1 Lavalley Lane<br>Public Access:\t6 a.m.-11 p.m.<br>Vehicles arriving before 8 a.m. must pay upon exiting<br>Rate:\t$6/Day Resident, $8/Day Non Resident<br>Managed by: Burlington Parks, Recreation & Waterfront<br>Accepts: Cash or Card<br>More info: https://enjoyburlington.com/resources/pricing-fees/<br><br><img src=\"https://doc-0s-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/7djavfldfhl9fpfupvn7468ed0/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALrTvVbctcl5IiNi7hLdKjhtr5Gzu_b6ZWgstDHkFTIQa-ElSghRjIQaJ_Xs4NHwHM7g4fu10GhKH05RzVfLi1xF8Cd5xPAA7O0Aef2k0JUBJoFGcx3QwDWo64zzLbDxYFNZt8JYSVdofVoI0Z0PAbxeSqyrFA2ZVv2JNrmbp9MygxavaqtfxtSUvTq6V4okbqduabG8NPY718XKeiD5YVB9MxbZO2F84gGbyBB94p_NjPvPgDIhqTEMRUTYrjv3OeAibJeDzonz8n2uYsqBbPLMJFLW6A?session=0&fife\" height=\"200\" width=\"auto\" /><br><br><img src=\"https://doc-0c-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/tn1ge6uo5rcn51sbuana17lebs/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpk5iiiu1E8SxbHSqx2LpwEm_rALudR_QGCtZgA0zKlr2mxa2fmWcw-reyZwe2Bof-QdXOh7Zky1qKjhCTkrCtile68zpniXhTlVZYzD-ZOp5kS60Nkqu6NyUe9EnYjEZ_2xGS7YNFhWGue7ncFAaBb-yFlpj6D-0Rs34qiwt4sZxK2jkZh9k2r9ToalZBT643Im-5hU1QLKeI7SvAIuyiujwrJ47aGqJ-y_iYL597IZFSLNWdoWsUGX1bCR52Dkni3IgNl_NYZZCLubvFd77LQT3JxuQ?session=0&fife\" height=\"200\" width=\"auto\" />",
              "stroke": "#01579b",
              "stroke-opacity": 1,
              "stroke-width": 1,
              "fill": "#01579b",
              "fill-opacity": 0.43137254901960786,
              "gx_media_links": "https://doc-0s-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/3kldd3ddbo1rs042cemdah58v8/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqBR00lGbgM5qY6Df3s2wTO-Jen_H1wEI8j-BsC7gZFfgHfajsWYfWVS1Az-VMTiVWPu8utwe3is0BK3lA0XNruNx_tKAP_q_3dBYc_ti-uZpizRXv_WiA6mCHIyXIjOayCuU75UuKPt_lni8KVu_L8wkrzWNIbQXbq47KQk_dzaCNFxO4Gx_kjwKeH0TRbjsOuno5WuWB0Me2iOEEuvE4K_tR6JurmvCqqwhJ4Y3nXOSN5pYhrzsQhdXPC3PfEC0tQwgFU_K3vXP_dZiJ6CyYvZfdfnQ?session=0&fife https://doc-0s-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/7djavfldfhl9fpfupvn7468ed0/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALrTvVbctcl5IiNi7hLdKjhtr5Gzu_b6ZWgstDHkFTIQa-ElSghRjIQaJ_Xs4NHwHM7g4fu10GhKH05RzVfLi1xF8Cd5xPAA7O0Aef2k0JUBJoFGcx3QwDWo64zzLbDxYFNZt8JYSVdofVoI0Z0PAbxeSqyrFA2ZVv2JNrmbp9MygxavaqtfxtSUvTq6V4okbqduabG8NPY718XKeiD5YVB9MxbZO2F84gGbyBB94p_NjPvPgDIhqTEMRUTYrjv3OeAibJeDzonz8n2uYsqBbPLMJFLW6A?session=0&fife https://doc-0c-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/tn1ge6uo5rcn51sbuana17lebs/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpk5iiiu1E8SxbHSqx2LpwEm_rALudR_QGCtZgA0zKlr2mxa2fmWcw-reyZwe2Bof-QdXOh7Zky1qKjhCTkrCtile68zpniXhTlVZYzD-ZOp5kS60Nkqu6NyUe9EnYjEZ_2xGS7YNFhWGue7ncFAaBb-yFlpj6D-0Rs34qiwt4sZxK2jkZh9k2r9ToalZBT643Im-5hU1QLKeI7SvAIuyiujwrJ47aGqJ-y_iYL597IZFSLNWdoWsUGX1bCR52Dkni3IgNl_NYZZCLubvFd77LQT3JxuQ?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.2198921,
                          44.4770191,
                          0
                      ],
                      [
                          -73.2203181,
                          44.4777711,
                          0
                      ],
                      [
                          -73.2204581,
                          44.4777391,
                          0
                      ],
                      [
                          -73.2204871,
                          44.4777151,
                          0
                      ],
                      [
                          -73.2204451,
                          44.4776291,
                          0
                      ],
                      [
                          -73.2205611,
                          44.4775921,
                          0
                      ],
                      [
                          -73.2202451,
                          44.4769841,
                          0
                      ],
                      [
                          -73.2198921,
                          44.4770191,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "PEASE LOT",
              "styleUrl": "#poly-01579B-1000-110",
              "styleHash": "-638aa7c8",
              "styleMapHash": {
                  "normal": "#poly-01579B-1000-110-normal",
                  "highlight": "#poly-01579B-1000-110-highlight"
              },
              "description": "<img src=\"https://doc-0g-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/a7d582503mejuoci1u6ps68ov0/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALquLzIHhvXCDph4tnfxpwuwoQSUpDSaImmS8hV5eUutqLVOSWrlqFWk0hXOivHRYBmgC1-ip_iH8BQdaj20qRE2yIxbHQtIF951H-pfZr54mj1wwAiYqHOh578czKjLkC1FpV2A5dQRpfK_JPwLtGRLee9HPmM-9z7N7qA8FGNig6SlZG0xx8qdWXfXR8ds0PseD8XsyR1jOFfqTsT1T9V1vlMZZ4OQFLi4aeV0oODYFZfy8NfBVTe_KOv_3XyFYMaEk0B12HE9uSCln4sZJjmukZtwww?session=0&fife\" height=\"200\" width=\"auto\" /><br><br>Capacity: 76 <br>Handicap spaces: 2<br>Address:\t14 College St<br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: Variable – $3/hr in summer, $2/hr in winter. <br>Enforced: 8 a.m.-8 p.m. Mon-Sat, 8 a.m.-6 p.m. Sun. <br>Managed by: Burlington Parks, Recreation & Waterfront. More info: https://enjoyburlington.com/resources/pricing-fees/<br><br><img src=\"https://doc-14-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/tdaehb86d24nig35o0o0qo8oak/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALq2fXyxlptXcCIsPJE74Wc8lE4t4RJatt3RpT4vE8AFpiWYsV0GlXjnOQhk95TfeZ6nnbG1yc-E4nCcUhqXsbQUqg2PhRvCzRfes18SnJG0mNZQdzXeSa37ZOv3-E7hq6CbQnUZmf_UZ3YmUSxy_My2OhICUTy4RspBURN6hus5e9xQO5XaVEWnAzLrFmzmXBcU3n170ccjzsyhCb-pxMIrwChBVKZ8MusBmONNO9mpfUBeHTvh32AXQNKqhoIdrmCeMYa8nxwo7r3lQ9IgnKb-iv5H9A?session=0&fife\" height=\"200\" width=\"auto\" />",
              "stroke": "#01579b",
              "stroke-opacity": 1,
              "stroke-width": 1,
              "fill": "#01579b",
              "fill-opacity": 0.43137254901960786,
              "gx_media_links": "https://doc-0g-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/a7d582503mejuoci1u6ps68ov0/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALquLzIHhvXCDph4tnfxpwuwoQSUpDSaImmS8hV5eUutqLVOSWrlqFWk0hXOivHRYBmgC1-ip_iH8BQdaj20qRE2yIxbHQtIF951H-pfZr54mj1wwAiYqHOh578czKjLkC1FpV2A5dQRpfK_JPwLtGRLee9HPmM-9z7N7qA8FGNig6SlZG0xx8qdWXfXR8ds0PseD8XsyR1jOFfqTsT1T9V1vlMZZ4OQFLi4aeV0oODYFZfy8NfBVTe_KOv_3XyFYMaEk0B12HE9uSCln4sZJjmukZtwww?session=0&fife https://doc-14-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/tdaehb86d24nig35o0o0qo8oak/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALq2fXyxlptXcCIsPJE74Wc8lE4t4RJatt3RpT4vE8AFpiWYsV0GlXjnOQhk95TfeZ6nnbG1yc-E4nCcUhqXsbQUqg2PhRvCzRfes18SnJG0mNZQdzXeSa37ZOv3-E7hq6CbQnUZmf_UZ3YmUSxy_My2OhICUTy4RspBURN6hus5e9xQO5XaVEWnAzLrFmzmXBcU3n170ccjzsyhCb-pxMIrwChBVKZ8MusBmONNO9mpfUBeHTvh32AXQNKqhoIdrmCeMYa8nxwo7r3lQ9IgnKb-iv5H9A?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.2162253,
                          44.4807171,
                          0
                      ],
                      [
                          -73.216126,
                          44.4807113,
                          0
                      ],
                      [
                          -73.216126,
                          44.4806156,
                          0
                      ],
                      [
                          -73.2155333,
                          44.4806348,
                          0
                      ],
                      [
                          -73.2155306,
                          44.4807974,
                          0
                      ],
                      [
                          -73.2157586,
                          44.4807917,
                          0
                      ],
                      [
                          -73.2157613,
                          44.4809792,
                          0
                      ],
                      [
                          -73.2162897,
                          44.4809716,
                          0
                      ],
                      [
                          -73.2162762,
                          44.4807496,
                          0
                      ],
                      [
                          -73.2162307,
                          44.4807496,
                          0
                      ],
                      [
                          -73.2162253,
                          44.4807171,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "BOVE'S LOT",
              "styleUrl": "#poly-01579B-1301-112",
              "styleHash": "3143dc56",
              "styleMapHash": {
                  "normal": "#poly-01579B-1301-112-normal",
                  "highlight": "#poly-01579B-1301-112-highlight"
              },
              "description": "<img src=\"https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/c5ileuvb5vo3e0t1do439b8org/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpkF1gvkvvil2LSgTqFUXdQRX1Q7i5SC9f_26O5KhzGVX-mF1XvEnzLO2OKnybHWINn2glcSaRLanGkmERKE2D4s8LA5_kmsAxhKY70y7dLcIFfbzu78Jz3nMkcxtJGH6NDtjETauO44GLSQ6ioLwWY7hbuLkYFwXSLKkGqddaZ7tP4iSkujBZ31Arviwx6_DMkBMSBVNdTpYDk3J41rss2F4yFyyv9Brjycnigk4qms-hrNicgYqFUTrZRmKEwZILf016Vo3geYIHeSkpaza4aFbdpdQ?session=0&fife\" height=\"200\" width=\"auto\" /><br><br>Capacity:\t36<br>Address:\tPearl Street<br>Public Access: 24/7 (excluding Dec. 1 - Mar. 15 2:30 a.m.-6 a.m.)<br>Rate: Brown Top Meters and Blue Top Meters ($0.40/hr and $1/hr, respectively)<br>Accepts: Coin, ParkMobile<br><br><img src=\"https://doc-04-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/i0js9k71f0evecckjo4th57498/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqE2a1w7vfoHEg-FTefKlW78FOg2wGrxE3FTvD0y9UP9xWPmyHqRkgr3QCWpiNZX-WxO4C2y5nj6TFTeWU4j9JFCxE0BooxdDdH1d_euvNVfD_yowSMqJS3cjKr-YKN0zWZHrEbJvCiSg6H8zlYqgzt-YLrVJF0z5FRAIZKG-g_WqdC7fOpV9lveDISbfFbUkAJgFy862Tn2Ej_M4LefjvzwbhFv_p3gpQCZgqJO9Ed9Iy-jjxpQHR8Ql_8cLJzbVSXr5-tFTck9-qfwv3pY7pW8JUXLg?session=0&fife\" height=\"200\" width=\"auto\" />",
              "stroke": "#01579b",
              "stroke-opacity": 1,
              "stroke-width": 1.301,
              "fill": "#01579b",
              "fill-opacity": 0.4392156862745098,
              "gx_media_links": "https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/c5ileuvb5vo3e0t1do439b8org/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpkF1gvkvvil2LSgTqFUXdQRX1Q7i5SC9f_26O5KhzGVX-mF1XvEnzLO2OKnybHWINn2glcSaRLanGkmERKE2D4s8LA5_kmsAxhKY70y7dLcIFfbzu78Jz3nMkcxtJGH6NDtjETauO44GLSQ6ioLwWY7hbuLkYFwXSLKkGqddaZ7tP4iSkujBZ31Arviwx6_DMkBMSBVNdTpYDk3J41rss2F4yFyyv9Brjycnigk4qms-hrNicgYqFUTrZRmKEwZILf016Vo3geYIHeSkpaza4aFbdpdQ?session=0&fife https://doc-04-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/i0js9k71f0evecckjo4th57498/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqE2a1w7vfoHEg-FTefKlW78FOg2wGrxE3FTvD0y9UP9xWPmyHqRkgr3QCWpiNZX-WxO4C2y5nj6TFTeWU4j9JFCxE0BooxdDdH1d_euvNVfD_yowSMqJS3cjKr-YKN0zWZHrEbJvCiSg6H8zlYqgzt-YLrVJF0z5FRAIZKG-g_WqdC7fOpV9lveDISbfFbUkAJgFy862Tn2Ej_M4LefjvzwbhFv_p3gpQCZgqJO9Ed9Iy-jjxpQHR8Ql_8cLJzbVSXr5-tFTck9-qfwv3pY7pW8JUXLg?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.209283,
                          44.476547,
                          0
                      ],
                      [
                          -73.209293,
                          44.476699,
                          0
                      ],
                      [
                          -73.209666,
                          44.476679,
                          0
                      ],
                      [
                          -73.209719,
                          44.477124,
                          0
                      ],
                      [
                          -73.209936,
                          44.477109,
                          0
                      ],
                      [
                          -73.209873,
                          44.476636,
                          0
                      ],
                      [
                          -73.210016,
                          44.47663,
                          0
                      ],
                      [
                          -73.209989,
                          44.476399,
                          0
                      ],
                      [
                          -73.209793,
                          44.47641,
                          0
                      ],
                      [
                          -73.209803,
                          44.476528,
                          0
                      ],
                      [
                          -73.209283,
                          44.476547,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "FLETCHER FREE LIBRARY LOT",
              "styleUrl": "#poly-01579B-1000-110",
              "styleHash": "-638aa7c8",
              "styleMapHash": {
                  "normal": "#poly-01579B-1000-110-normal",
                  "highlight": "#poly-01579B-1000-110-highlight"
              },
              "description": "<img src=\"https://doc-0s-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/8n6cq5c7q9stgbgnlnao0u4m1c/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALrBIaQwAVQS0Ggr5bpX8SG4VFOHV9mYRTqHM7yWUBsefFvggdYPeLeZ0RV84T-dKIh-jb3fclplj3rorO5l6t97oVtbQ3pDuqL3Urcs0g7aV1z_HGisqf2QB4wFIIKJp48VxSHZ5ijALDR6QUzh_5dOIgPGUcBSRpsyA6T5bCDPGSpiIPek-U9yR9iDHwMCqatw91FP8q8q619RXQmrUgEo0yPnVScFT24dYobHNp76gGXF3UECYzEwcghUpXJUsnwSgyyXlPQCh75FISVjwXWYa_IyTQ?session=0&fife\" height=\"200\" width=\"auto\" /><br><br>**Metered parking<br>Capacity:\t43<br>Address:\t245 College St<br>Public Access: 24/7 (excluding Dec. 1 - Mar. 15 2:30 a.m.-6 a.m.)<br>Rate: Mix of Brown and Blue Top meters ($0.40/hr and $1/hr, respectively)<br>Accepts: Cash, ParkMobile App <br>Enforced: 9 a.m.-6 p.m.<br>Managed by: City of Burlington<br><br><img src=\"https://doc-0g-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/h6j0td0qrb41mt3r3vi3sbnuhs/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqqU2eMPKpdYZaPUdZ4o-k_GPTC25pUFPjVDKjCc45zGPTb8S-V9tt1u8xwEHGREhOMr2ZRmldfnFmfICn87hKjZkD4cEvB91l8n4aCpIFuKDSwVmoELQStvVPr6ZtWChV8FhtIHgO-wk64TVJx8-AZSDBd1ynWXqP5pndy5XXK3jRp0J0OEfNMpuLVjsbsYgD6olku_KYEq8lVnIR5db6ganUNSg4ldh7Va27qIk9kb3BABv6yBEZ_VRmpxw6K7xFwiXlEKQtAlu4JeCBxxWoKu69RlQ?session=0&fife\" height=\"200\" width=\"auto\" />",
              "stroke": "#01579b",
              "stroke-opacity": 1,
              "stroke-width": 1,
              "fill": "#01579b",
              "fill-opacity": 0.43137254901960786,
              "gx_media_links": "https://doc-0s-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/8n6cq5c7q9stgbgnlnao0u4m1c/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALrBIaQwAVQS0Ggr5bpX8SG4VFOHV9mYRTqHM7yWUBsefFvggdYPeLeZ0RV84T-dKIh-jb3fclplj3rorO5l6t97oVtbQ3pDuqL3Urcs0g7aV1z_HGisqf2QB4wFIIKJp48VxSHZ5ijALDR6QUzh_5dOIgPGUcBSRpsyA6T5bCDPGSpiIPek-U9yR9iDHwMCqatw91FP8q8q619RXQmrUgEo0yPnVScFT24dYobHNp76gGXF3UECYzEwcghUpXJUsnwSgyyXlPQCh75FISVjwXWYa_IyTQ?session=0&fife https://doc-0g-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/h6j0td0qrb41mt3r3vi3sbnuhs/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqqU2eMPKpdYZaPUdZ4o-k_GPTC25pUFPjVDKjCc45zGPTb8S-V9tt1u8xwEHGREhOMr2ZRmldfnFmfICn87hKjZkD4cEvB91l8n4aCpIFuKDSwVmoELQStvVPr6ZtWChV8FhtIHgO-wk64TVJx8-AZSDBd1ynWXqP5pndy5XXK3jRp0J0OEfNMpuLVjsbsYgD6olku_KYEq8lVnIR5db6ganUNSg4ldh7Va27qIk9kb3BABv6yBEZ_VRmpxw6K7xFwiXlEKQtAlu4JeCBxxWoKu69RlQ?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.211546,
                          44.475352,
                          0
                      ],
                      [
                          -73.211537,
                          44.475198,
                          0
                      ],
                      [
                          -73.211459,
                          44.4752,
                          0
                      ],
                      [
                          -73.211459,
                          44.475145,
                          0
                      ],
                      [
                          -73.211073,
                          44.475158,
                          0
                      ],
                      [
                          -73.21109,
                          44.47539,
                          0
                      ],
                      [
                          -73.211472,
                          44.47538,
                          0
                      ],
                      [
                          -73.21147,
                          44.475357,
                          0
                      ],
                      [
                          -73.211546,
                          44.475352,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "COURTHOUSE PLAZA GARAGE",
              "styleUrl": "#poly-9C27B0-2101-36",
              "styleHash": "-254317b1",
              "styleMapHash": {
                  "normal": "#poly-9C27B0-2101-36-normal",
                  "highlight": "#poly-9C27B0-2101-36-highlight"
              },
              "description": "Capacity:\t284\nAddress:\t179 S Winooski Ave\nPublic Access: 85 public spaces 24/7\nRate:\t$3/hr (daily max:\t$18)\nAccepts: Credit card ONLY\nManaged by: Unified Parking Partners (844-727-5877)\nNote: Monthly parking leases available.\n",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 2.101,
              "fill": "#9c27b0",
              "fill-opacity": 0.1411764705882353,
              "Square Ft": "410",
              "gx_media_links": "https://doc-0s-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/6un31eu175qupso99i8qs5u11g/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALq2lXQ0-tibzi_ZDRUuUgjwomBAhMqPe2hR89vHs9seR-Bytg1rT11-B_IxiSL1StRrB7zZxctSgHhTUyzxJbDFJLyqW_ondSuBBW3TNgEaDMMwlH8O_fYtxf840qLooGof3bdOvMFmEqBo1I1zpYruzOctzfnviQZl8szqBERqf9w8AmU-yPJjwIvz9ONCwVDc3swTaxXhatTCyp_Ir4THmDArSJgYAweotkS7YmGYRkUsYV1pL4bJYDLfGjQKPwrhmx6k1NVLH336ZOG99BgOTTqqhw?session=0&fife https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/l34bka94a4lirp2of736kgeruc/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqq-hD8TvxMzw6AsTxyac5ymclx3FFk4T1MQFO8Dl42LSKSmLUFtNsEUas7mcLN6huOx2shcu9YUe1n9Eo_Lg_iavZGPkxmGD80j3q7IkBKjohKKO8G9WATHAqviUpRZLd7BjMT8AVGyC2yO9K5sX0GroONEu0P1Ih0_9o-QxhNVWH86zJZmJhMGhPBFhtwOKAu4zaS5dFBZDfv4PVOLBlHhl7tmqttCv6C_zCVS3oC20mSTkC2VWjs8km734jxhasrnMTbMKC1_5aaMEX-qf0VHD5y2A?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.218884,
                          44.475271,
                          0
                      ],
                      [
                          -73.218896,
                          44.4755,
                          0
                      ],
                      [
                          -73.218905,
                          44.475558,
                          0
                      ],
                      [
                          -73.21895,
                          44.475572,
                          0
                      ],
                      [
                          -73.219497,
                          44.475439,
                          0
                      ],
                      [
                          -73.219519,
                          44.475297,
                          0
                      ],
                      [
                          -73.219502,
                          44.47527,
                          0
                      ],
                      [
                          -73.219459,
                          44.475254,
                          0
                      ],
                      [
                          -73.218884,
                          44.475271,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "CORNERSTONE BUILDING GARAGE",
              "styleUrl": "#poly-9C27B0-1901-66",
              "styleHash": "7eec2050",
              "styleMapHash": {
                  "normal": "#poly-9C27B0-1901-66-normal",
                  "highlight": "#poly-9C27B0-1901-66-highlight"
              },
              "description": "Capacity:\t86\nAddress:\t1 Steele St\nPublic Access:\t24/7, 365\nRate:\t$2.50/hr (Daily Max:\t$20)\nAccepts: Card or Cash",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 1.901,
              "fill": "#9c27b0",
              "fill-opacity": 0.25882352941176473,
              "Square Ft": "494",
              "gx_media_links": "https://doc-0g-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/04oiv0tkocra8bumt1va0d71p8/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALr_Is0paQOOtRDVqzmm_kfR4T_7-SDnAKniZp0SQrzDNBvsOW6npZJj8pNwrqmRtGKIrirBliPa-gbk8wl7Oj1QHi2SUlRjZNV82gemahyfqA2c4jslZoSDHj-vwu1jRuTGIFO0-lyRMwdk6XD1iSBGAGygUex3y_pEW1YyOQ37JQvPBAMrOiQKFlVIB3q6Jg-CvWjpIFBOQk6zzBUceReeKssPAck_lpamgPziIowYbWWZbPc-UUs2LkNS1DxaoexqKuORIGpiQfPTTdzpuj4IrsNktA?session=0&fife https://doc-0s-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/9okgqa8vnm0faajs3fk2o8pvvc/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALoHtz0_gOxy0JDwzwMHTRVBSZd4jHakwa27cJJJYuAoGI4_kXT381_G4kps1U7Cm5xKjAc3PWt1PYPTGFZNLeT7-AOL-YStII-tIWMRZwZ1hvnDWX7hMJklQOFGXqKXY-yNNbYvJNYOEq2-1ajexNBxKW6lFaFP-eyxLK6SK0rdguya6jEBqWq2Euw4etJW2DtDu2sTyuwOp1xatjI2tWsCG-LI1Ameb6XByUxV2tiKOJes_r2ti1Ge0jlrIBYx9J6BGKQYZssz4jukj7IQi9trsqPc5A?session=0&fife https://doc-04-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/lhqg2vmk83o8r8ejdbf5tfpvl8/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqz-q9xjinfdJALxr2OcQgyz5bjMHZ_g0Fl8UiL4U2qf85DSPT5EuVbKCL_3Bfb-L8m9peOYDKqUJUwiwEMChmfqwrmsy14vHhKSACrMT7rBc2wtXiS1fIXm60xLvlwpj8_chGwCamEBC3nQGFvmZ_7KKPnVNfVx2AkBoz1RexpjRLzuzFLR_feKNmZ7ewfgtf4BAIWPvW9fXLeTbJY-VXcxnm91hKXIs2LH2vW_Bg8dVG-f6y3cWnHYXhOztxyicjMD6DGDHR-l0_tP5isyBx4pBwZGA?session=0&fife https://doc-10-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/5tg29tg7h067qsem09aob4p860/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALo1bZKb5eyhU0dlp1bKht2Vx7fNRw-5HQ6dJH4cKNXZzApt9abnR_1drVT1pMPevzO7-O_YXC5xz2H0NzTyGEiRnqpKhITJ80nAjtQkRdEduylfZLFSg35ZQZwZlrkp8zpNMiAD6RQA-oBC2dJLEqpqm4t5Uv0dP_4YjtNbN0oKmgH3vDUEw-MpUm2qoQffNlCVFQmxWyRRdc-vZesodj963n1w92LcCt0cUl4qkkaKwFxhraS5-6zKNQOX5xE69s6k_D5iXYFHYAqWh0GzmN6WnBmLug?session=0&fife https://doc-10-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/n1vdaq4c7ao1ggbmvrlrtafbgk/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALoE-SEXmzvz-CkN_qv10siKVNsYvbJVYnpPAHt8mZlUKayF6Hq37bEikWf5qgiLHJoI5dlfwVnb1K2dJm1heJweSfQezq9qGKNnVi_hZ5YoLOOuNZhorRIfrrJjaDz7riS7HFz3yYN6RMnoJNNZrMteB6oAYYc2gGYqZPCeSTo9YeXb9N8dAYXnKD2oxE7QwXg4CrABCpeOONX2FUeNRN6TqPaKZKCMH6cTK0tFGgy5aweK7FRCgpHeccqZVvGWS58BqXosYuBVq424Mv2Ut3_d92I3xQ?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.212973,
                          44.477205,
                          0
                      ],
                      [
                          -73.21299,
                          44.477493,
                          0
                      ],
                      [
                          -73.213082,
                          44.477493,
                          0
                      ],
                      [
                          -73.213094,
                          44.477737,
                          0
                      ],
                      [
                          -73.213133,
                          44.477741,
                          0
                      ],
                      [
                          -73.213133,
                          44.477761,
                          0
                      ],
                      [
                          -73.213415,
                          44.477752,
                          0
                      ],
                      [
                          -73.213418,
                          44.477803,
                          0
                      ],
                      [
                          -73.213804,
                          44.477792,
                          0
                      ],
                      [
                          -73.213798,
                          44.477718,
                          0
                      ],
                      [
                          -73.21384,
                          44.477716,
                          0
                      ],
                      [
                          -73.213822,
                          44.477476,
                          0
                      ],
                      [
                          -73.213237,
                          44.477489,
                          0
                      ],
                      [
                          -73.213213,
                          44.477199,
                          0
                      ],
                      [
                          -73.212973,
                          44.477205,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "CORPORATE PLAZA GARAGE",
              "styleUrl": "#poly-9C27B0-1201-41",
              "styleHash": "4db8bc5c",
              "styleMapHash": {
                  "normal": "#poly-9C27B0-1201-41-normal",
                  "highlight": "#poly-9C27B0-1201-41-highlight"
              },
              "description": "Capacity:\t354\nAddress:\t76 Saint Paul St\nPublic Access:\t24/7, 365\nRate:\t$2/Half Hour, $16 daily max, $5 after 6 p.m.\nAccepts: Credit card or cash",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 1.201,
              "fill": "#9c27b0",
              "fill-opacity": 0.1607843137254902,
              "Square Ft": "876",
              "gx_media_links": "https://doc-14-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/76e3f6421i4pn0bvrbj2n8jiag/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpjSjt7_44bYeIDrTwqKHpfs0ZqbhFRSkNbwMN9MFo80kbVahsNDXZWRkLU5D01m2gJCPqqLlCLGN3ka8w4kOgxrd4m3gIQDckfQeWARgZO1wPQFypi4-LfN9zJH_s3IDmUhYyi_G8CPYzXOOuyKc4qT-TT6BowOMzBR_IvJ-LfduIBdT8SSmUQOL5U3Ue-h9I4GU58Bgpu-akJykeWz4xO6PF-aA77SstUti1k-x3t6lWBjgXJhr5NC_PpWuUAdQncZENMpLd06VBfQC8gRjk-yAY2hg?session=0&fife https://doc-14-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/lt5ctqiukvule19rdgniq5klq0/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALoTNqZj4tIUa6YVEeEAx0y-NZDn4_OvgmVbT1oiySO-0hPggSAQ_O_eI-o9AVtMQ7yDtowF3QOyE-TpQp8zgPo4iR_zB9eUIHvaGe8bwPuV0XyonTS9T5iKmKRoBQgG9SxIubr6JOtOOo0zVRBjihH1j51dfgoScGIr4PHOFxjYGI7V9EWTxakNm5V-eqpbxygORlmtspIinHmKlYL_mU08q4gs4vYZPitocN5OlX7zCdIMDM2nU4k4mfehehYQkS1S098JOapS-YztaqHifgOEdlXP9A?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.218509,
                          44.476567,
                          0
                      ],
                      [
                          -73.218495,
                          44.476402,
                          0
                      ],
                      [
                          -73.218203,
                          44.476409,
                          0
                      ],
                      [
                          -73.218175,
                          44.476016,
                          0
                      ],
                      [
                          -73.217742,
                          44.476025,
                          0
                      ],
                      [
                          -73.217772,
                          44.476594,
                          0
                      ],
                      [
                          -73.21814,
                          44.476583,
                          0
                      ],
                      [
                          -73.218509,
                          44.476567,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "GATEWAY CENTER GARAGE",
              "styleUrl": "#poly-9C27B0-1401-31",
              "styleHash": "-3219b197",
              "styleMapHash": {
                  "normal": "#poly-9C27B0-1401-31-normal",
                  "highlight": "#poly-9C27B0-1401-31-highlight"
              },
              "description": "Capacity:\t90\nAddress:\t65 College St\nPublic Access:\t7am-12am Top Deck Only\nRate:\t$5/Day",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 1.401,
              "fill": "#9c27b0",
              "fill-opacity": 0.12156862745098039,
              "Square Ft": "793",
              "gx_media_links": "https://doc-10-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/20j2pmtr28lpgn2cmmf9qdrh80/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALoTa8krseKUFOyXdYq6upnjsHEnqXwTt3uDoP247Yq2uG0jboez87Qhm5VOCBVwjUjMx_k6XXTikwI_hvbUaIpjltnXtn-iQCPJ5Ff9oqryOHEHtbV_IeJFRcJvLDfHD43XyOyY0FzamRLLFQ5dThonCa38Lv0Y3WR2pUr8f5HbcKjX6Tko3ZJqsvc-04NjSoZBI_ay0Faj8AYzzIPgmUPGPpAMkp55kzzL30uGOSMoa5nnxIYWhyYYgdf7qSkVsoJDSLvYLp_S_eDWoonN_a-mvzlXhw?session=0&fife https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/ma5l14vtk5qgo2075vrl08qkrs/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqiprKdbajCDlvf7PZDffahpbG5_5S-VYQDSp0qrNzZ1G3aDQx_T585PyYpIIO00qUhMIgd30Q5cnrvUgCyUh9keFipdI4aORT7k30Q-_QR5-cvuKIHSfK9G4VEfd6o2lcbVs3z3_2wS2icda5ffLON1Z60rAr2P_aox8uZS8eAZg8jvn2k4PenZ8m4VJU3SffQ0QZr5Fwt9nhHxcKY3s-iMKlpbiekEqaXXBfTsczuvJ8V_dwi60OVyIJfn5ZkW9eIoe5_4DOjXJ5r31zNHHaPA1_FNg?session=0&fife https://doc-14-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/qmuuh4v46338tv8tlmrnvpaie0/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALprr1fGy8oqBgDTW8Cs3lLEtriz6IhUiQmSuUMLPUPuqlJqVPRRQPYR3OpL7SGpCcd9j2r9JkAmBWAElKDwUXOAz42ZZ4eXiD5OWfvtG2iaUbA44kTN798B4Gyf8AbI0y3u4FQU3wm9StbwsO0vnjaysYRfGGrocz477gJRtlZ50B_pmaoOJkeMH57iBIRdUnOIn_NfS_hO84RjXTth90La5cJZcwtHlgzNccMaMfhU8nlcy_0w5m6NVuXaiHZWCJhNDF5IGXUh1y6j494sGDLWGCq18A?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.220409,
                          44.476717,
                          0
                      ],
                      [
                          -73.220237,
                          44.476341,
                          0
                      ],
                      [
                          -73.21996,
                          44.475746,
                          0
                      ],
                      [
                          -73.219865,
                          44.475769,
                          0
                      ],
                      [
                          -73.219856,
                          44.475795,
                          0
                      ],
                      [
                          -73.219833,
                          44.475845,
                          0
                      ],
                      [
                          -73.219794,
                          44.475915,
                          0
                      ],
                      [
                          -73.219752,
                          44.475966,
                          0
                      ],
                      [
                          -73.219714,
                          44.476002,
                          0
                      ],
                      [
                          -73.219672,
                          44.476026,
                          0
                      ],
                      [
                          -73.219604,
                          44.476038,
                          0
                      ],
                      [
                          -73.219538,
                          44.476047,
                          0
                      ],
                      [
                          -73.219806,
                          44.476619,
                          0
                      ],
                      [
                          -73.219865,
                          44.476611,
                          0
                      ],
                      [
                          -73.219904,
                          44.476736,
                          0
                      ],
                      [
                          -73.220409,
                          44.476717,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "MAIN ST LANDING LOT",
              "styleUrl": "#poly-FFD600-2601-112",
              "styleHash": "33a983e2",
              "styleMapHash": {
                  "normal": "#poly-FFD600-2601-112-normal",
                  "highlight": "#poly-FFD600-2601-112-highlight"
              },
              "description": "Capacity:\t118\nAddress:\t3 Main St\nPublic Access:\tMon-Fri 1pm-12am, Sat-Sun 6am-12am\nRate: $10/day\nAccepts: Credit card ONLY\n\n",
              "stroke": "#ffd600",
              "stroke-opacity": 1,
              "stroke-width": 2.601,
              "fill": "#ffd600",
              "fill-opacity": 0.4392156862745098,
              "Square Ft": "958",
              "gx_media_links": "https://doc-0k-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/h0mb4lur89hn92ebn8i6g9br8k/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpFZYOJhVVkl_PPdj1gYlI1-hK-BMrdQZo0GcPQRmOxNwG4SXek-H7XELVJT24A55dewj7k_iKGpmLZfmnE3lce7BrDAfwAqU_rjp94gjzG0dnPFhtOgXemWAR3_8enNdBhSNK5A-dRigEVX2yyOATUArfTHFGNgwv6uzVfY0mIcro1AGNgon-JgJwrwh7bSFT2OOtOWl9YkA4vwlCGR-9pQiZMl4dDShrMYvB7_QAfC2qZRc5k5dRp1zKni9OVVYTCEbtveXMRCi0mnoPN5vlaJHZeFQ?session=0&fife https://doc-00-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/93kh6kg0jbpmjv5578u3rg18qs/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALrQVI-Kv7_qgLmZqd7kwvdvXm9az6FEuTmyBuLWMOtWs-0eLHT7s75paBVg7y1PBLKG-4DTl03EBk8FXapTPCwZD_1Xn4o7Bpj8YZF9kjuQxZ2OoDP8Iaxw6dTGIKG6VH65MaceboEqQ_GuxnDS2Xgs-Y9zivSGTzMi3az-mMA62gTvDsYVG8aCAE1mJpio0urxfb4SJ0vg73wDtzRMEpSZL5hsfmzgDHIgEtQkxA5fmg5VmiirJ9D4BPi21RdXmNwNgH7OSIEmGkyVCAkY0817TiwtZw?session=0&fife https://doc-10-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/khf8c9gfqn04nsg1sd2jb349og/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALr3Jb4ptWnd6xnWPMfcKG5SPMQfgRjkx_KKdKKZAOU3Ta0cFljv4RDNTa_DUmL5JN6jCbXr4hJGP_D7pzD1du0Exa9p_NVTXxALm-j46NWLp06W932VOTi83CAaoBiLdXI9s16I0MsyILZ2TOOsQ4srjkUYTRKP38FkarYpzCp1Cc8ncX4M4QycvrkimsPSqQ8TFakmDNdCDTVKkMpwdpnxitg0w8MOUHH9SLCQw_BwARC3QuPw7C9tE-C4Ddr0XNc9bU67DYRyzjUBNyuvYcQ34z194w?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.214535,
                          44.476013,
                          0
                      ],
                      [
                          -73.214557,
                          44.476377,
                          0
                      ],
                      [
                          -73.214601,
                          44.476377,
                          0
                      ],
                      [
                          -73.214612,
                          44.476496,
                          0
                      ],
                      [
                          -73.214842,
                          44.476489,
                          0
                      ],
                      [
                          -73.214808,
                          44.476003,
                          0
                      ],
                      [
                          -73.214535,
                          44.476013,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "110 MAIN LOT",
              "styleUrl": "#poly-FFD600-4501-112",
              "styleHash": "cb48be4",
              "styleMapHash": {
                  "normal": "#poly-FFD600-4501-112-normal",
                  "highlight": "#poly-FFD600-4501-112-highlight"
              },
              "description": "Capacity:\t26\nAddress:\t110 Main St\nPublic Access:\tMon-Fri 5pm-2am, Sat-Sun All Day\nRate:\t$4/hr\nAccepts: Credit card\nManaged by: Unified Parking Partners (207-618-2887)\n",
              "stroke": "#ffd600",
              "stroke-opacity": 1,
              "stroke-width": 4.501,
              "fill": "#ffd600",
              "fill-opacity": 0.4392156862745098,
              "Square Ft": "497",
              "gx_media_links": "https://doc-00-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/2v3mhi6irnco5rdo68es1l7l24/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALok7wSY1JQzNQxsQTFt83zQNsK0Rq6bdVVjAQunGNkfQmKA5ziC3mhX1U5vBvA5YTk6bXg-Xsa5VuMRjDCpWSZ7_61vrMiuxYxKXZv_Sz0nw8IqxcaQYFpDkNjjQ9KxPaorj8qQgDBRcmNN01PCgBM8zVcTMFN76ZmfdbgrgeWLpuWA-dhw4j5o2oiCfsTeJQrCTi95Tk8YMa33YottYDvIKKG9c2eurfN4iRlysjr2HMA5f5_YGubi-zLTNsJ8mc7eZYWPbCTuPt2rbq_iNM8Kxv52Fw?session=0&fife https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/o4vhk8kjddmhl6eoajtni5t7ag/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALrraxiP0dLYg0iF8H-rK17UckXMMgKx1NtXj9f12EDyjSqt5RheJb_JJlccBEAm-n2W5RV3KIKcoNjYybSdxQyrPeWJ0iwPbQlk-l0KAaaYgr4m3ClLtn5Zjb6TUL3ZY9o_UATTiAx71ifAjijSxfS2PuPHX20zonkcOBOgQx1wzq58nqCpetQHUG9_8wSsdJT29XuHAoB2ackXHSwJ6AeM-K3WYzAjZh_ujFTZ0xik7RHepfLB-aZd3liAb_StOzIPc5rjCjEPHtRPAgvOt8nPsacqGw?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.218696,
                          44.479274,
                          0
                      ],
                      [
                          -73.21827,
                          44.479277,
                          0
                      ],
                      [
                          -73.21831,
                          44.479572,
                          0
                      ],
                      [
                          -73.218727,
                          44.479571,
                          0
                      ],
                      [
                          -73.218696,
                          44.479274,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "2 CHERRY ST LOT",
              "styleUrl": "#poly-FFD600-4301-107",
              "styleHash": "6175f995",
              "styleMapHash": {
                  "normal": "#poly-FFD600-4301-107-normal",
                  "highlight": "#poly-FFD600-4301-107-highlight"
              },
              "description": "Capacity:\t36\nAddress:\t2 Cherry St\nPublic Access:\tMon-Sat 24 hours, No public parking on Sunday\nRate:\t$4/hr\nAccepts: Credit card or cash\nManaged by Unified Parking Partners \n(844-727-5877)\n",
              "stroke": "#ffd600",
              "stroke-opacity": 1,
              "stroke-width": 4.301,
              "fill": "#ffd600",
              "fill-opacity": 0.4196078431372549,
              "Square Ft": "437",
              "gx_media_links": "https://doc-0s-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/7qjs0p4n1ekgi49onoeg2m4e94/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALo-8rBL95ORg4uqGRoN8ikX-GIv6u-q3eZ1JxZl2Rn-IojacbZlfGyi6P1_XVSC8R_C-HonVgoJQom2HNUUJ1PBu9Nbz6DVCfUo0Gnu_nrwLoG0VoClSklkGbU5-TzPiyji6q9z5Ywjj3_yP7vQoqM94UrfJk4mGbJCBMVdkFJ5lgmErBenbicuAft4nu5S3m6b-Do1p0j2B8t40kJfm5hJMYCErzoebbgCHHLlDvrbJprsRTMWWdwkUCdLur58mphbqwzIa0gua1z8xxFXCk1Lx7kAyw?session=0&fife https://doc-0k-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/klt9v33of76pgi1lt9va5b0luk/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALodCKYBlxa_xkOskYaiRlkp4lFIjV0hcYKWOqJETVuEAc5vrPvL3WhUTozMPRmdsrGsgf0R4s2KvrQfXAQZueSAztBrL6uUU_Q7NvvL7sv_uA14XeSDNLcj80XL6ZYKYsc9EpFg4KB89GWCZLHc_scQ-9Udp4F-H6XwqW82cDQaxTZ0J91NdI6pT6GyUDKNiTCYe3WhJQ9FlcYYtm-YUWalBE0iOHsHUMnxs3JfH6Wo2dkbCXMD4cbQXQgGhRGCZoE-33fBIVr5g8GqhNJYzEQ1sQnRng?session=0&fife https://doc-0c-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/9b40udqebi36dbb04ne3soh7bs/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALo2dHFU3Rjy1i1QxZPaInHUjoSoPsoEMjM5bJpsTpyj2DcGBAunKF-4eOWrSI2ClqMRn-5_GAOTJ3DPNiVRJPEANyDfwKrkHwZZr8GqY2xGuTo6oGmk-aFb1WY73OVp6wUSo8L6_u5R5-7qBviLwahO15-sZ8J7TpPqtzLI2op-jHh2C1t2eIUIuC5GXVPG6RmDnO9Ad6EKa7dUPIK4p28AU6IH96mmgWR3ugPdDGZ_1RXdlIuwvLrxqK9Y_GKk2OxF9IACr00PwQvsgTeQeDKNo9cuIg?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.211948,
                          44.477628,
                          0
                      ],
                      [
                          -73.212013,
                          44.477628,
                          0
                      ],
                      [
                          -73.212189,
                          44.4776213,
                          0
                      ],
                      [
                          -73.2121938,
                          44.4774056,
                          0
                      ],
                      [
                          -73.2119515,
                          44.4774128,
                          0
                      ],
                      [
                          -73.211942,
                          44.477481,
                          0
                      ],
                      [
                          -73.211859,
                          44.477481,
                          0
                      ],
                      [
                          -73.2117792,
                          44.4774792,
                          0
                      ],
                      [
                          -73.2117877,
                          44.4772192,
                          0
                      ],
                      [
                          -73.211586,
                          44.477236,
                          0
                      ],
                      [
                          -73.211614,
                          44.477641,
                          0
                      ],
                      [
                          -73.211712,
                          44.477645,
                          0
                      ],
                      [
                          -73.211827,
                          44.477639,
                          0
                      ],
                      [
                          -73.211948,
                          44.477628,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "2 CENTER STREET LOT",
              "styleUrl": "#poly-FFD600-4501-110",
              "styleHash": "-6d1b25c4",
              "styleMapHash": {
                  "normal": "#poly-FFD600-4501-110-normal",
                  "highlight": "#poly-FFD600-4501-110-highlight"
              },
              "description": "Capacity:\t35\nAddress:\t2 Center St\nPublic Access: Mon-Fri, 12 public spaces, 12 public spaces 5pm-2am, all spaces on Sat/Sun 24 hours.\nRate:\t$4/hr\nAccepts: Credit card or cash\nManaged by Unified Parking Partners: \n844-727-5877\n",
              "stroke": "#ffd600",
              "stroke-opacity": 1,
              "stroke-width": 4.501,
              "fill": "#ffd600",
              "fill-opacity": 0.43137254901960786,
              "Square Ft": "532",
              "gx_media_links": "https://doc-00-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/06h9hc2tbg8s4audcvp9phnur8/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALrnkGRpBj549gUmj-Bg_Ht2nK8ePejqPbue7FM5M2FM8U2w4poL7cD5PhfcgiFHsbA9QRZdD5CypXEpbzeUeJOF3aOcAJwesfORD_rH10mxIHAHiG5n7Bd__VtnOw5_cS69qqESb9JAP92R7_YaygdEjwwKcqaLsCRVEoTZQG7vGV7i9PxgpFpmc7UZwpO3A6eskz0w2zxJlDmF7RExmq9SMAhS43eIj06k8jVwJvcfsg4Y7x7EpGSCCgNPDbYvpIipT4ipde0oPOkQ9MyKUhqdib4FPw?session=0&fife https://doc-0s-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/vdb5mjiscd8h2klaftnl9o4f4k/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALo7ky0qruy5a6kxf0uPc4mLIPf8BP60wAcuYLzIx7DHuDOUnxxOWRart-iyWnfaxE_cJSZRSUQL_QWbpiKi6uVnc_Uq3zXKnnnoRoguky9oa5TXux8LJSOlBq0ekQrFX2x_4ZrJn2H2MvVdzuLZiVG-AX4X_1_CM4h0JqY4t0oO3GtKegzg1uQvj51cDGREe_C6UFpUqcog8zrS8DlQx8jkkntxtG8Bf9K7uZdH01GJULLEGLvM7PVLnZIjhJqKyAufTHJC3ZhHm2BgYuiZ95qiS08y4Q?session=0&fife https://doc-0c-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/vq3tri7id9rsqhd0n0q7qtbv70/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALr2WtgQ_6BJS7NZL00oRlT0xcwgE8EJKQXVJ1nLLRYvJno1szu1NLqE-6P_Ht-Tc7gc0FmHO9dFHetYLwKsdSaP3qmST1QxqpSoUWpgUVuPCxwWOfyz-R9z4UhAMItHXlbop9ftcxjuVWTLFoBF1X2tFDi8auRKKC1UIfrFUKq4LvpS0TsfrVmgf6MXl2YutyeWfmiF1b5GZ8RT40HWK2XLWOVnvTgynuuy1alyAyprxiOqyIk-mgXYpBHauEjlU5NJA_ri5vFVa1nHlrH6-cYKAwvzqQ?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.212189,
                          44.480556,
                          0
                      ],
                      [
                          -73.211829,
                          44.480564,
                          0
                      ],
                      [
                          -73.211842,
                          44.480831,
                          0
                      ],
                      [
                          -73.212205,
                          44.48082,
                          0
                      ],
                      [
                          -73.212189,
                          44.480556,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "174 PEARL ST LOT",
              "styleUrl": "#poly-FFD600-4501-110",
              "styleHash": "-6d1b25c4",
              "styleMapHash": {
                  "normal": "#poly-FFD600-4501-110-normal",
                  "highlight": "#poly-FFD600-4501-110-highlight"
              },
              "description": "Capacity:\t34\nAddress:\t174 Pearl St\nPublic Access:\tMon-Fri 5pm-2am, Sat-Sun 24/7\nRate:\t$4/hr\nAccepts: Credit card or cash\nEnforced: 24/7\nManaged by: Unified Parking Partners (207-618-2887)\n",
              "stroke": "#ffd600",
              "stroke-opacity": 1,
              "stroke-width": 4.501,
              "fill": "#ffd600",
              "fill-opacity": 0.43137254901960786,
              "Square Ft": "383",
              "gx_media_links": "https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/nn1pu0bi4p8jk8ctsiuehdme6c/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALo6OTLneQoSzRSnFA-0TBYM3-hKVBgvAlUm6glGta0MeD3qqKC_uu_mfkwvkX_oidpYb4nEz16macD8kqXVUAbLXNCr6QYNZnJsN_J_snk_YUWVs2BzNjXZor-LQGiL3X5EkugWT-Jsg9UXqvyQ7DXyhsqLnaW9hLFaKxQA4EGzIniNdO9jGJQXhM5aS_dPy34d07h6v5BlJIBA0E69YuvfJVrZohIPwPPS9WchHBWmze-j94XwQyKd6IhIrMNQUWX7oWgTWSPzlI9M71bhyM3KCG3CGg?session=0&fife https://doc-10-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/6j97am9habktsku9pqn4pau56k/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALouvlamStXFbWe-17Ytyprgy_W8HkKn7uuT4wv6C6m07k7jYylczhL7NJsx9nYLm4Uyu1d3rjAKrF0sEqdAcVn1d4WZrwgavL8kt68PMiRCBaHmRYldBnVHJuMmQACIx3RbJiHTACa_tKa7micUi2XOIjbcKJLctiqZnMD8RA9jVkw6b1cuazKCWIXvCD_TGi2nzwysseWWGxkfZiucWaL6PWidCVNGp-2hl6i25W7YMv58BNRB2RKz2v7ERyybQnp1q27CSZhz8O2WszfuQwgeae1jBw?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.212314,
                          44.480359,
                          0
                      ],
                      [
                          -73.212303,
                          44.480097,
                          0
                      ],
                      [
                          -73.212028,
                          44.480105,
                          0
                      ],
                      [
                          -73.212042,
                          44.480365,
                          0
                      ],
                      [
                          -73.212314,
                          44.480359,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "2 CHURCH ST LOT",
              "styleUrl": "#poly-FFD600-4501-105",
              "styleHash": "-38b30a16",
              "styleMapHash": {
                  "normal": "#poly-FFD600-4501-105-normal",
                  "highlight": "#poly-FFD600-4501-105-highlight"
              },
              "description": "Capacity:\t21\nAddress:\t2 Church St\nPublic Access:\tMon-Fri 5pm-2am, Sat-Sun 24/7\nRate:\t$4/hr\nPayment: Meter\nEnforced: 24/7\nManaged by: Unified Parking Partners (207-618-2887)\n",
              "stroke": "#ffd600",
              "stroke-opacity": 1,
              "stroke-width": 4.501,
              "fill": "#ffd600",
              "fill-opacity": 0.4117647058823529,
              "Square Ft": "333",
              "gx_media_links": "https://doc-0g-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/7e6hr70jqku7spbdsc08j7q7ds/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALoFGfRthXUM2Y5_xwThoLBrbDKrJ7zTA_4NbTvdLVBJpKxI-gFNsS3BRpsDc5Q8U4Tnf7oDz7yTkXQCLUU_YlP92tVj-RFFYl0PS6F34qQkyJ3vaPanGhq7BGQEMYXWp9LPwYIWeughSG2u3iTJ9clTNJRFxUBOZloEtjLV-TQF5IsUMl_P-3eh1-nyAHOQucS4WtgQMbCO-DVK_SRdlnsKuK_PLuD8TWb9ud-u5G61_7-clW5NXTGcJFiXlY2r4k0Ydms9N3DOuH58cN_epu9RVoOAcg?session=0&fife https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/gcvuuf7bip3de3l2v1mnc3ufl8/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALp2WD1Jz8UQmFd_xQcn5UqdufiVCE6oxdahs2ZMIGWezgZukyRJlKt4F96XdQDhWj_-uRrR5_EbrPtukynQDEyOfEbF9y6ZBnS6G0CwCSMrbC-WnemZaU2vea9dQHSTSVv_yAOiKYFgdrhAiAiMUpyZijI64iCqzqAh7sxPQ0RDFVEapl8zx2YjKuX9nuyNyuv-bCq7DbHFZKQ9OLWMRyVS4Aa6Z4ERFl1MDf8tHrE1G5HELe8ZI_KZuV7EpaZdCfuvUmsSjWAqf4KDpP1EJzUIDzO0wQ?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.216085,
                          44.476187,
                          0
                      ],
                      [
                          -73.215935,
                          44.476174,
                          0
                      ],
                      [
                          -73.215946,
                          44.476058,
                          0
                      ],
                      [
                          -73.215877,
                          44.47605,
                          0
                      ],
                      [
                          -73.215882,
                          44.475958,
                          0
                      ],
                      [
                          -73.215679,
                          44.475959,
                          0
                      ],
                      [
                          -73.215699,
                          44.476259,
                          0
                      ],
                      [
                          -73.216102,
                          44.476257,
                          0
                      ],
                      [
                          -73.216085,
                          44.476187,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "86 MAIN ST LOT",
              "styleUrl": "#poly-FFD600-4301-112",
              "styleHash": "-62c5da98",
              "styleMapHash": {
                  "normal": "#poly-FFD600-4301-112-normal",
                  "highlight": "#poly-FFD600-4301-112-highlight"
              },
              "description": "Capacity:\t19\nAddress:\t86 Main St\nPublic Access:\tM-Fri 5pm-2am, Sat-Sun All Day\nRate:\t$4/hr\nAccepts: Credit card\nManaged by: Unified Parking Partners (207-618-2887)",
              "stroke": "#ffd600",
              "stroke-opacity": 1,
              "stroke-width": 4.301,
              "fill": "#ffd600",
              "fill-opacity": 0.4392156862745098,
              "Square Ft": "427",
              "gx_media_links": "https://doc-10-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/9nsmaqh57jll4f53e12ioi2v08/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALrWTuYgz7W7Y70iqQFf2Ho8tHaf8E3Mxi4J2tV-x2trn6QYfdv7mwNI58ff6Cc1Bi0eAFYGsaZ0JKHxK3ELRW-QIb5ryn5QfxbmemGsmZGYl8jPn-UwQOvAD-XNCIM6Uv_2Omf_zOgll1kbo2iDtKr1qNGxUt8W4wqfL6MUwxi8VW1ixS6MzgTEF7NCvZggI41qitBA3FGN4soZJvDN2bszczv3iIP2VdqjuCcpnxmx0g0OSoR93cNd4mbGTrP1VyU-axMEoQ-BRFwr84Bjrt9_V0lmeg?session=0&fife https://doc-00-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/o08gfer9oo1a8hos5o7fij7gi8/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqlMXgegiT6pnj0Uanpu08Tc1MJobQuF717auDFxR8iHF562pLs52VyjZVl2OSJiKmR5FRnvzTpbgPO3mHoOhN_aRHcA8nG3CU5he2HAlG6cKGWBgAGvrmp9x82T6OwNSI2NWQqmXZmdsRYUbuNn9a9qS46gMZa-PMW7S2gvDF3NEfRwz2XUm9KGtB04HVTbYIZt24N0FU2HdKW6O4YLDlEmAv9eYpfkk-lzy3crllXDDLAiSdGs581-fVaIBCzJY6FgxB9jg1uUsDaVL4JXkf7dUKyyg?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.219342,
                          44.475189,
                          0
                      ],
                      [
                          -73.21932,
                          44.475085,
                          0
                      ],
                      [
                          -73.219245,
                          44.474945,
                          0
                      ],
                      [
                          -73.219228,
                          44.474643,
                          0
                      ],
                      [
                          -73.21905,
                          44.474646,
                          0
                      ],
                      [
                          -73.219071,
                          44.474974,
                          0
                      ],
                      [
                          -73.21884,
                          44.47498,
                          0
                      ],
                      [
                          -73.218857,
                          44.475209,
                          0
                      ],
                      [
                          -73.219342,
                          44.475189,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "4 KING ST LOT",
              "styleUrl": "#poly-FFD600-4301-110",
              "styleHash": "236a73c0",
              "styleMapHash": {
                  "normal": "#poly-FFD600-4301-110-normal",
                  "highlight": "#poly-FFD600-4301-110-highlight"
              },
              "description": "Capacity:\t31\nAddress:\t4 King St\nPublic Access: Mon-Fri 5pm-2am, Sat/Sun 24 hours\nRate:\t$4/hr\nAccepts: Card or Cash\nManaged by Unified Parking Partners: \n844-727-5877\n",
              "stroke": "#ffd600",
              "stroke-opacity": 1,
              "stroke-width": 4.301,
              "fill": "#ffd600",
              "fill-opacity": 0.43137254901960786,
              "Square Ft": "640",
              "gx_media_links": "https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/fnvin2ktpk1i589b0ek6h7n7bg/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALpZLCUkOEr0CNCmTo5UFp9rAYFyByX30DKranwCUvEmsSxFgfrSqgW7tpoUlUY-DQxGZLvWO9cyQ4JEepUug3fw8hrRCNZ2Z0blRVYy87DXi4NRygVnZmtAw-RfuVYWmsm2cS7GACL22CXbToy4cOjE_zzvNanGqFXvOAkXjAQV66l3hujQb5Lqf7GldDEq1_7FzjZcD1urMLVq_-z2ADuQYcKM_6sERmT7Ct8DOiT938RDFm0t4d2v9NEAG49lnDfuDW18z3QbowxaD8NqCFs2_6P2tg?session=0&fife https://doc-08-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/vb8qiidis78vjgd61olglp6890/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALp-tUWi9vW6GbMZ5jRBuaLLJAZRflHZf4qIdO0Stat94E47KviYotAC-rHSy__bu49e1iL9h0qS1fmbRLB6ZXkmClAYNnV6HFCRNZk2bgBryK6Z9zLnCRf6IuK3saijz-l3z8Won9uQvODJuHc-NA0w5CqVbWYj2MwJU5dHc4wcSqPNLnGzwnD3hsB7MLk3X62jCpZXwqgQiai4MbB8GbkIn-yzQDkJiw3IU866Q5BnFlQ4dddTPJOi1MKjOxOqqI9ezH9w22GRRVM0nMbBy175TGJR_g?session=0&fife https://doc-0s-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/8ti6254rparo1654qgrs3tjgl4/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALoARx3dMWNuZjeyVjIsP43GplYHDfirNOj1F4469m7H73A1uYimWXoHUEKd5wDLSOAPIUi_AXhIlBjaYHNjgpqwq7qeewJLI7_O9fE_bQx1mhMdasTy7AY4P6ajaePSJCoBx0moOVDpyVjxIhpRy7huqqK9_ofQL8yxd4E4sDnctU8yOETpS9B7gcVB06kUu1rRLoVIvH3AZG_lE-INHVpovkWPiwd_5aaieNSrMiQgYe6LsVGGmteW3zWfd_o5vmCTs0fXcqDjmgsGpws6Ppk6-VE_kQ?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.215162,
                          44.477574,
                          0
                      ],
                      [
                          -73.215159,
                          44.477435,
                          0
                      ],
                      [
                          -73.215328,
                          44.477431,
                          0
                      ],
                      [
                          -73.215319,
                          44.477315,
                          0
                      ],
                      [
                          -73.214544,
                          44.477336,
                          0
                      ],
                      [
                          -73.214558,
                          44.477595,
                          0
                      ],
                      [
                          -73.215162,
                          44.477574,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "PARK PLAZA/ICF LOT",
              "styleUrl": "#poly-FFD600-4501-107",
              "styleHash": "-2f0f9fef",
              "styleMapHash": {
                  "normal": "#poly-FFD600-4501-107-normal",
                  "highlight": "#poly-FFD600-4501-107-highlight"
              },
              "description": "Capacity:\t107\nAddress:\t88 Saint Paul St\nPublic Access:\tMon-Fri after 5pm, Sat after 7am, Sun All Day\nAccepts: Credit card or cash\n\n",
              "stroke": "#ffd600",
              "stroke-opacity": 1,
              "stroke-width": 4.501,
              "fill": "#ffd600",
              "fill-opacity": 0.4196078431372549,
              "Square Ft": "592",
              "gx_media_links": "https://doc-0g-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/ns8645igqf72sn8mbl2e2rth7o/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALrAhJNpf4vEd-7MU1wYIcX-kRWWJAECOjvAKMfATgJezbhOcbY1U7WXy3vDHZCeiQjzktPpNKYR4BZ24A9a_wBnymEhO3VcXKts0FSB079ZZhWyZLoJm9AizFLqpnZxDrcaUlbnhiBt3KIES_XGrfsw8uZjwESiPlMDsbsG3bHTo6Rs40B9l065ymERy0iwVRJB8v7T40uz5OEZ4sMYeCm3-duBLOPPTmg8TAw-ZEnM190x0NKbDKxAokVarpFfpBDMxe5btuNZVFlUEptmiJy8qYVdgQ?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.215691,
                          44.479588,
                          0
                      ],
                      [
                          -73.215228,
                          44.47961,
                          0
                      ],
                      [
                          -73.215253,
                          44.479983,
                          0
                      ],
                      [
                          -73.215721,
                          44.479965,
                          0
                      ],
                      [
                          -73.215691,
                          44.479588,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "20 PINE ST LOT",
              "styleUrl": "#poly-FFD600-4601-110",
              "styleHash": "-355df286",
              "styleMapHash": {
                  "normal": "#poly-FFD600-4601-110-normal",
                  "highlight": "#poly-FFD600-4601-110-highlight"
              },
              "description": "Capacity:\t36\nAddress:\t20 Pine St\nPublic Access: 24/7\nRate:\t$4/hr\nAccepts: Credit card or cash\nManaged by Unified Parking Partners: \n844-727-5877\n",
              "stroke": "#ffd600",
              "stroke-opacity": 1,
              "stroke-width": 4.601,
              "fill": "#ffd600",
              "fill-opacity": 0.43137254901960786,
              "Square Ft": "517",
              "gx_media_links": "https://doc-0g-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/g2hgivcmoo5ro43cl1ua52icbo/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALogFTNGd-fmQMncu98v4mdMVuVmh4E7v0wC9ZfrEoJgYYNsuswKW5eHeGqeJNcTcDBh7WbBWC74c9_HvjXSeCjq0YEUBpaliMnbqrTryrYLDtPmUnGw6lDYqJxBivytKYZhZK8J_N1ITo0B3xjISeK4sVAoCfXMLJr_IritdCqZQUSiCJvXDuF5VRDcL7ZnHfC-4uazb9aRtk_7T9dBkc34YSHGBhTxFmTJM9jpKj7XPZUKO7qv_UNPEakOJN_O--nFh2AmssWOxbROZXTGNyKcK2aMLQ?session=0&fife https://doc-0o-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/4pbeadro58g7k7igc0cplaebg0/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALrrjpq8fkBRnTo_3b5mAIAEWTg0CSpGgguv7ZMeohQ4JNKpVpTCprOlLHTwoTEt8ZgxuAY_Dfj-UOnVG3Mv-81wY0xVutKqGWX9Ku09hTohXP4kcKt_ju-R9liFiVwDvfTKmD4jbCmP7jn2pjYqzpBb5Gxy4laKVduQ5AFjUNm5rqATlu4lKKBFLUHaSIaJ7S46XMwZaN8ckTpK4SEky1hgRTdqEu81dlpK0-6ZCiHxkmKk8gtaR4mDFT4VvlBSAjQrE5AwNzMN6nUKghzHftRLNFddGw?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.216091,
                          44.476257,
                          0
                      ],
                      [
                          -73.215705,
                          44.476254,
                          0
                      ],
                      [
                          -73.215715,
                          44.476466,
                          0
                      ],
                      [
                          -73.216121,
                          44.476456,
                          0
                      ],
                      [
                          -73.216091,
                          44.476257,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "121 PINE ST LOT",
              "styleUrl": "#poly-FFD600-4501-110",
              "styleHash": "-6d1b25c4",
              "styleMapHash": {
                  "normal": "#poly-FFD600-4501-110-normal",
                  "highlight": "#poly-FFD600-4501-110-highlight"
              },
              "description": "Capacity:\t36\nAddress:\t121 Pine St\nPublic Access:\tM-Fri 5pm-2am, Sat-Sun All Day\nRate:\t$4/hr\nAccepts: Credit card\nManaged by: Unified Parking Partners (207-618-2887)\n",
              "stroke": "#ffd600",
              "stroke-opacity": 1,
              "stroke-width": 4.501,
              "fill": "#ffd600",
              "fill-opacity": 0.43137254901960786,
              "Square Ft": "357"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.214557,
                          44.476745,
                          0
                      ],
                      [
                          -73.214201,
                          44.476737,
                          0
                      ],
                      [
                          -73.214226,
                          44.476926,
                          0
                      ],
                      [
                          -73.214561,
                          44.476934,
                          0
                      ],
                      [
                          -73.214557,
                          44.476745,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "LAWSON LOT",
              "styleUrl": "#poly-FFD600-4301-105",
              "styleHash": "57d28f6e",
              "styleMapHash": {
                  "normal": "#poly-FFD600-4301-105-normal",
                  "highlight": "#poly-FFD600-4301-105-highlight"
              },
              "description": "Capacity:\t25\nAddress:\t117 Saint Paul St\nPublic Access:\tM-Fri 5pm-2am, Sat-Sun All Day\nRate:\t$4/hr",
              "stroke": "#ffd600",
              "stroke-opacity": 1,
              "stroke-width": 4.301,
              "fill": "#ffd600",
              "fill-opacity": 0.4117647058823529,
              "Square Ft": "319"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.212328,
                          44.475198,
                          0
                      ],
                      [
                          -73.21166,
                          44.475231,
                          0
                      ],
                      [
                          -73.211678,
                          44.475422,
                          0
                      ],
                      [
                          -73.212338,
                          44.475381,
                          0
                      ],
                      [
                          -73.212328,
                          44.475198,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "175 MAIN ST LOT",
              "styleUrl": "#poly-FFD600-4401-107",
              "styleHash": "-66ccd32d",
              "styleMapHash": {
                  "normal": "#poly-FFD600-4401-107-normal",
                  "highlight": "#poly-FFD600-4401-107-highlight"
              },
              "description": "Capacity:\t35\nAddress:\t175 Main St\nPublic Access:\tMon-Fri 5pm-2am, Sat-Sun All Day\nRate:\t$4/hr\nAccepts: Credit card\nEnforced: 24/7\nManaged by: Unified Parking Partners (207-618-2887)",
              "stroke": "#ffd600",
              "stroke-opacity": 1,
              "stroke-width": 4.401,
              "fill": "#ffd600",
              "fill-opacity": 0.4196078431372549,
              "Square Ft": "484",
              "gx_media_links": "https://doc-0s-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/na70f2ga9pm8blvk8jo0qd9ous/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALoGF8A1xb0yn2JYuHUG2uULiJTXzRa1mZFFRSE0rRuNfcAkspbkNN-WHSNrk7ipQgPaRK3CDS6owg4KVpSMbhkZIbnpQq4prhGS0WZdZJ2lw7PxarF09eplhJVnQgo2gkcR3bfeghIXo2Y5pI_prNR-suqSIyl4ODpEB2UmfsmhiVGMt-Yrw1ZS8uidOHRWwA-DXrqySqU6L4EYXBSU43Q3r0gOuoS2yHlIJmVcbruWfKPL7LWewusZwPI51PyshTKIe8spsfaLF5xh4Wv0slZbphj07A?session=0&fife https://doc-14-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/v8ede95tuth32vh68rrj8kogk0/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqWrAW-Rc61ReCj8Z_byOQVN_lIubcLhGDCoVye1kfGsXzlirqFU_Ad1tpawtIa2umiDFmNeBEZWKFqdLY68Ku-pFgHqfA8OjZSed5sNdrY1dVI_FArsJZzOJXIU4tqMrmR3_1U6necJopa8DkCpUJPTd6YY5dbVsOXtlxyXbV-xJHR4nOakGaoBIxva3rVqsRECcvHMn0AchRiF58NqUc5YfBEB_fnFwtdRxSo1FBepzLwJUgnvUJQFaPWjLYSzxpQScV9NtON_dn9OXnYIFlsEzgJ1w?session=0&fife https://doc-00-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/0s4ekl3dj0q8qaj61a0lj8kp68/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqQwToK-ByfUCO92-jxyy3wk0p46qPIkB-O6OxYl4BLtSjH4ZMedefgidBZ0LQ5BuxrHDqeGFn1m_g9l4ACW3FCBfMSLLM2KVSjdwOJIbcR-fJ6oRczCFavERh1P109WYwkWw3HFswZLCRbPNiCj6Phd38AyBjY6wuGxcC3a3jIG4c3ILAHKRi9mWp0Y6OwJNQbjUBYFvGFIdoFMkQWpEQYzGO4Zcqss3ZI3y7DvHULIkXjh8B2A8AxWEy_4HqiNRV384-xl0NIpz_lglzhuMed3psExw?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.220535,
                          44.47632,
                          0
                      ],
                      [
                          -73.220898,
                          44.476314,
                          0
                      ],
                      [
                          -73.22087,
                          44.476107,
                          0
                      ],
                      [
                          -73.221063,
                          44.476089,
                          0
                      ],
                      [
                          -73.22103,
                          44.475765,
                          0
                      ],
                      [
                          -73.220294,
                          44.475788,
                          0
                      ],
                      [
                          -73.220535,
                          44.47632,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "ECHO LOT",
              "styleUrl": "#poly-FFD600-4501-110",
              "styleHash": "-6d1b25c4",
              "styleMapHash": {
                  "normal": "#poly-FFD600-4501-110-normal",
                  "highlight": "#poly-FFD600-4501-110-highlight"
              },
              "description": "Capacity:\t74\nAddress:\t1 College St\nPublic Access:\t8am-11pm, Unless Private Event\nRate:\t$3/hr\nAccepts: Cash or Credit Card \nManaged by: ECHO",
              "stroke": "#ffd600",
              "stroke-opacity": 1,
              "stroke-width": 4.501,
              "fill": "#ffd600",
              "fill-opacity": 0.43137254901960786,
              "Square Ft": "736",
              "gx_media_links": "https://doc-0c-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/s7jrn8c8mm4ee92d4flu8ttg2g/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALr39Hx4Rg8WyzpQTQs0GxyvQyX2oGL-P5QvddElk41mXjN56YeJNpRKP76MaiXIw-1EmY83Qa-0KIMwJ1MmeMsBUixOMQR1W--r5qtK4s5CInP5dupQeuuvFyrOURImhoB2yiK9V4qaKlPwnZzsBGtuAWkkdO64qud9D_CfEDvXtr69vH78sj-NRHR25_5AX4gH6vCieoITwUmmHszF5wykFdlkpr0o6uu_HaeQzR4sews0tgECxrcnGC77C8ItFPmxAXl5li3QGgQZldqFaODFmUkg9A?session=0&fife https://doc-0c-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/nfpe6jt0ljg8r1ig9mjge7qm10/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALoOWhcr-GmpX-i6s-JqFE4CXl0ygwKoZsTdydenZIKkxLuvnkIOz7Ek_fp2xLg59DmaOlAsmMktN0tnqzmQj31XjD3BwGyRkTWOiAuygQyJcy_q8yj8aL1IPT_fxhqt4pXreq2Hv-kaNW59BIuc8OAmudCHobKb2fz5f5V1zjiT4wEL3MFTOK29jI_rDj5x_SKY2g0z3hNJxXTxbfxb6u2v8_-pkQvvHeZUcFQRl7_wxiAvgKpoVibTZmtOB-qiscEWPej9e4jGTn79YwPrcdcViMj74A?session=0&fife https://doc-00-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/mbfcun43o0fmsqtq0pltkn1vhc/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALoYvudyh5nTwWuma99bb_NDrixcx1KXuawD07ZQWBMh8CEYxc3c90kO01CFte-4cSp4Oas5aVrI7rLjutjxozxXJu1cJRCyk0HDqHQR6SPrWWRfDj6PjwdtbqXnw7mZT_oEdhxJEH4LulgaA-QZiXIbJJB54Dp1ALKMJTRkbRBYQq_xN_kNopJZns_nE2ryNkkqmpyJo7xGJBplEYU2Qufr5fQ3U-oJQGY2O6wr6OITQoB4-4rr-O2z9-V7kxdCZh6irEo1pGssqzJ2GWX0EnQJ8uoS3g?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.215474,
                          44.476435,
                          0
                      ],
                      [
                          -73.215463,
                          44.476288,
                          0
                      ],
                      [
                          -73.215257,
                          44.476295,
                          0
                      ],
                      [
                          -73.215262,
                          44.476357,
                          0
                      ],
                      [
                          -73.215235,
                          44.476358,
                          0
                      ],
                      [
                          -73.215239,
                          44.476441,
                          0
                      ],
                      [
                          -73.215474,
                          44.476435,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "120 PINE ST LOT",
              "styleUrl": "#poly-FFD600-4401-112",
              "styleHash": "-2b08a75a",
              "styleMapHash": {
                  "normal": "#poly-FFD600-4401-112-normal",
                  "highlight": "#poly-FFD600-4401-112-highlight"
              },
              "description": "Capacity:\t16\nAddress:\t120 Pine St\nPublic Access:\tM-Fri 5pm-2am, Sat-Sun All Day\nAccepts: Credit card\nRate:\t$4/hr\n",
              "stroke": "#ffd600",
              "stroke-opacity": 1,
              "stroke-width": 4.401,
              "fill": "#ffd600",
              "fill-opacity": 0.4392156862745098,
              "Square Ft": "229"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [
                          -73.2168956,
                          44.4776421,
                          0
                      ],
                      [
                          -73.2168795,
                          44.4770527,
                          0
                      ],
                      [
                          -73.2165791,
                          44.4770641,
                          0
                      ],
                      [
                          -73.2165952,
                          44.4776574,
                          0
                      ],
                      [
                          -73.2168956,
                          44.4776421,
                          0
                      ]
                  ]
              ]
          },
          "properties": {
              "name": "2 Burlington Square",
              "styleUrl": "#poly-FFD600-3301-117",
              "styleHash": "79025528",
              "styleMapHash": {
                  "normal": "#poly-FFD600-3301-117-normal",
                  "highlight": "#poly-FFD600-3301-117-highlight"
              },
              "description": "Capacity: 26\nAddress: 2 Burlington Square\nPublic Access: Mon-Fri 5pm-2am, Sat 12pm-2am, and Sun 24 hours. \nAccepts: Credit card or cash\nManaged by Unified Parking Partners: \n844-727-5877\n",
              "stroke": "#ffd600",
              "stroke-opacity": 1,
              "stroke-width": 3.301,
              "fill": "#ffd600",
              "fill-opacity": 0.4588235294117647,
              "Square Ft": "",
              "gx_media_links": "https://doc-14-70-mymaps.googleusercontent.com/untrusted/hostedimage/64padndq3ckemoundc2hnmg8bk/02q9j4j8a06in9710au0strsho/1585854812750/H0BVQAznzd_gtLT8fWrgzmrWFyg5p0Hd/04021124565245099751/5AF2TALqydUM5DB1awPk1JHEouhWDEyI4TAhFWn8b5MDTkYxoAaQDmpe8xHtPGBYaDidTXW0hZepYkSPEwUjL0vC579PTWiZ8DQ2z8jIN7nFqKvnt6dE5GBXA04LWLh_gmWACAH-i0Epj7KZKZwz0B8qFu-lLyRq0KgNynCL8Li4oFbLm3wjmjg3srN1_LUSTGqdx96gSEhRIWN4FoFyuNZYr9T9JKgWJn2TwLCCIZ81UTXw--tOzbVHW3RQJYXjgyU2nsE0TiQKhP3vC61HH8wtatURSRsD8Ng?session=0&fife"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.21308,
                      44.478248,
                      0
                  ],
                  [
                      -73.2138996,
                      44.4782267,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 6<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.213235,
                      44.478105,
                      0
                  ],
                  [
                      -73.212915,
                      44.47812,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 6<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.211644,
                      44.478162,
                      0
                  ],
                  [
                      -73.2123212,
                      44.4781443,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 6<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.211206,
                      44.478332,
                      0
                  ],
                  [
                      -73.212336,
                      44.478295,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 6<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.213356,
                      44.4781,
                      0
                  ],
                  [
                      -73.213899,
                      44.478081,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 6<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.211432,
                      44.477359,
                      0
                  ],
                  [
                      -73.2114806,
                      44.4780588,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 12<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212714,
                      44.479243,
                      0
                  ],
                  [
                      -73.211876,
                      44.479262,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 10<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.213897,
                      44.4793379,
                      0
                  ],
                  [
                      -73.212932,
                      44.479374,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 8<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212363,
                      44.47939,
                      0
                  ],
                  [
                      -73.211282,
                      44.47942,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 10<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2135673,
                      44.4792381,
                      0
                  ],
                  [
                      -73.212857,
                      44.479262,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 8<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.211634,
                      44.4771806,
                      0
                  ],
                  [
                      -73.2121402,
                      44.4771552,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 10<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2123546,
                      44.4770622,
                      0
                  ],
                  [
                      -73.2117252,
                      44.4770832,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 6<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212854,
                      44.477158,
                      0
                  ],
                  [
                      -73.213771,
                      44.477128,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 6<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2139373,
                      44.4769722,
                      0
                  ],
                  [
                      -73.2129838,
                      44.4770072,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "TEMPORARILY UNAVAILABLE DUE TO CONSTRUCTION<br>Capacity: 10<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2113986,
                      44.4771933,
                      0
                  ],
                  [
                      -73.2112495,
                      44.4771965,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.214589,
                      44.47708,
                      0
                  ],
                  [
                      -73.215334,
                      44.47705,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 6<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2143118,
                      44.4769719,
                      0
                  ],
                  [
                      -73.2152515,
                      44.4769433,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 6<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.213095,
                      44.476008,
                      0
                  ],
                  [
                      -73.213859,
                      44.475978,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "TEMPORARILY UNAVAILABLE DUE TO CONSTRUCTION<br>Capacity: 5<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212837,
                      44.475844,
                      0
                  ],
                  [
                      -73.213804,
                      44.475808,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 9<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.211432,
                      44.476094,
                      0
                  ],
                  [
                      -73.212056,
                      44.476065,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 11<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2113497,
                      44.4758914,
                      0
                  ],
                  [
                      -73.21198,
                      44.475863,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 18<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.214234,
                      44.475999,
                      0
                  ],
                  [
                      -73.215382,
                      44.475959,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 20<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.214403,
                      44.475779,
                      0
                  ],
                  [
                      -73.215407,
                      44.475744,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 18<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.215592,
                      44.477751,
                      0
                  ],
                  [
                      -73.215608,
                      44.477997,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 4<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.21556,
                      44.477493,
                      0
                  ],
                  [
                      -73.215545,
                      44.4771,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 5<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.215739,
                      44.476851,
                      0
                  ],
                  [
                      -73.215686,
                      44.476024,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 10<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.21401,
                      44.477116,
                      0
                  ],
                  [
                      -73.214072,
                      44.478075,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 12<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.215846,
                      44.478014,
                      0
                  ],
                  [
                      -73.215829,
                      44.47776,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 5<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.214232,
                      44.47755,
                      0
                  ],
                  [
                      -73.214267,
                      44.478076,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 6<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.214222,
                      44.477456,
                      0
                  ],
                  [
                      -73.214201,
                      44.477161,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 6<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.215506,
                      44.476624,
                      0
                  ],
                  [
                      -73.215486,
                      44.476346,
                      0
                  ],
                  [
                      -73.215463,
                      44.475997,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 11<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2139992,
                      44.4764713,
                      0
                  ],
                  [
                      -73.2139682,
                      44.4760953,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 12<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2140078,
                      44.4766427,
                      0
                  ],
                  [
                      -73.2140408,
                      44.4769357,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 11<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2141287,
                      44.4767081,
                      0
                  ],
                  [
                      -73.2141357,
                      44.4767801,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2141118,
                      44.4764495,
                      0
                  ],
                  [
                      -73.2140988,
                      44.4763055,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2113945,
                      44.47711,
                      0
                  ],
                  [
                      -73.2111317,
                      44.4771176,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Smart Meters",
              "styleUrl": "#line-9C27B0-5263",
              "styleHash": "66d4c45c",
              "styleMapHash": {
                  "normal": "#line-9C27B0-5263-normal",
                  "highlight": "#line-9C27B0-5263-highlight"
              },
              "description": "Capacity: 3<br>Enforced: 9am-9pm <br>Accepts: Credit Card, Cash, ParkMobile App <br>Rate: $1.50/hr",
              "stroke": "#9c27b0",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2184,
                      44.47364,
                      0
                  ],
                  [
                      -73.218437,
                      44.474165,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 8<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.218472,
                      44.474445,
                      0
                  ],
                  [
                      -73.218458,
                      44.474343,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.218671,
                      44.473713,
                      0
                  ],
                  [
                      -73.218691,
                      44.47397,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 5<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.218479,
                      44.474856,
                      0
                  ],
                  [
                      -73.218495,
                      44.475427,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 6<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.218734,
                      44.474932,
                      0
                  ],
                  [
                      -73.218766,
                      44.475652,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 9<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.209351,
                      44.479135,
                      0
                  ],
                  [
                      -73.209913,
                      44.479122,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 5<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.20991,
                      44.479048,
                      0
                  ],
                  [
                      -73.209269,
                      44.479061,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 6<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.211041,
                      44.479019,
                      0
                  ],
                  [
                      -73.210016,
                      44.479045,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 11<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.211044,
                      44.479086,
                      0
                  ],
                  [
                      -73.21002,
                      44.479114,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 11<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.217549,
                      44.479248,
                      0
                  ],
                  [
                      -73.218766,
                      44.479211,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 5<br>Enforced: 9am-6pm <br>Accepts: Cash, App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.216168,
                      44.479279,
                      0
                  ],
                  [
                      -73.216775,
                      44.479262,
                      0
                  ],
                  [
                      -73.216824,
                      44.479272,
                      0
                  ],
                  [
                      -73.217327,
                      44.479255,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 13<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.21659,
                      44.479128,
                      0
                  ],
                  [
                      -73.218314,
                      44.479076,
                      0
                  ],
                  [
                      -73.218719,
                      44.479064,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 16<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212409,
                      44.4757395,
                      0
                  ],
                  [
                      -73.212372,
                      44.4750473,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 5<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2125153,
                      44.475264,
                      0
                  ],
                  [
                      -73.2124953,
                      44.474851,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 3<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212284,
                      44.482188,
                      0
                  ],
                  [
                      -73.212201,
                      44.480548,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 16<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.218942,
                      44.476976,
                      0
                  ],
                  [
                      -73.219617,
                      44.476957,
                      0
                  ],
                  [
                      -73.219682,
                      44.476946,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 5<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.216011,
                      44.476905,
                      0
                  ],
                  [
                      -73.217053,
                      44.476858,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 9<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2176056,
                      44.4768394,
                      0
                  ],
                  [
                      -73.2183917,
                      44.4768085,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 11<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.209523,
                      44.477342,
                      0
                  ],
                  [
                      -73.210687,
                      44.477241,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 14<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.21092,
                      44.477088,
                      0
                  ],
                  [
                      -73.20942,
                      44.477194,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 11<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2135563,
                      44.4819439,
                      0
                  ],
                  [
                      -73.2134643,
                      44.4806039,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 17<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.213772,
                      44.481948,
                      0
                  ],
                  [
                      -73.213702,
                      44.481133,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 6<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.218291,
                      44.474665,
                      0
                  ],
                  [
                      -73.217772,
                      44.474674,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 4<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.217906,
                      44.474549,
                      0
                  ],
                  [
                      -73.218465,
                      44.474529,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 4<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.214083,
                      44.474799,
                      0
                  ],
                  [
                      -73.215286,
                      44.474753,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 7<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2200327,
                      44.4775214,
                      0
                  ],
                  [
                      -73.219792,
                      44.477064,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 13<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.21913,
                      44.475838,
                      0
                  ],
                  [
                      -73.218761,
                      44.475848,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 3<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.219014,
                      44.475645,
                      0
                  ],
                  [
                      -73.219113,
                      44.475648,
                      0
                  ],
                  [
                      -73.219234,
                      44.475704,
                      0
                  ],
                  [
                      -73.219341,
                      44.475789,
                      0
                  ],
                  [
                      -73.219638,
                      44.476434,
                      0
                  ],
                  [
                      -73.219797,
                      44.47677,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 23<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.216298,
                      44.475927,
                      0
                  ],
                  [
                      -73.216873,
                      44.475907,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 8<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.216137,
                      44.475937,
                      0
                  ],
                  [
                      -73.215762,
                      44.475953,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 5<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.215713,
                      44.475718,
                      0
                  ],
                  [
                      -73.216664,
                      44.475684,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 12<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2172,
                      44.475693,
                      0
                  ],
                  [
                      -73.217874,
                      44.475665,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 5<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.209772,
                      44.476145,
                      0
                  ],
                  [
                      -73.2093022,
                      44.4761618,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 3<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.210094,
                      44.475954,
                      0
                  ],
                  [
                      -73.209696,
                      44.475972,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 3<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.21134,
                      44.480695,
                      0
                  ],
                  [
                      -73.211386,
                      44.481532,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 7<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.211132,
                      44.480709,
                      0
                  ],
                  [
                      -73.211173,
                      44.481634,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 8<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.213456,
                      44.480493,
                      0
                  ],
                  [
                      -73.21236,
                      44.480527,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 8<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2134369,
                      44.4803533,
                      0
                  ],
                  [
                      -73.2132692,
                      44.480363,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.216676,
                      44.48038,
                      0
                  ],
                  [
                      -73.217304,
                      44.480367,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 4<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.211666,
                      44.480399,
                      0
                  ],
                  [
                      -73.2119518,
                      44.480396,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.211454,
                      44.48055,
                      0
                  ],
                  [
                      -73.212135,
                      44.480532,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 5<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2151801,
                      44.4803168,
                      0
                  ],
                  [
                      -73.2156436,
                      44.4802996,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 4<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.215359,
                      44.474877,
                      0
                  ],
                  [
                      -73.215433,
                      44.475649,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 6<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.215747,
                      44.48016,
                      0
                  ],
                  [
                      -73.215693,
                      44.47934,
                      0
                  ],
                  [
                      -73.21569,
                      44.479338,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 12<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.217019,
                      44.476357,
                      0
                  ],
                  [
                      -73.216992,
                      44.475955,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 6<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.216934,
                      44.475136,
                      0
                  ],
                  [
                      -73.2169677,
                      44.4756089,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 5<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.209175,
                      44.477975,
                      0
                  ],
                  [
                      -73.209127,
                      44.477411,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 5<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.209049,
                      44.47643,
                      0
                  ],
                  [
                      -73.209103,
                      44.477149,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 7<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.210733,
                      44.474908,
                      0
                  ],
                  [
                      -73.210898,
                      44.475854,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 14<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2109172,
                      44.4749844,
                      0
                  ],
                  [
                      -73.2110274,
                      44.4756727,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 8<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.215102,
                      44.481317,
                      0
                  ],
                  [
                      -73.215126,
                      44.481523,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 5<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2187415,
                      44.4747795,
                      0
                  ],
                  [
                      -73.2187315,
                      44.4746329,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2176446,
                      44.4770122,
                      0
                  ],
                  [
                      -73.217232,
                      44.47702,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Blue Top Meters",
              "styleUrl": "#line-0288D1-5263",
              "styleHash": "1025de58",
              "styleMapHash": {
                  "normal": "#line-0288D1-5263-normal",
                  "highlight": "#line-0288D1-5263-highlight"
              },
              "description": "Capacity: 5<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#0288d1",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2176972,
                      44.4770105,
                      0
                  ],
                  [
                      -73.218563,
                      44.476976,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Brown Top Meters",
              "styleUrl": "#line-795548-5650",
              "styleHash": "-56ceea90",
              "styleMapHash": {
                  "normal": "#line-795548-5650-normal",
                  "highlight": "#line-795548-5650-highlight"
              },
              "description": "Capacity: 11\nEnforced: 9am-6pm \nAccepts: Cash, ParkMobile App \nRate: $0.40/hr",
              "stroke": "#795548",
              "stroke-opacity": 1,
              "stroke-width": 5.65,
              "FID": "2.0",
              "Zone": ""
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2126465,
                      44.4748331,
                      0
                  ],
                  [
                      -73.2136305,
                      44.4748051,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Brown Top Meters",
              "styleUrl": "#line-795548-5650",
              "styleHash": "-56ceea90",
              "styleMapHash": {
                  "normal": "#line-795548-5650-normal",
                  "highlight": "#line-795548-5650-highlight"
              },
              "description": "Capacity: 8\nEnforced: 9am-6pm \nAccepts: Cash, ParkMobile App \nRate: $0.40/hr",
              "stroke": "#795548",
              "stroke-opacity": 1,
              "stroke-width": 5.65,
              "FID": "",
              "Zone": ""
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212312,
                      44.474539,
                      0
                  ],
                  [
                      -73.212285,
                      44.474097,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Brown Top Meters",
              "styleUrl": "#line-795548-5650",
              "styleHash": "-56ceea90",
              "styleMapHash": {
                  "normal": "#line-795548-5650-normal",
                  "highlight": "#line-795548-5650-highlight"
              },
              "description": "Capacity: 8\nEnforced: 9am-6pm \nAccepts: Cash, ParkMobile App \nRate: $0.40/hr",
              "stroke": "#795548",
              "stroke-opacity": 1,
              "stroke-width": 5.65,
              "FID": "94.0",
              "Zone": ""
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212558,
                      44.474718,
                      0
                  ],
                  [
                      -73.213227,
                      44.474709,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Brown Top Meters",
              "styleUrl": "#line-795548-5650",
              "styleHash": "-56ceea90",
              "styleMapHash": {
                  "normal": "#line-795548-5650-normal",
                  "highlight": "#line-795548-5650-highlight"
              },
              "description": "Capacity: 9\nEnforced: 9am-6pm \nAccepts: Cash, ParkMobile App \nRate: $0.40/hr",
              "stroke": "#795548",
              "stroke-opacity": 1,
              "stroke-width": 5.65,
              "FID": "93.0",
              "Zone": ""
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.217897,
                      44.474549,
                      0
                  ],
                  [
                      -73.21745,
                      44.47456,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Brown Top Meters",
              "styleUrl": "#line-795548-5650",
              "styleHash": "-56ceea90",
              "styleMapHash": {
                  "normal": "#line-795548-5650-normal",
                  "highlight": "#line-795548-5650-highlight"
              },
              "description": "Capacity: 4\nEnforced: 9am-6pm \nAccepts: Cash, ParkMobile App \nRate: $0.40/hr",
              "stroke": "#795548",
              "stroke-opacity": 1,
              "stroke-width": 5.65,
              "FID": "117.0",
              "Zone": ""
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.214083,
                      44.474799,
                      0
                  ],
                  [
                      -73.214322,
                      44.47479,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Brown Top Meters",
              "styleUrl": "#line-795548-5650",
              "styleHash": "-56ceea90",
              "styleMapHash": {
                  "normal": "#line-795548-5650-normal",
                  "highlight": "#line-795548-5650-highlight"
              },
              "description": "Capacity: 2\nEnforced: 9am-6pm \nAccepts: Cash, ParkMobile App \nRate: $0.40/hr",
              "stroke": "#795548",
              "stroke-opacity": 1,
              "stroke-width": 5.65,
              "FID": "102.0",
              "Zone": ""
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2172,
                      44.475899,
                      0
                  ],
                  [
                      -73.218348,
                      44.475855,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Brown Top Meters",
              "styleUrl": "#line-795548-5650",
              "styleHash": "-56ceea90",
              "styleMapHash": {
                  "normal": "#line-795548-5650-normal",
                  "highlight": "#line-795548-5650-highlight"
              },
              "description": "Capacity: 10\nEnforced: 9am-6pm \nAccepts: Cash, ParkMobile App \nRate: $0.40/hr",
              "stroke": "#795548",
              "stroke-opacity": 1,
              "stroke-width": 5.65,
              "FID": "128.0",
              "Zone": ""
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.217881,
                      44.475664,
                      0
                  ],
                  [
                      -73.218549,
                      44.475657,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Brown Top Meters",
              "styleUrl": "#line-795548-5650",
              "styleHash": "-56ceea90",
              "styleMapHash": {
                  "normal": "#line-795548-5650-normal",
                  "highlight": "#line-795548-5650-highlight"
              },
              "description": "Capacity: 7\nEnforced: 9am-6pm \nAccepts: Cash, ParkMobile App \nRate: $0.40/hr",
              "stroke": "#795548",
              "stroke-opacity": 1,
              "stroke-width": 5.65,
              "FID": "124.0",
              "Zone": ""
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212271,
                      44.473877,
                      0
                  ],
                  [
                      -73.212269,
                      44.47381,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Brown Top Meters",
              "styleUrl": "#line-795548-5650",
              "styleHash": "-56ceea90",
              "styleMapHash": {
                  "normal": "#line-795548-5650-normal",
                  "highlight": "#line-795548-5650-highlight"
              },
              "description": "Capacity: 1\nEnforced: 9am-6pm \nAccepts: Cash, ParkMobile App \nRate: $0.40/hr",
              "stroke": "#795548",
              "stroke-opacity": 1,
              "stroke-width": 5.65,
              "FID": "98.0",
              "Zone": "3.0"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.211172,
                      44.48165,
                      0
                  ],
                  [
                      -73.211216,
                      44.482201,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Brown Top Meters",
              "styleUrl": "#line-795548-5650",
              "styleHash": "-56ceea90",
              "styleMapHash": {
                  "normal": "#line-795548-5650-normal",
                  "highlight": "#line-795548-5650-highlight"
              },
              "description": "Capacity: 7\nEnforced: 9am-6pm \nAccepts: Cash, ParkMobile App \nRate: $0.40/hr",
              "stroke": "#795548",
              "stroke-opacity": 1,
              "stroke-width": 5.65,
              "FID": "152.0",
              "Zone": "2.0"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.211397,
                      44.481649,
                      0
                  ],
                  [
                      -73.211409,
                      44.482197,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Brown Top Meters",
              "styleUrl": "#line-795548-5650",
              "styleHash": "-56ceea90",
              "styleMapHash": {
                  "normal": "#line-795548-5650-normal",
                  "highlight": "#line-795548-5650-highlight"
              },
              "description": "Capacity: 6\nEnforced: 9am-6pm \nAccepts: Cash, ParkMobile App \nRate: $0.40/hr",
              "stroke": "#795548",
              "stroke-opacity": 1,
              "stroke-width": 5.65,
              "FID": "",
              "Zone": ""
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.217758,
                      44.474673,
                      0
                  ],
                  [
                      -73.217385,
                      44.474683,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Brown Top Meters",
              "styleUrl": "#line-795548-5650",
              "styleHash": "-56ceea90",
              "styleMapHash": {
                  "normal": "#line-795548-5650-normal",
                  "highlight": "#line-795548-5650-highlight"
              },
              "description": "Capacity: 3\nEnforced: 9am-6pm \nAccepts: Cash, ParkMobile App \nRate: $0.40/hr",
              "stroke": "#795548",
              "stroke-opacity": 1,
              "stroke-width": 5.65,
              "FID": "117.0",
              "Zone": ""
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2127192,
                      44.4737427,
                      0
                  ],
                  [
                      -73.2130303,
                      44.4737236,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Brown Top Meters",
              "styleUrl": "#line-795548-5650",
              "styleHash": "-56ceea90",
              "styleMapHash": {
                  "normal": "#line-795548-5650-normal",
                  "highlight": "#line-795548-5650-highlight"
              },
              "description": "Capacity: 2\nEnforced: 9am-6pm \nAccepts: Cash, ParkMobile App \nRate: $0.40/hr",
              "stroke": "#795548",
              "stroke-opacity": 1,
              "stroke-width": 5.65,
              "FID": "",
              "Zone": ""
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2201148,
                      44.4776524,
                      0
                  ],
                  [
                      -73.2209087,
                      44.4792523,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Brown Top Meters",
              "styleUrl": "#line-795548-5650",
              "styleHash": "-56ceea90",
              "styleMapHash": {
                  "normal": "#line-795548-5650-normal",
                  "highlight": "#line-795548-5650-highlight"
              },
              "description": "Capacity: 19\nEnforced: 9am-6pm \nAccepts: Cash, ParkMobile App \nRate: $0.40/hr",
              "stroke": "#795548",
              "stroke-opacity": 1,
              "stroke-width": 5.65,
              "FID": "",
              "Zone": ""
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.213349,
                      44.478098,
                      0
                  ],
                  [
                      -73.213238,
                      44.478105,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1/hr , 30 min max",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.213068,
                      44.478249,
                      0
                  ],
                  [
                      -73.212848,
                      44.478255,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.213893,
                      44.478081,
                      0
                  ],
                  [
                      -73.214012,
                      44.478077,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.218669,
                      44.473711,
                      0
                  ],
                  [
                      -73.218658,
                      44.473602,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.218478,
                      44.474854,
                      0
                  ],
                  [
                      -73.218472,
                      44.474771,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.211426,
                      44.477228,
                      0
                  ],
                  [
                      -73.211435,
                      44.477359,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2124826,
                      44.4793887,
                      0
                  ],
                  [
                      -73.212363,
                      44.47939,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212273,
                      44.473942,
                      0
                  ],
                  [
                      -73.212269,
                      44.47388,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.217336,
                      44.476849,
                      0
                  ],
                  [
                      -73.217595,
                      44.476834,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212328,
                      44.474686,
                      0
                  ],
                  [
                      -73.212311,
                      44.474546,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.213761,
                      44.477132,
                      0
                  ],
                  [
                      -73.213964,
                      44.477123,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2093159,
                      44.4773529,
                      0
                  ],
                  [
                      -73.209513,
                      44.477345,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.21069,
                      44.477236,
                      0
                  ],
                  [
                      -73.21085,
                      44.477222,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.209447,
                      44.47719,
                      0
                  ],
                  [
                      -73.209175,
                      44.477207,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 3<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.214385,
                      44.477078,
                      0
                  ],
                  [
                      -73.2145188,
                      44.477076,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.213453,
                      44.480494,
                      0
                  ],
                  [
                      -73.213466,
                      44.4807358,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 4<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.213684,
                      44.480923,
                      0
                  ],
                  [
                      -73.213702,
                      44.48113,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.213655,
                      44.480642,
                      0
                  ],
                  [
                      -73.213672,
                      44.48079,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 3<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.218482,
                      44.474661,
                      0
                  ],
                  [
                      -73.21827,
                      44.474668,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.217179,
                      44.474697,
                      0
                  ],
                  [
                      -73.217376,
                      44.47469,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.217278,
                      44.474572,
                      0
                  ],
                  [
                      -73.217437,
                      44.474567,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 3<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.214678,
                      44.474775,
                      0
                  ],
                  [
                      -73.214446,
                      44.474786,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212859,
                      44.476016,
                      0
                  ],
                  [
                      -73.213095,
                      44.476008,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 4<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.216145,
                      44.475935,
                      0
                  ],
                  [
                      -73.21629,
                      44.475929,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212128,
                      44.476062,
                      0
                  ],
                  [
                      -73.212064,
                      44.476065,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2113,
                      44.476102,
                      0
                  ],
                  [
                      -73.211394,
                      44.476095,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.216275,
                      44.480388,
                      0
                  ],
                  [
                      -73.216407,
                      44.480386,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.21558,
                      44.477603,
                      0
                  ],
                  [
                      -73.215592,
                      44.477745,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.217047,
                      44.476773,
                      0
                  ],
                  [
                      -73.217034,
                      44.476574,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2110274,
                      44.4756727,
                      0
                  ],
                  [
                      -73.2110441,
                      44.4758216,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.21423,
                      44.477542,
                      0
                  ],
                  [
                      -73.214224,
                      44.477457,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.214177,
                      44.476732,
                      0
                  ],
                  [
                      -73.21417,
                      44.476658,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.211649,
                      44.480403,
                      0
                  ],
                  [
                      -73.211345,
                      44.480412,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2152982,
                      44.4769461,
                      0
                  ],
                  [
                      -73.2155074,
                      44.4769346,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Yellow Top Meters",
              "styleUrl": "#line-FFEA00-5263",
              "styleHash": "-50023e2",
              "styleMapHash": {
                  "normal": "#line-FFEA00-5263-normal",
                  "highlight": "#line-FFEA00-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App <br>Rate: $1.00/hr",
              "stroke": "#ffea00",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.216102,
                      44.481415,
                      0
                  ],
                  [
                      -73.216213,
                      44.481413,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.217012,
                      44.477027,
                      0
                  ],
                  [
                      -73.217232,
                      44.47702,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2142174,
                      44.477085,
                      0
                  ],
                  [
                      -73.2143713,
                      44.4770789,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.215573,
                      44.477611,
                      0
                  ],
                  [
                      -73.215563,
                      44.477504,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.215949,
                      44.479285,
                      0
                  ],
                  [
                      -73.216168,
                      44.479279,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.216666,
                      44.480382,
                      0
                  ],
                  [
                      -73.216421,
                      44.480382,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.210088,
                      44.480047,
                      0
                  ],
                  [
                      -73.21009,
                      44.48013,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.21275,
                      44.4771583,
                      0
                  ],
                  [
                      -73.212863,
                      44.477157,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212757,
                      44.478123,
                      0
                  ],
                  [
                      -73.212905,
                      44.478119,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.209983,
                      44.478326,
                      0
                  ],
                  [
                      -73.209988,
                      44.478437,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212349,
                      44.478291,
                      0
                  ],
                  [
                      -73.212597,
                      44.478286,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.218838,
                      44.475647,
                      0
                  ],
                  [
                      -73.21903,
                      44.475646,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.218358,
                      44.475857,
                      0
                  ],
                  [
                      -73.218509,
                      44.475848,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2187415,
                      44.4747795,
                      0
                  ],
                  [
                      -73.218734,
                      44.474932,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.218498,
                      44.475564,
                      0
                  ],
                  [
                      -73.218493,
                      44.475422,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.218469,
                      44.474676,
                      0
                  ],
                  [
                      -73.218471,
                      44.474769,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212322,
                      44.475061,
                      0
                  ],
                  [
                      -73.212312,
                      44.474856,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212451,
                      44.473822,
                      0
                  ],
                  [
                      -73.212453,
                      44.473904,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212253,
                      44.475857,
                      0
                  ],
                  [
                      -73.212134,
                      44.475859,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.218689,
                      44.473971,
                      0
                  ],
                  [
                      -73.218699,
                      44.474085,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.218445,
                      44.474258,
                      0
                  ],
                  [
                      -73.218459,
                      44.474333,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212848,
                      44.476015,
                      0
                  ],
                  [
                      -73.212623,
                      44.476023,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.213684,
                      44.480917,
                      0
                  ],
                  [
                      -73.213674,
                      44.480791,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212824,
                      44.475842,
                      0
                  ],
                  [
                      -73.212606,
                      44.475853,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.211397,
                      44.481649,
                      0
                  ],
                  [
                      -73.211391,
                      44.481528,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.213656,
                      44.480538,
                      0
                  ],
                  [
                      -73.213656,
                      44.480637,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2140041,
                      44.4765669,
                      0
                  ],
                  [
                      -73.2140051,
                      44.4766329,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2130968,
                      44.4803638,
                      0
                  ],
                  [
                      -73.2132692,
                      44.480363,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.215522,
                      44.476755,
                      0
                  ],
                  [
                      -73.21553,
                      44.476889,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.214176,
                      44.476868,
                      0
                  ],
                  [
                      -73.214184,
                      44.476946,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.214027,
                      44.479326,
                      0
                  ],
                  [
                      -73.2139227,
                      44.479334,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2128585,
                      44.4793771,
                      0
                  ],
                  [
                      -73.212932,
                      44.479374,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2134928,
                      44.4793378,
                      0
                  ],
                  [
                      -73.2134002,
                      44.4793397,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.213084,
                      44.4737197,
                      0
                  ],
                  [
                      -73.2132396,
                      44.4737082,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2115455,
                      44.4771816,
                      0
                  ],
                  [
                      -73.211626,
                      44.4771787,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2121617,
                      44.477158,
                      0
                  ],
                  [
                      -73.2123468,
                      44.4771556,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212697,
                      44.477016,
                      0
                  ],
                  [
                      -73.212797,
                      44.477013,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Handicapped Parking",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "TEMPORARILY UNAVAILABLE DUE TO CONSTRUCTION<br>Capacity: 1<br>Enforced: 9am-6pm <br>Accepts: Cash, ParkMobile App ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [
                  -73.2175227,
                  44.4622145,
                  0
              ]
          },
          "properties": {
              "name": "ChargePoint Station",
              "styleUrl": "#icon-1660-E65100-labelson-nodesc",
              "styleHash": "4b4c165b",
              "icon": "https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [
                  -73.2162005,
                  44.4606202,
                  0
              ]
          },
          "properties": {
              "name": "ChargePoint Station",
              "styleUrl": "#icon-1660-E65100-labelson-nodesc",
              "styleHash": "4b4c165b",
              "icon": "https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [
                  -73.2118839,
                  44.475595,
                  0
              ]
          },
          "properties": {
              "name": "ChargePoint Station",
              "styleUrl": "#icon-1660-E65100-labelson-nodesc",
              "styleHash": "4b4c165b",
              "icon": "https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [
                  -73.1981256,
                  44.4767738,
                  0
              ]
          },
          "properties": {
              "name": "ChargePoint Station",
              "styleUrl": "#icon-1660-E65100-labelson-nodesc",
              "styleHash": "4b4c165b",
              "icon": "https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [
                  -73.1928968,
                  44.4822963,
                  0
              ]
          },
          "properties": {
              "name": "ChargePoint Station",
              "styleUrl": "#icon-1660-E65100-labelson-nodesc",
              "styleHash": "4b4c165b",
              "icon": "https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [
                  -73.1949454,
                  44.4757304,
                  0
              ]
          },
          "properties": {
              "name": "ChargePoint Station",
              "styleUrl": "#icon-1660-E65100-labelson-nodesc",
              "styleHash": "4b4c165b",
              "icon": "https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [
                  -73.2165058,
                  44.4790468,
                  0
              ]
          },
          "properties": {
              "name": "ChargePoint Station",
              "styleUrl": "#icon-1660-E65100-labelson-nodesc",
              "styleHash": "4b4c165b",
              "icon": "https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [
                  -73.2029178,
                  44.4731812,
                  0
              ]
          },
          "properties": {
              "name": "ChargePoint Station",
              "styleUrl": "#icon-1660-E65100-labelson-nodesc",
              "styleHash": "4b4c165b",
              "icon": "https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [
                  -73.2122402,
                  44.4758355,
                  0
              ]
          },
          "properties": {
              "name": "ChargePoint Station",
              "styleUrl": "#icon-1660-E65100-labelson-nodesc",
              "styleHash": "4b4c165b",
              "icon": "https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [
                  -73.2117309,
                  44.4785097,
                  0
              ]
          },
          "properties": {
              "name": "ChargePoint Station",
              "styleUrl": "#icon-1660-E65100-labelson-nodesc",
              "styleHash": "4b4c165b",
              "icon": "https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [
                  -73.21744,
                  44.479075,
                  0
              ]
          },
          "properties": {
              "name": "Tesla Charging Station",
              "styleUrl": "#icon-1660-E65100-labelson-nodesc",
              "styleHash": "4b4c165b",
              "icon": "https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212268,
                      44.476058,
                      0
                  ],
                  [
                      -73.212133,
                      44.476061,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Charging Station North EV",
              "styleUrl": "#line-E65100-6069-nodesc",
              "styleHash": "46f09f55",
              "styleMapHash": {
                  "normal": "#line-E65100-6069-nodesc-normal",
                  "highlight": "#line-E65100-6069-nodesc-highlight"
              },
              "stroke": "#e65100",
              "stroke-opacity": 1,
              "stroke-width": 6.069
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2113386,
                      44.4758906,
                      0
                  ],
                  [
                      -73.211125,
                      44.475893,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Charging Station",
              "styleUrl": "#line-E65100-6069-nodesc",
              "styleHash": "46f09f55",
              "styleMapHash": {
                  "normal": "#line-E65100-6069-nodesc-normal",
                  "highlight": "#line-E65100-6069-nodesc-highlight"
              },
              "stroke": "#e65100",
              "stroke-opacity": 1,
              "stroke-width": 6.069
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2171841,
                      44.4768623,
                      0
                  ],
                  [
                      -73.2171519,
                      44.4758441,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Bus Parking",
              "styleUrl": "#line-AFB42B-5456",
              "styleHash": "6d882494",
              "styleMapHash": {
                  "normal": "#line-AFB42B-5456-normal",
                  "highlight": "#line-AFB42B-5456-highlight"
              },
              "description": "Capacity: 3 buses<br>Overnight parking permitted",
              "stroke": "#afb42b",
              "stroke-opacity": 1,
              "stroke-width": 5.456
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2162459,
                      44.4803911,
                      0
                  ],
                  [
                      -73.2161009,
                      44.4803951,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Motorcycle Parking",
              "styleUrl": "#line-828282-4000",
              "styleHash": "-725083a6",
              "styleMapHash": {
                  "normal": "#line-828282-4000-normal",
                  "highlight": "#line-828282-4000-highlight"
              },
              "description": "Capacity: 1<br>Rate: Free",
              "stroke": "#828282",
              "stroke-opacity": 1,
              "stroke-width": 4
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212127,
                      44.475858,
                      0
                  ],
                  [
                      -73.211976,
                      44.475865,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Motorcycle Parking",
              "styleUrl": "#line-828282-4000",
              "styleHash": "-725083a6",
              "styleMapHash": {
                  "normal": "#line-828282-4000-normal",
                  "highlight": "#line-828282-4000-highlight"
              },
              "description": "Capacity: 1<br>Rate: Free",
              "stroke": "#828282",
              "stroke-opacity": 1,
              "stroke-width": 4
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.218445,
                      44.474247,
                      0
                  ],
                  [
                      -73.218438,
                      44.474167,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Motorcycle Parking",
              "styleUrl": "#line-6F6F6F-4000",
              "styleHash": "-6e57df8a",
              "styleMapHash": {
                  "normal": "#line-6F6F6F-4000-normal",
                  "highlight": "#line-6F6F6F-4000-highlight"
              },
              "description": "Capacity: 1<br>Rate: Free",
              "stroke": "#6f6f6f",
              "stroke-opacity": 1,
              "stroke-width": 4
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.214394,
                      44.475781,
                      0
                  ],
                  [
                      -73.214306,
                      44.475787,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Motorcycle Parking",
              "styleUrl": "#line-828282-4000",
              "styleHash": "-725083a6",
              "styleMapHash": {
                  "normal": "#line-828282-4000-normal",
                  "highlight": "#line-828282-4000-highlight"
              },
              "description": "Capacity: 1<br>Rate: Free",
              "stroke": "#828282",
              "stroke-opacity": 1,
              "stroke-width": 4
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.216711,
                      44.474596,
                      0
                  ],
                  [
                      -73.216874,
                      44.474593,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Motorcycle Parking",
              "styleUrl": "#line-828282-4000",
              "styleHash": "-725083a6",
              "styleMapHash": {
                  "normal": "#line-828282-4000-normal",
                  "highlight": "#line-828282-4000-highlight"
              },
              "description": "Capacity: 1<br>Rate: Free",
              "stroke": "#828282",
              "stroke-opacity": 1,
              "stroke-width": 4
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.21552,
                      44.476751,
                      0
                  ],
                  [
                      -73.215507,
                      44.476623,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Motorcycle Parking",
              "styleUrl": "#line-6F6F6F-4000",
              "styleHash": "-6e57df8a",
              "styleMapHash": {
                  "normal": "#line-6F6F6F-4000-normal",
                  "highlight": "#line-6F6F6F-4000-highlight"
              },
              "description": "Capacity: 1<br>Rate: Free",
              "stroke": "#6f6f6f",
              "stroke-opacity": 1,
              "stroke-width": 4
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2139644,
                      44.4760175,
                      0
                  ],
                  [
                      -73.2139684,
                      44.4760785,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Motorcycle Parking",
              "styleUrl": "#line-828282-6264",
              "styleHash": "-6476e7a4",
              "styleMapHash": {
                  "normal": "#line-828282-6264-normal",
                  "highlight": "#line-828282-6264-highlight"
              },
              "description": "Capacity: 1<br>Rate: Free",
              "stroke": "#828282",
              "stroke-opacity": 1,
              "stroke-width": 6.264
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2121394,
                      44.4804037,
                      0
                  ],
                  [
                      -73.2120053,
                      44.4804037,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Motorcycle Parking",
              "styleUrl": "#line-757575-4875",
              "styleHash": "4af8e390",
              "styleMapHash": {
                  "normal": "#line-757575-4875-normal",
                  "highlight": "#line-757575-4875-highlight"
              },
              "description": "Capacity: 1<br>Rate: Free",
              "stroke": "#757575",
              "stroke-opacity": 1,
              "stroke-width": 4.875
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.21622,
                      44.481411,
                      0
                  ],
                  [
                      -73.217401,
                      44.481382,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Residential Parking",
              "styleUrl": "#line-FFAA00-4000",
              "styleHash": "-2f922c0a",
              "styleMapHash": {
                  "normal": "#line-FFAA00-4000-normal",
                  "highlight": "#line-FFAA00-4000-highlight"
              },
              "description": "Capacity 12",
              "stroke": "#ffaa00",
              "stroke-opacity": 1,
              "stroke-width": 4
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.216095,
                      44.481415,
                      0
                  ],
                  [
                      -73.215285,
                      44.481431,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Residential Parking",
              "styleUrl": "#line-FFAA00-4000",
              "styleHash": "-2f922c0a",
              "styleMapHash": {
                  "normal": "#line-FFAA00-4000-normal",
                  "highlight": "#line-FFAA00-4000-highlight"
              },
              "description": "Capacity 13",
              "stroke": "#ffaa00",
              "stroke-opacity": 1,
              "stroke-width": 4
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.209386,
                      44.480476,
                      0
                  ],
                  [
                      -73.209268,
                      44.479165,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Residential Parking",
              "styleUrl": "#line-FFAA00-4000",
              "styleHash": "-2f922c0a",
              "styleMapHash": {
                  "normal": "#line-FFAA00-4000-normal",
                  "highlight": "#line-FFAA00-4000-highlight"
              },
              "description": "Capacity 19",
              "stroke": "#ffaa00",
              "stroke-opacity": 1,
              "stroke-width": 4
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.217396,
                      44.481345,
                      0
                  ],
                  [
                      -73.217325,
                      44.480409,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Residential Parking",
              "styleUrl": "#line-FFAA00-4000",
              "styleHash": "-2f922c0a",
              "styleMapHash": {
                  "normal": "#line-FFAA00-4000-normal",
                  "highlight": "#line-FFAA00-4000-highlight"
              },
              "description": "Capacity 14",
              "stroke": "#ffaa00",
              "stroke-opacity": 1,
              "stroke-width": 4
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.215271,
                      44.474643,
                      0
                  ],
                  [
                      -73.214066,
                      44.474694,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Residential Parking",
              "styleUrl": "#line-FFAA00-4000",
              "styleHash": "-2f922c0a",
              "styleMapHash": {
                  "normal": "#line-FFAA00-4000-normal",
                  "highlight": "#line-FFAA00-4000-highlight"
              },
              "description": "Capacity 13",
              "stroke": "#ffaa00",
              "stroke-opacity": 1,
              "stroke-width": 4
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.216118,
                      44.473622,
                      0
                  ],
                  [
                      -73.215506,
                      44.473642,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Residential Parking",
              "styleUrl": "#line-FFAA00-4000",
              "styleHash": "-2f922c0a",
              "styleMapHash": {
                  "normal": "#line-FFAA00-4000-normal",
                  "highlight": "#line-FFAA00-4000-highlight"
              },
              "description": "Capacity 4",
              "stroke": "#ffaa00",
              "stroke-opacity": 1,
              "stroke-width": 4
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.215942,
                      44.479147,
                      0
                  ],
                  [
                      -73.21659,
                      44.479128,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Loading/Unloading Only ",
              "styleUrl": "#line-A52714-4000",
              "styleHash": "628781de",
              "styleMapHash": {
                  "normal": "#line-A52714-4000-normal",
                  "highlight": "#line-A52714-4000-highlight"
              },
              "description": "Capacity: 1",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 4
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.219738,
                      44.476966,
                      0
                  ],
                  [
                      -73.219792,
                      44.477064,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Loading/Unloading Only",
              "styleUrl": "#line-A52714-4000",
              "styleHash": "628781de",
              "styleMapHash": {
                  "normal": "#line-A52714-4000-normal",
                  "highlight": "#line-A52714-4000-highlight"
              },
              "description": "Capacity: 1",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 4
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2093159,
                      44.4773529,
                      0
                  ],
                  [
                      -73.2090953,
                      44.477364,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Loading/Unloading Only",
              "styleUrl": "#line-A52714-5456",
              "styleHash": "-3ad06f36",
              "styleMapHash": {
                  "normal": "#line-A52714-5456-normal",
                  "highlight": "#line-A52714-5456-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.456
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2126063,
                      44.479382,
                      0
                  ],
                  [
                      -73.2124602,
                      44.4793868,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Loading/Unloading Only",
              "styleUrl": "#line-A52714-5094",
              "styleHash": "-43c3444a",
              "styleMapHash": {
                  "normal": "#line-A52714-5094-normal",
                  "highlight": "#line-A52714-5094-highlight"
              },
              "description": "Capacity: 1",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.094
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2090575,
                      44.4763824,
                      0
                  ],
                  [
                      -73.2090414,
                      44.4761719,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Loading/Unloading Only",
              "styleUrl": "#line-A52714-4488",
              "styleHash": "238a4fa8",
              "styleMapHash": {
                  "normal": "#line-A52714-4488-normal",
                  "highlight": "#line-A52714-4488-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 4.488
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.212409,
                      44.4757395,
                      0
                  ],
                  [
                      -73.2124183,
                      44.4758689,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Loading/Unloading Only",
              "styleUrl": "#line-A52714-4875",
              "styleHash": "-7c7fba94",
              "styleMapHash": {
                  "normal": "#line-A52714-4875-normal",
                  "highlight": "#line-A52714-4875-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 4.875
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2200327,
                      44.4775214,
                      0
                  ],
                  [
                      -73.2201148,
                      44.4776524,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Loading/Unloading Only",
              "styleUrl": "#line-A52714-5069",
              "styleHash": "65399b06",
              "styleMapHash": {
                  "normal": "#line-A52714-5069-normal",
                  "highlight": "#line-A52714-5069-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.069
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2141046,
                      44.4762881,
                      0
                  ],
                  [
                      -73.2141006,
                      44.4762038,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Loading/Unloading Only",
              "styleUrl": "#line-A52714-4875",
              "styleHash": "-7c7fba94",
              "styleMapHash": {
                  "normal": "#line-A52714-4875-normal",
                  "highlight": "#line-A52714-4875-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 4.875
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2113945,
                      44.47711,
                      0
                  ],
                  [
                      -73.2115555,
                      44.4771023,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Loading/Unloading Only",
              "styleUrl": "#line-A52714-4681",
              "styleHash": "633a029e",
              "styleMapHash": {
                  "normal": "#line-A52714-4681-normal",
                  "highlight": "#line-A52714-4681-highlight"
              },
              "description": "Capacity: 2<br>Enforced: 9am-6pm ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 4.681
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2114873,
                      44.4780859,
                      0
                  ],
                  [
                      -73.2114927,
                      44.4781778,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Loading/Unloading Only",
              "styleUrl": "#line-A52714-4875",
              "styleHash": "-7c7fba94",
              "styleMapHash": {
                  "normal": "#line-A52714-4875-normal",
                  "highlight": "#line-A52714-4875-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 4.875
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2138996,
                      44.4782267,
                      0
                  ],
                  [
                      -73.2141119,
                      44.4782182,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Loading/Unloading Only",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2130968,
                      44.4803638,
                      0
                  ],
                  [
                      -73.2128988,
                      44.480377,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Loading/Unloading Only",
              "styleUrl": "#line-A52714-5263",
              "styleHash": "-3feb0602",
              "styleMapHash": {
                  "normal": "#line-A52714-5263-normal",
                  "highlight": "#line-A52714-5263-highlight"
              },
              "description": "Capacity: 1<br>Enforced: 9am-6pm ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 5.263
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [
                      -73.2129838,
                      44.4770072,
                      0
                  ],
                  [
                      -73.212797,
                      44.477013,
                      0
                  ]
              ]
          },
          "properties": {
              "name": "Loading/Unloading Only",
              "styleUrl": "#line-A52714-4875",
              "styleHash": "-7c7fba94",
              "styleMapHash": {
                  "normal": "#line-A52714-4875-normal",
                  "highlight": "#line-A52714-4875-highlight"
              },
              "description": "TEMPORARILY UNAVAILABLE DUE TO CONSTRUCTION<br>Capacity: 1<br>Enforced: 9am-6pm ",
              "stroke": "#a52714",
              "stroke-opacity": 1,
              "stroke-width": 4.875
          }
      }
  ]
}