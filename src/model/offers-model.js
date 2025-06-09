export default class OffersModel {
  #offersApiService = null;
  #offers = [];

  constructor({offersApiService}) {
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch(err) {
      this.#offers = [];
    }
  }

  getOffersByType = (type) => this.#offers.filter((typeObj) => (typeObj.type === type.toLowerCase()))[0].offers;

  getOfferByOfferId = (type, offerId) => {
    const offers = this.#offers.filter((typeObj) => (typeObj.type === type.toLowerCase()))[0].offers;
    if (offerId instanceof String) {
      return offers.filter((offer) => offer.id === offerId)[0];
    } else if (offerId instanceof Array) {
      return offers.filter((offer) => offerId.includes(offer.id));
    }
    throw new Error('Arg offerId isn\'t String or Array type');
  };
}
