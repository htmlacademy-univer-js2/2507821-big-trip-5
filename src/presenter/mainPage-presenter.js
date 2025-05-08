import { render } from '../framework/render';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import TripEventsListView from '../view/trip-events__list-view';
import AddNewPointFormView from '../view/add-new-point-view';
import TripPointsPresenter from './trip-point-presenter';
import NoPointView from '../view/no-point-view';
import TripPointPresenter from './trip-point-presenter';
import { updateItem } from '../utils/utils';


export default class MainPagePresenter {
  #filters = new FiltersView();
  #sort = new SortView();
  #tripEventsList = new TripEventsListView();
  #addNewPointForm = new AddNewPointFormView();
  #noPointsView = new NoPointView();
  #points = [];
  #tripPointPresenters = new Map();


  constructor({filtersContainer, contentContainer, pointsModel}) {
    this.filtersContainer = filtersContainer;
    this.contentContainer = contentContainer;
    this.pointsModel = pointsModel;
    this.tripPointsPresenter = new TripPointsPresenter({points: [...this.pointsModel.getPoints()], container: this.#tripEventsList});
  }

  init() {
    this.#points = this.pointsModel.getPoints().map((point, index) => ({
      ...point,
      id: index
    }));
    this.#renderTripPointsList();
  }

  #renderTripPointsList() {
    render(this.#filters, this.filtersContainer);
    render(this.#sort, this.contentContainer);
    render(this.#tripEventsList, this.contentContainer);

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
    this.#tripPointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleTripPointModeChange = () => {
    this.#tripPointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderTripPoint(point) {
    const tripPointPresenter = new TripPointPresenter({
      tripPointsContainer: this.#tripEventsList.element,
      onDataChange: this.#handleTripPointChange,
      onModeChange: this.#handleTripPointModeChange
    });
    tripPointPresenter.init(point);
    this.#tripPointPresenters.set(point.id, tripPointPresenter);
  }
}
