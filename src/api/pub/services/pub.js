'use strict';

/**
 * pub service.
 */
 const axios = require('axios').default;



 const crypto = require('crypto');
 
 const OAuth = require('oauth-1.0a');
const { createCoreService } = require('@strapi/strapi').factories;
const { Client }= require('twitter-api-sdk');
  
module.exports = createCoreService('api::pub.pub', ({
    strapi
}) => ({
  async createTweet() {

    const oauth = OAuth({

      consumer: {

        key: 'P2aTclntqMENhz7wDUnVZz822',

        secret: 'zpcYTn8y6WiHTQ8rFHP3na4OetmgMLBnOZW8aNZxGeMcikE7LK'

      },

      signature_method: 'HMAC-SHA1',

      hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')

    });



    const token = {

      key: '1555201215352504320-m8mrgpbn1GI17ej1YBInanDQTG7yVp',

      secret: '5VLtHB967vlEyPHLNtD4fm2iNVQJMG7q4Ie4bhDN0w3fA',

    };

    const authHeader = oauth.toHeader(oauth.authorize({

      url: 'https://api.twitter.com/2/tweets',

      method: 'POST'

    }, token));



    try {



      const req = await axios.post('https://api.twitter.com/2/tweets', {

        "text": "Hola VIVE"

      }, {

        headers: {

          Authorization: authHeader["Authorization"],

          'user-agent': "v2CreateTweetJS",

          'content-type': "application/json",

          'accept': "application/json"

        }

      });

    } catch (error) {

      console.log(error);

    }

  }


    }


));
