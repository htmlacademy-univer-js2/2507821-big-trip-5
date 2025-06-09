import AbstractView from '../framework/view/abstract-view';

const getFilterTemplate = (filter, currentFilter) => (`<div class="trip-filters__filter">
      <input id="filter-${filter.type.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}" ${ (filter.count === 0) ? 'disabled' : ''} ${ (currentFilter === filter.type) ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${filter.type.toLowerCase()}">${filter.type}</label>
    </div>`
);

const createFiltersTemplate = (filters, currentFilter) => (`<form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => getFilterTemplate(filter, currentFilter)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`);

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
