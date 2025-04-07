import { render, replace } from '../framework/render';
import FiltersView from '../view/filters';
import SortView from '../view/sort';
import TripEventsListView from '../view/trip-events__list';
import TripPointView from '../view/trip-point';
import EditPointFormView from '../view/edit-point';
import AddNewPointFormView from '../view/add-new-point';


const handleEsc = (evt) => {
  if (evt.key === 'Escape') {
    return true;
  } else if (evt.key === 'ArrowUp') {
    return true;
  }
  return false;
};

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
    // Форма редактирвоания + обработчик

    render(this.filters, this.filtersContainer);
    render(this.sort, this.contentContainer);
    render(this.tripEventsList, this.contentContainer);

    // Добавление точек и обработчиков событий
    for (let i = 0; i < this.points.length; i++) {
      const point = new TripPointView({point: this.points[i]});
      const button = point.element.querySelector('.event__rollup-btn');
      button.addEventListener('click', () => {
        const editPointFormView = new EditPointFormView({point: this.points[i]});
        const editPointForm = editPointFormView.element;
        editPointForm.addEventListener('submit', () => {});
        document.addEventListener('keydown', handleEsc);
        replace(editPointFormView, point);
        point.removeElement();
      });
      render(point, this.tripEventsList.element);
    }

    // render(this.addNewPointForm, this.tripEventsList.element, RenderPosition.AFTERBEGIN);
    // render(this.editPointForm, this.tripEventsList.element, RenderPosition.AFTERBEGIN);
  }
}
