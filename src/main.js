import PointsListPresenter from './presenter/points-list-presenter';
import PointsModel from './model/points-model';
import DestinationsModel from './model/destinations-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewTripPointButtonView from './view/new-trip-point-button-view';
import { render } from './framework/render';
import OffersModel from './model/offers-model';
import OffersApiService from './api-servise/offers-api-service';
import TripPointsApiService from './api-servise/trip-points-api-service';
import DestinationsApiService from './api-servise/destinations-api-service';

const AUTHORIZATION = 'Basic i37a47ia34cggybia34hua3xxhjnuk34hnka3c4';
const END_POINT = 'https://24.objects.htmlacademy.pro';

const siteBody = document.querySelector('.page-body');
const filtersContainer = siteBody.querySelector('.trip-controls__filters');
const contentContainer = siteBody.querySelector('.trip-events');
const siteHeaderContainer = siteBody.querySelector('.trip-main');
const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});
const pointsModel = new PointsModel({
  pointsCount: 3,
  offersModel,
  pointsApiService: new TripPointsApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainer,
  filterModel,
  pointsModel
});

const pointsListPresenter = new PointsListPresenter({
  contentContainer,
  pointsModel,
  destinationsModel,
  filterModel,
  offersModel,
  onNewTripPointDestroy: handleNewTaskFormClose
});

const newTaskButtonComponent = new NewTripPointButtonView({
  onClick: handleNewTaskButtonClick
});

function handleNewTaskFormClose() {
  newTaskButtonComponent.element.disabled = false;
}

function handleNewTaskButtonClick() {
  pointsListPresenter.createPoint();
  newTaskButtonComponent.element.disabled = true;
}

pointsListPresenter.init();
filterPresenter.init();

Promise.all([
  offersModel.init(),
  destinationsModel.init()]).
  then(() => {
    pointsModel.init().finally(() => render(newTaskButtonComponent, siteHeaderContainer));
  });
