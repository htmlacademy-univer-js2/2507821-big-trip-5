import {remove, render, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType, BLANK_POINT} from '../utils/const.js';
import EditPointFormView from '../view/edit-point-view.js';

export default class NewPointPresenter {
  #tripPointsListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #tripPointEditComponent = null;
  #destinationsModel = null;
  #offersModel = null;

  #handleTypeChange = null;
  #handleDestinationChange = null;

  constructor({tripPointsContainer, onDataChange, onDestroy, onTypeChange, onDestinationChange, destinationsModel, offersModel}) {
    this.#tripPointsListContainer = tripPointsContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;

    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleTypeChange = onTypeChange;
    this.#handleDestinationChange = onDestinationChange;
  }

  init() {
    if (this.#tripPointEditComponent !== null) {
      return;
    }

    this.#tripPointEditComponent = new EditPointFormView({
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleCloseForm,

      destinations: this.#destinationsModel.destinations,
      offersObject: this.#offersModel.getOffersByType(BLANK_POINT.type),
      onFormClose: this.#handleCloseForm,
      onTypeChange: this.#onTripPointTypeChange,
      onDestinationChange: this.#handleDestinationChange,
      offers: this.#offersModel.getOffersByType(BLANK_POINT.type),
      isCreateFormView: true
    });

    render(this.#tripPointEditComponent, this.#tripPointsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#tripPointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#tripPointEditComponent);
    this.#tripPointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#tripPointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#tripPointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#tripPointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleCloseForm = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #onTripPointTypeChange = (type) => this.#handleTypeChange(type);
}
