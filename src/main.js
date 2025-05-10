import MainPagePresenter from './presenter/mainPage-presenter';
import PointsModel from './model/points-model';
import DestinationsModel from './model/destinations-model';

const siteBody = document.querySelector('.page-body');
const filtersContainer = siteBody.querySelector('.trip-controls__filters');
const contentContainer = siteBody.querySelector('.trip-events');
const pointsModel = new PointsModel({pointsCount: 5});
const destinationsModel = new DestinationsModel();

const presenter = new MainPagePresenter({
  filtersContainer,
  contentContainer,
  pointsModel,
  destinationsModel
});
presenter.init();
