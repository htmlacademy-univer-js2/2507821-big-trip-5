import { render } from '../framework/render';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import TripEventsListView from '../view/trip-events__list-view';
import TripPointView from '../view/trip-point-view';
import AddNewPointFormView from '../view/add-new-point-view';
import { handleEsc } from '../utils';

export default class MainPagePresenter {
  filters = new FiltersView();
  sort = new SortView();
  tripEventsList = new TripEventsListView();
  addNewPointForm = new AddNewPointFormView();

  constructor({filtersContainer, contentContainer, pointsModel}) {
    this.filtersContainer = filtersContainer;
    this.contentContainer = contentContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];

    render(this.filters, this.filtersContainer);
    render(this.sort, this.contentContainer);
    render(this.tripEventsList, this.contentContainer);

    for (let i = 0; i < this.points.length; i++) {
      const pointView = new TripPointView({point: this.points[i], handleEsc});
      render(pointView, this.tripEventsList.element);
    }
  }
}
