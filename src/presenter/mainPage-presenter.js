import { render } from '../framework/render';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import TripEventsListView from '../view/trip-events__list-view';
import AddNewPointFormView from '../view/add-new-point-view';
import TripPointsPresenter from './trip-point-presenter';
import NoPointView from '../view/no-point-view';
import TripPointPresenter from './trip-point-presenter';
import { updateItem } from '../utils/utils';
import { SortType } from '../utils/const';


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


  constructor({filtersContainer, contentContainer, pointsModel}) {
    this.filtersContainer = filtersContainer;
    this.contentContainer = contentContainer;
    this.pointsModel = pointsModel;
    this.tripPointsPresenter = new TripPointsPresenter({points: [...this.pointsModel.getPoints()], container: this.#tripEventsListComponent});
  }

  init() {
    this.#points = this.pointsModel.getPoints().map((point, index) => ({
      ...point,
      id: index
    }));
    this.#renderTripPointsList();
  }

  #renderTripPointsList() {
    render(this.#filtersComponent, this.filtersContainer);
    this.#renderSort();
    render(this.#tripEventsListComponent, this.contentContainer);

    if (!(this.#points.length !== 0 && this.#points.every((point) => point !== undefined && point !== null))) {
      render(this.#noPointsView, this.contentContainer);
      return;
    }

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderTripPoint(this.#points[i]);
    }
  }

  #clearTripPointsList() {
    this.#tripPointPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenters.clear();
  }

  #handleTripPointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
    this.#tripPointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleTripPointModeChange = () => {
    this.#tripPointPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortTripPoints(sortType) {
    switch (sortType) {
      case SortType.EVENT:
        this.#points.sort();
        break;
      default:
        this.#points = [...this.#sourcedTripPoints];
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortTripPoints(sortType);
  };

  #renderSort() {
    this.#sortComponent = new SortView({onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.contentContainer);
  }

  #renderTripPoint(point) {
    const tripPointPresenter = new TripPointPresenter({
      tripPointsContainer: this.#tripEventsListComponent.element,
      onDataChange: this.#handleTripPointChange,
      onModeChange: this.#handleTripPointModeChange
    });
    tripPointPresenter.init(point);
    this.#tripPointPresenters.set(point.id, tripPointPresenter);
  }
}
