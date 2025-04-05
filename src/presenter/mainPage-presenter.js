import { render, RenderPosition } from '../render';
import FiltersView from '../view/filters';
import SortView from '../view/sort';
import TripEventsListView from '../view/trip-events__list';
import TripPointView from '../view/trip-point';
import EditPointFormView from '../view/edit-point';
import AddNewPointFormView from '../view/add-new-point';


export default class MainPagePresenter {
  filters = new FiltersView();
  sort = new SortView();
  tripEventsList = new TripEventsListView();
  editPointForm = new EditPointFormView();
  addNewPointForm = new AddNewPointFormView();

  constructor({filtersContainer, contentContainer}) {
    this.filtersContainer = filtersContainer;
    this.contentContainer = contentContainer;
  }

  init() {
    render(this.filters, this.filtersContainer);
    render(this.sort, this.contentContainer);
    render(this.tripEventsList, this.contentContainer);

    for (let i = 0; i < 3; i++) {
      render(new TripPointView(), this.tripEventsList.getElement());
    }

    render(this.addNewPointForm, this.tripEventsList.getElement(), RenderPosition.AFTERBEGIN);
    render(this.editPointForm, this.tripEventsList.getElement(), RenderPosition.AFTERBEGIN);
  }
}
