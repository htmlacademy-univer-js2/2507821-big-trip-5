import ApiService from '../framework/api-service.js';

export default class OffersApiService extends ApiService {
  get offers() {
    return this._load({url: 'big-trip/offers'}).then(ApiService.parseResponse);
  }
}
