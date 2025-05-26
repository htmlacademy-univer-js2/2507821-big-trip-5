import { getDestination, getAllDestinations } from '../mock/destinations';

export default class DestinationsModel {
  static getDestination(destinationId) {
    return getDestination(destinationId);
  }

  static getAllDestinations() {
    return getAllDestinations();
  }
}
