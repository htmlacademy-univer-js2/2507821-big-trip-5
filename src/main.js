import MainPagePresenter from './presenter/mainPage-presenter';

const siteBody = document.querySelector('.page-body');
const filtersContainer = siteBody.querySelector('.trip-controls__filters');
const contentContainer = siteBody.querySelector('.trip-events');

const presenter = new MainPagePresenter({filtersContainer, contentContainer});
presenter.init();
