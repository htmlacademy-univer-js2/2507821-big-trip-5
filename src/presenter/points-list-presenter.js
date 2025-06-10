import { render, remove } from '../framework/render';
import SortView from '../view/sort-view';
import TripEventsListView from '../view/trip-events-list-view';
import NoPointView from '../view/no-point-view';
import TripPointPresenter from './trip-point-presenter';
import { FilterType, SortType, UpdateType, UserAction } from '../utils/const';
import { sortByPrice, sortByTime } from '../utils/trip-point';
import { filter } from '../utils/filter';
import NewPointPresenter from './new-trip-point-presenter';
import LoadingView from '../view/loading-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import AbortView from '../view/abort-view';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class PointsListPresenter {
  #contentContainer = null;
  #sortComponent = null;
  #tripEventsListComponent = new TripEventsListView();
  #loadingComponent = new LoadingView();
  #abortComponent = new AbortView();

  #addNewPointPresenter = null;
  #noPointsView = null;
  #tripPointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #pointsModel = null;
  #filterModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #isAbort = false;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });


  constructor({contentContainer, pointsModel, filterModel, destinationsModel, offersModel, onNewTripPointDestroy}) {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#addNewPointPresenter = new NewPointPresenter({
      taskListContainer: this.#tripEventsListComponent,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewTripPointDestroy,

      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      tripPointsContainer: this.#tripEventsListComponent.element,
      getDestinationName: this.#getDestinationNameById,
      onModeChange: this.#handleTripPointModeChange,
      onTypeChange: this.#onTripPointTypeChange,
      onDestinationChange: this.#handleTripPointDestinationChange,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints;
  }

  init() {
    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#addNewPointPresenter.init();
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#tripPointPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenters.clear();

    remove(this.#sortComponent);
    this.#addNewPointPresenter.destroy();
    remove(this.#loadingComponent);
    remove(this.#abortComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }

    if (this.#noPointsView) {
      remove(this.#noPointsView);
    }
  }

  #renderBoard() {
    this.#renderSort();
    render(this.#tripEventsListComponent, this.#contentContainer);

    if (this.#isAbort) {
      this.#renderAbort();
      return;
    }

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderTripPoints(this.points);
  }

  #renderTripPoints(points) {
    points.forEach((task) => this.#renderTripPoint(task));
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#contentContainer);
  }

  #renderTripPoint(point) {
    const tripPointPresenter = new TripPointPresenter({
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      tripPointsContainer: this.#tripEventsListComponent.element,
      getDestinationName: this.#getDestinationNameById,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleTripPointModeChange,
      onDestinationChange: this.#handleTripPointDestinationChange,
      onTypeChange: this.#onTripPointTypeChange
    });
    tripPointPresenter.init(point);
    this.#tripPointPresenters.set(point.id, tripPointPresenter);
  }

  #renderNoPoints() {
    this.#noPointsView = new NoPointView({
      filterType: this.#filterType
    });

    render(this.#noPointsView, this.#contentContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#contentContainer);
  }

  #renderAbort() {
    render(this.#abortComponent, this.#contentContainer);
  }

  #handleTripPointModeChange = () => {
    this.#addNewPointPresenter.destroy();
    this.#tripPointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#tripPointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#tripPointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#addNewPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#addNewPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#tripPointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#tripPointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType : true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.ABORT:
        this.#isAbort = true;
        render(this.#abortComponent, this.#contentContainer);
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #onTripPointTypeChange = (type) => this.#offersModel.getOffersByType(type);

  #handleTripPointDestinationChange = (destinationId) => this.#destinationsModel.getDestination(destinationId);

  #getDestinationNameById = (destinationId) => this.#destinationsModel.getDestination(destinationId).name;
}
