import Observable from '../framework/observable';
import { UpdateType } from '../utils/const';

export default class PointsModel extends Observable{
  #points = [];
  #offersModel = null;
  #pointsApiService = null;

  constructor({offersModel, pointsApiService}) {
    super();
    this.#offersModel = offersModel;
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
      this._notify(UpdateType.ABORT);
      throw new Error('123');
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }

  getPointTypeOffers = (type) => this.#offersModel.getOffersByType(type);

  #adaptToClient(point) {
    const adaptedpoint = {...point,
      dateTo: point['date_to'],
      dateFrom: point['date_from'],
      isFavorite: point['is_favorite'],
      basePrice: point['base_price'],
    };

    delete adaptedpoint['date_from'];
    delete adaptedpoint['date_to'];
    delete adaptedpoint['is_favorite'];
    delete adaptedpoint['base_price'];

    return adaptedpoint;
  }
}
