var geolocation_API_KEY="AIzaSyC4EA0q_MYWqb514AVmYLOezWoT8n5Of08";

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiai = require('apiai');
var city ="Madurai";
var accesscode;
var lati;
var logi;

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyC4EA0q_MYWqb514AVmYLOezWoT8n5Of08'
});

// getlocationlatlong();

function getlocationlatlong()
{

  googleMapsClient.geocode({
    address: 'Madurai'
  }, function(err, response) {
    if (!err) {
      var jsonresponse=JSON.parse(response.json.results);
      console.log(jsonresponse);
    }
  });



}



getlocationinfo();





function getlocationinfo() {

"use strict";
let resturl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+city+'&key='+geolocation_API_KEY+''
  request.get(resturl, (err, response, body) => {
    if (!err && response.statusCode == 200) {
console.log(response.body);
let json=JSON.parse(response.body);
console.log(json.results[0].geometry.location.lat);
console.log(json.results[0].geometry.location.lng);

 lati=json.results[0].geometry.location.lat;
 logi=json.results[0].geometry.location.lng;
console.log(lati);
console.log(logi);

 getaccesscode();


    }
    else {
      let errorMessage = 'I failed to get location info';
        }

  })


}





function getaccesscode() {
  "use strict";

  let restUrl1 = 'https://corporateapiprojectwar.mybluemix.net/corporate_banking/mybank/authenticate_client?client_id=kumarmca1@gmail.com&password=72S2V55I'
  request.get(restUrl1, (err, response1, body) => {
    if (!err && response1.statusCode == 200) {

      let json1 = JSON.parse(response1.body);
      console.log(json1);
      console.log(json1.length);

       accesscode=json1[0].token;
      console.log(accesscode);

getatmlocations();


        }

                  else {
                    let errorMessage = 'I failed to get Access Code';
                      }

                })

              }


  function getatmlocations(){
"use strict";


console.log(lati,'final');
console.log(logi,'final');
console.log(accesscode,'final');


  // let restUrl2 = 'https://corporateapiprojectwar.mybluemix.net/corporate_banking/mybank/authenticate_client?client_id=kumarmca1@gmail.com&password=72S2V55I'
  // request.get(restUrl2, (err, response2, body) => {
  //   if (!err && response2.statusCode == 200) {

  //     let json1 = JSON.parse(response2.body);
  //     console.log(json1);
  //     console.log(json1.length);

  //     let accesscode=json1[0].token;
  //     console.log(accesscode);



      console.log('access code entry');
      console.log(accesscode,'enter');

    let restUrl3= 'https://retailbanking.mybluemix.net/banking/icicibank/BranchAtmLocator?client_id=kumarmca1@gmail.com&token='+accesscode+'&locate=ATM&lat='+lati+'&long='+logi+'';

  console.log(restUrl3);
    request.get(restUrl3, (err, response3, body) => {
      if (!err && response3.statusCode == 200) {

        let json2 = JSON.parse(response3.body);
        console.log(json2.length);
        console.log('Reached1');
        console.log(json2);

        var atmlocations = [];
        for(let i=0; i<json2.length;i++ ){
          if(json2[i].pincode !== undefined && json2[i].pincode !== '')
          {

            atmlocations.push(json2[i]);
            console.log('Reached2');
            console.log(atmlocations[i-1]);

          }

          else {
            let errorMessage = 'I failed to retrieve ATM details though authorized';
             console.log('Reached3');
                }
            }
                                        }

                                        else{
                                          console.log(response3);
                                            console.log('Reached4');


                                        }

                                      });



        }

                  // else {
                  //   let errorMessage = 'I failed to get Access Code';
                  //     }

                // })





      // }
