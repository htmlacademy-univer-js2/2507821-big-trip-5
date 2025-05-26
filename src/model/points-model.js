import { getRandomPoint, getPointOffers } from '../mock/points';

const POINT_COUNT = 5;
// 8.1
// 8.2
export default class PointsModel {
  #points;

  constructor({ pointsCount = POINT_COUNT}) {
    this.#points = Array.from({length: pointsCount}, getRandomPoint);
  }

  getPoints() {
    return this.#points;
  }

  static getPointTypeOffers (type) {
    return getPointOffers(type);
  }
}
