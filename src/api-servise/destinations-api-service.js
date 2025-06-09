import ApiService from '../framework/api-service.js';

export default class DestinationsApiService extends ApiService {
  get destinations() {
    return this._load({url: 'big-trip/destinations'}).then(ApiService.parseResponse);
  }
}
