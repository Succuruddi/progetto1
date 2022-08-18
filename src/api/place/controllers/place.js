'use strict';

/**
 *  place controller
 */

const {
  createCoreController
} = require('@strapi/strapi').factories;

const axios = require('axios');
const slugify = require('slugify');

module.exports = createCoreController('api::place.place', ({
  strapi
}) => ({
  //I think this is deprecated

  async openNow(ctx) {
    const {
      id
    } = ctx.params;
    let events = await strapi.db.query('api::place.place').findMany({
      select: '*', //['id', 'name'],
      where: {
        openingHours: {
          open: {
            time: {
              $gte: 1200
            }
          }
        }
      },
      populate: ['openingHours.close', 'openingHours.open'],
      limit: 100,
    });

    return events;
  },
  async createPlacesByFile(ctx) {

    let {
      url
    } = ctx.query;
    var allPlaces = (await axios.get(url)).data;
    var createdPlaces = [];
    for (var i = 0; i < allPlaces.length; i++) {
      var currentPlace = allPlaces[i];
      if (currentPlace.business_status == "OPERATIONAL") {
        var placeAddress = this.formattedAddress(currentPlace.moreInfo.address_components);
        try {
          const place = await strapi.entityService.create('api::place.place', {
            data: {
              name: currentPlace.name,
              gPlaceId: currentPlace.place_id,
              streetNumber: placeAddress.streetNumber,
              route: placeAddress.route,
              locality: placeAddress.locality,
              administrativeAreaLevel1: placeAddress.administrative_area_level_1,
              administrativeAreaLevel2: placeAddress.administrative_area_level_2,
              country: placeAddress.country,
              postCode: placeAddress.postal_code,
              formattedAddress: currentPlace.moreInfo.formatted_address,
              phoneNumber: this.replaceSpaces(currentPlace.moreInfo.international_phone_number),
              lat: currentPlace.geometry.location.lat,
              lng: currentPlace.geometry.location.lng,
              gRating: currentPlace.rating,
              googleJson: currentPlace,
              openingHours: currentPlace.moreInfo.opening_hours != null ? currentPlace.moreInfo.opening_hours.periods : [],
              googleMapsURL: currentPlace.moreInfo.url,
            }
          });
          /*const entity = await strapi.entityService.create('api::entity.entity', {
            data: {
              name: currentPlace.name,
              url: currentPlace.website,
              places: place.id,
              slug: slugify(currentPlace.name),
              coverImage: 10,
            }
          });

          const restaurant = await strapi.entityService.create('api::restaurant.restaurant', {
            data: {
              entity: entity.id,
              hide: true,
              priceLevel: currentPlace.priceLevel,
            }
          });

          return {
            place,
            entity,
            restaurant
          };*/
          createdPlaces.push(place);
        } catch (error) {
          console.log(currentPlace);
          await strapi.entityService.create('api::errorslog.errorslog', {
            data: {
              error: error.toString(),
              place_id: currentPlace.place_id,
              place: currentPlace,
            }
          });
        }
      }
    }
    return createdPlaces;



  },

  async createEntityByPlaceId(ctx) {
    let {
      placeID,
      instagram,
      twitter,
      url,
      facebookPage,
      bio,
      tiktok

    } = ctx.query;
    let currentPlaces = await strapi.entityService.findMany('api::place.place', {
      filters: {
        $and: [{
          id: placeID,
        }],
      },
    });
    let currentPlace = currentPlaces[0];
    const entity = await strapi.entityService.create('api::entity.entity', {
      data: {
        name: currentPlace.name,
        url: currentPlace.website,
        places: currentPlace.id,
        slug: slugify(currentPlace.name),
        coverImage: this.getRamdomImage(),
        instagram: instagram,
        twitter: twitter,
        url: url,
        facebookPage: facebookPage,
        bio: bio,
        tiktok: tiktok
      }
    });
    return entity;
  },

  async createRestaurantByEntityID(ctx) {
    let {
      entityID
    } = ctx.query;

    let entities = await strapi.entityService.findMany('api::entity.entity', {
      filters: {
        $and: [{
          id: entityID,
        }],
      },
      populate: ['places']
    });
    let entity = entities[0];

    const restaurant = await strapi.entityService.create('api::restaurant.restaurant', {
      data: {
        entity: entity.id,
        hide: true,
        priceLevel: entity.places[0].googleJson.price_level,
        bookingMethod: currentPlace.phoneNumber,
      }
    });
    return restaurant;
  },

  async createRestaurantByPlaceId(ctx) {
    let {
      placeID,
      instagram,
      twitter,
      url,
      facebookPage,
      bio,
      tiktok
    } = ctx.query;
    let currentPlaces = await strapi.entityService.findMany('api::place.place', {
      filters: {
        $and: [{
          id: placeID,
        }],
      },
    });
    let currentPlace = currentPlaces[0];

    const entity = await strapi.entityService.create('api::entity.entity', {
      data: {
        name: currentPlace.name,
        url: currentPlace.website,
        places: currentPlace.id,
        slug: slugify(currentPlace.name.toLowerCase()),
        coverImage: this.getRamdomImage(),
        instagram: instagram,
        twitter: twitter,
        url: url,
        facebookPage: facebookPage,
        bio: bio,
        tiktok: tiktok,

      }
    });
    const restaurant = await strapi.entityService.create('api::restaurant.restaurant', {
      data: {
        entity: entity.id,
        hide: true,
        priceLevel: currentPlace.googleJson.price_level,
        bookingMethod: currentPlace.phoneNumber,
      }
    });

    return {
      restaurant,
      entity
    };
  },

  async fixPhoneNumber(ctx) {
    let pagination = 200;
    let start = 0;
    while (start < pagination) {
      let currentPlaces = await strapi.entityService.findMany('api::place.place', {
        start: start,
        limit: pagination
      });
      for (let i = 0; i < currentPlaces.length; i++) {
        await strapi.entityService.update('api::place.place', currentPlaces[i].id, {
          data: {
            phoneNumber: this.replaceSpaces(currentPlaces[i].phoneNumber),
          },
        });
      }

      start = pagination;
      if (currentPlaces.length == pagination) {
        pagination += 200;
      }


    }
    return "OK";
  },

  async fixSlug(ctx) {
    let pagination = 200;
    let start = 0;
    while (start < pagination) {
      let currentEntities = await strapi.entityService.findMany('api::entity.entity', {
        start: start,
        limit: pagination
      });
      for (let i = 0; i < currentEntities.length; i++) {
        await strapi.entityService.update('api::entity.entity', currentEntities[i].id, {
          data: {
            slug: this.replaceSpaces(currentEntities[i].slug.toLowerCase()),
          },
        });
      }

      start = pagination;
      if (currentEntities.length == pagination) {
        pagination += 200;
      }


    }
    return "OK";
  },

  async fixServiceLevel(ctx) {
    let pagination = 200;
    let start = 0;
    while (start < pagination) {
      let currentRestaurants = await strapi.entityService.findMany('api::restaurant.restaurant', {
        start: start,
        limit: pagination
      });
      for (let i = 0; i < currentRestaurants.length; i++) {
        await strapi.entityService.update('api::restaurant.restaurant', currentRestaurants[i].id, {
          data: {
            serviceLevel: 0,
          },
        });
      }

      start = pagination;
      if (currentRestaurants.length == pagination) {
        pagination += 200;
      }


    }
    return "OK";
  },

  async createPlacesByJSON(ctx) {


    // var allPlaces = ctx.request.body
    // var createdPlaces = [];
    // for (var i = 0; i < allPlaces.length; i++) {
    //var currentPlace = allPlaces[i];
    var currentPlace = ctx.request.body;
    let place = "mec"
    if (currentPlace.business_status == "OPERATIONAL") {
      var placeAddress = this.formattedAddress(currentPlace.moreInfo.address_components);
      try {
        place = await strapi.entityService.create('api::place.place', {
          data: {
            name: currentPlace.name,
            gPlaceId: currentPlace.place_id,
            streetNumber: placeAddress.streetNumber,
            route: placeAddress.route,
            locality: placeAddress.locality,
            administrativeAreaLevel1: placeAddress.administrative_area_level_1,
            administrativeAreaLevel2: placeAddress.administrative_area_level_2,
            country: placeAddress.country,
            postCode: placeAddress.postal_code,
            formattedAddress: currentPlace.moreInfo.formatted_address,
            phoneNumber: this.replaceSpaces(currentPlace.moreInfo.international_phone_number),
            lat: currentPlace.geometry.location.lat,
            lng: currentPlace.geometry.location.lng,
            gRating: currentPlace.rating,
            googleJson: currentPlace,
            openingHours: currentPlace.moreInfo.opening_hours != null ? currentPlace.moreInfo.opening_hours.periods : [],
            googleMapsURL: currentPlace.moreInfo.url,
          }
        });


      } catch (error) {
        console.log(currentPlace);
        await strapi.entityService.create('api::errorslog.errorslog', {
          data: {
            error: error.toString(),
            place_id: currentPlace.place_id,
            place: currentPlace,
          }
        });
      }

    }
    return place;



  },

  replaceSpaces(string) {
    if (string !== null) {
      string = string.replace(/\s+/g, '');
    }
    return string;
  },

  formattedAddress(address_components) {
    var streetNumber;
    var route;
    var locality;
    var administrative_area_level_1;
    var administrative_area_level_2;
    var country;
    var postal_code;
    for (var i = 0; i < address_components.length; i++) {
      switch (address_components[i].types[0]) {
        case "street_number":
          streetNumber = address_components[i].long_name;
          break;
        case "route":
          route = address_components[i].long_name;
          break;
        case "locality":
          locality = address_components[i].long_name;
          break;
        case "administrative_area_level_1":
          administrative_area_level_1 = address_components[i].long_name;
          break;
        case "administrative_area_level_2":
          administrative_area_level_2 = address_components[i].long_name;
          break;
        case "country":
          country = address_components[i].long_name;
          break;
        case "postal_code":
          postal_code = address_components[i].long_name;
          break;
      }
    }
    var result = {
      streetNumber,
      route,
      locality,
      administrative_area_level_1,
      administrative_area_level_2,
      country,
      postal_code
    }
    return result;
  },

  getRamdomImage() {
    //let defaultImagesIdArray = [10];
    let defaultImagesIdArray = [410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433];
    let index = Math.floor(Math.random() * defaultImagesIdArray.length);
    return defaultImagesIdArray[index];

  }

}));
