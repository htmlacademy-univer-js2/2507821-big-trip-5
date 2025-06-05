import { render } from '../framework/render';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import TripEventsListView from '../view/trip-events__list-view';
import AddNewPointFormView from '../view/add-new-point-view';
import TripPointsPresenter from './trip-point-presenter';
import NoPointView from '../view/no-point-view';
import TripPointPresenter from './trip-point-presenter';
import { updateItem } from '../utils/utils';
import PointsModel from '../model/points-model';
import DestinationsModel from '../model/destinations-model';
import { SortType } from '../utils/const';
import { sortByPrice, sortByTime } from '../utils/trip-point';


export default class MainPagePresenter {
  #filtersComponent = new FiltersView();
  #sortComponent = null;
  #tripEventsListComponent = new TripEventsListView();
  #addNewPointFormComponent = new AddNewPointFormView();
  #noPointsView = new NoPointView();
  #points = [];
  #tripPointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedTripPoints = [];


  constructor({filtersContainer, contentContainer, pointsModel, destinationsModel}) {
    this.filtersContainer = filtersContainer;
    this.contentContainer = contentContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.tripPointsPresenter = new TripPointsPresenter({points: [...this.pointsModel.points], container: this.#tripEventsListComponent});
  }

  init() {
    this.#points = this.pointsModel.points.map((point, index) => ({
      ...point,
      id: index
    }));

    this.#sourcedTripPoints = this.pointsModel.points.map((point, index) => ({
      ...point,
      id: index
    }));
    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#filtersComponent, this.filtersContainer);
    this.#renderSort();
    render(this.#tripEventsListComponent, this.contentContainer);

    this.#renderTripPointsList();
  }

  #renderTripPointsList() {
    if (!(this.#points.length !== 0 && this.#points.every((point) => point !== undefined && point !== null))) {
      render(this.#noPointsView, this.contentContainer);
      return;
    }

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderTripPoint(this.#points[i]);
    }
  }

  #renderSort() {
    this.#sortComponent = new SortView({onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.contentContainer);
  }

  #clearTripPointsList() {
    this.#tripPointPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenters.clear();
  }

  #handleTripPointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#tripPointPresenters.get(updatedPoint.id).init(updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
  };

  #handleTripPointModeChange = () => {
    this.#tripPointPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortTripPoints(sortType) {
    switch (sortType) {
      case SortType.DEFAULT:
        this.#points = [...this.#sourcedTripPoints];
        break;
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
    }

    this.#clearTripPointsList();
    this.#renderTripPointsList();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#sortTripPoints(sortType);
  };

  #handleTripPointTypeChange = (newType) => PointsModel.getPointTypeOffers(newType);

  #handleTripPointDestinationChange = (destinationId) => DestinationsModel.getDestination(destinationId);

  #getDestinationNameById = (destinationId) => DestinationsModel.getDestination(destinationId).name;

  #renderTripPoint(point) {
    const tripPointPresenter = new TripPointPresenter({
      destinations: DestinationsModel.getAllDestinations(),
      tripPointsContainer: this.#tripEventsListComponent.element,
      getDestinationName: this.#getDestinationNameById,
      onDataChange: this.#handleTripPointChange,
      onModeChange: this.#handleTripPointModeChange,
      onTypeChange: this.#handleTripPointTypeChange,
      onDestinationChange: this.#handleTripPointDestinationChange
    });
    tripPointPresenter.init(point);
    this.#tripPointPresenters.set(point.id, tripPointPresenter);
  }
}
