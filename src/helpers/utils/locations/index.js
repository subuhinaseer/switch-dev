import {Dimensions} from 'react-native';
import {utils} from '..';
import {url} from '../../config';
import _ from 'lodash';
import polyline from '@mapbox/polyline';
import {requests} from '../../apiClient';
import {storage} from '../../storage';
const {width, height} = Dimensions.get('window');
export const ASPECT_RATIO = width / height;
export const LATITUDE_DELTA = 0.00922;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export const defaultMarkerPos = {latitude: -6.7768324, longitude: 39.2807894};

export function getPlaceName(item, includeName = false) {
  const {name, street, city, country} = item.properties;
  return [includeName && name, street, city, country].filter(p => p).join(', ');
}

export function formatSearchPlace({name, coordinates, id} = {}) {
  return {
    name: (name || '')
      .split(',')
      .filter(p => p)
      .slice(0, 2)
      .join(','),
    sub_name: (name || '')
      .split(',')
      .filter(p => p)
      .slice(-3)
      .join(','),
    display_name: name,
    longitude: coordinates[0],
    latitude: coordinates[1],
    id,
    isFavorite: true,
  };
}

export function getRegion(pos = {}) {
  /*
    : -6.7768324, "longitude": 39.28078940035111, 
    */
  return {
    latitude: pos?.latitude || defaultMarkerPos.latitude,
    longitude: pos?.longitude || defaultMarkerPos.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
}

export const formatPhotonPlace = (item, index) => {
  const [longitude, latitude] = item.geometry.coordinates;
  return {
    name: item.properties.name,
    sub_name: getPlaceName(item),
    display_name: getPlaceName(item, true),
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    id: `${index}-${item.properties.osm_id}`,
  };
};

export const formatNominatimPlace = item => {
  const {lat: latitude, lon: longitude, osm_id: id, display_name} = item;
  return {
    id,
    latitude: parseFloat(latitude || 0),
    longitude: parseFloat(longitude || 0),
    name: display_name?.split(',')[0],
    sub_name: display_name?.split(',').slice(1).join(',').trim(),
    display_name,
  };
};

export const searchReducer = (state, action) => {
  const payload = action.payload || {};
  switch (action.type) {
    case 'update_input':
      return [...state].map((input, index) => {
        return index === payload.key
          ? {
              ...input,
              ...payload,
            }
          : input;
      });
    case 'add_input':
      return [...state, payload];
    case 'init':
      return [...payload];
    case 'remove_input':
      return [...state].filter(input => input.key !== payload.key);
    default:
      return state;
  }
};

export const fetchDirections = async (locations = [['lng,lat']]) => {
  /*
  @locations: array e.g ['lng,lat']] make sure the length is >=2
  */
  const link = url.ROUTING_URL + '/driving/' + locations.join(';');
  const {data: res, ok} = await requests.get(link, null, {
    withCredentials: false,
  });
  if (ok) {
    if (res.code === 'Ok') {
      const _directions = {
        ...res,
        distance: _.sumBy(res.routes, 'distance') || '',
        duration: _.sumBy(res.routes, 'duration') || '',
        polylines: res.routes.map(route =>
          polyline
            .decode(route.geometry)
            .map(([latitude, longitude]) => ({latitude, longitude})),
        ),
      };
      return _directions;
    } else {
      return {
        error: res,
      };
    }
  } else {
    return {error: res};
  }
};

export function getDirectionURL(locations) {
  /*
  accept an array of locations ['lat,lng'] or 
  */
  let directions = locations;
  const firstPoint = locations[0];
  if (Array.isArray(firstPoint)) {
    directions = locations.map(([lng, lat]) => `${lat},${lng}`);
  } else if (typeof firstPoint !== 'string') {
    directions = locations
      .filter(l => l)
      .map(({latitude, longitude}) => `${latitude},${longitude}`);
  }
  return `https://www.google.com/maps/dir/${directions.join('/')}/@${
    directions[0]
  },14z/`;
}
function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export const geocode = async (inputData = {}) => {
  /*
        save time by not geodecoding current location for now
    */
  const {latitude, longitude} = inputData;
  let trialCount = inputData.trialCount || 0;
  // first check cached coordinates
  const cacheKey = convertToSlug(
    `geocode_${utils.round(latitude, 4)}_${utils.round(longitude, 4)}`,
  );
  const cachedValue = storage.store.getString(cacheKey);
  if (cachedValue) {
    return JSON.parse(cachedValue);
  } else {
    try {
      const link = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      const {data: res, ok, originalError} = await requests.get(link);
      if (res?.address) {
        storage.store.set(cacheKey, JSON.stringify(formatNominatimPlace(res)));
      }
      if (!ok) {
        throw new Error(originalError);
      }
      return !res?.error ? formatNominatimPlace(res) : res;
    } catch (error) {
      __DEV__ && console.log('[GEOCODE] Error', error.message);
      if (trialCount < 3) {
        trialCount += 1;
        await utils.sleep(1200);
        return geocode({...inputData, trialCount});
      } else {
        utils.toast('Geocoding error', JSON.stringify(error.message));
        return {
          id: utils.uuidv4(),
          latitude: parseFloat(latitude || 0),
          longitude: parseFloat(longitude || 0),
          name: 'Current Location',
          sub_name: 'unnamed road',
          display_name: 'unnamed road',
        };
      }
    }
  }
};
