import TripPointView from '../view/trip-point-view';
import EditPointFormView from '../view/edit-point-view';
import { remove, render, replace } from '../framework/render';
import { UpdateType, UserAction } from '../utils/const';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class TripPointPresenter {
  #tripPointsContainer = null;
  #point = null;
  #mode = Mode.DEFAULT;
  #destinationsModel = null;
  #offersModel = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #handleDataChange = null;
  #handleModeChange = null;
  #handleTypeChange = null;
  #handleDestinationChange = null;

  #getDestinationName = null;

  constructor({tripPointsContainer, onDataChange, onModeChange, onDestinationChange, onTypeChange, getDestinationName, destinationsModel, offersModel}) {
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#tripPointsContainer = tripPointsContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#handleDestinationChange = onDestinationChange;
    this.#handleTypeChange = onTypeChange;

    this.#getDestinationName = getDestinationName;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#pointEditComponent;

    this.#pointComponent = new TripPointView({
      point: {
        ...this.#point,
        offers: this.#offersModel.getOfferByOfferId(this.#point.type, this.#point.offers),
        destinationName: this.#getDestinationName(this.#point.destination)
      },
      onFavoriteClick: this.#onFavoriteTripPointClick,
      onEditClick: this.#onTripPointEdit
    });

    this.#pointEditComponent = new EditPointFormView({
      point: {
        ...this.#point,
        destinationObject: this.#destinationsModel.getDestination(this.#point.destination)
      },
      offersObject: this.#offersModel.getOffersByType(this.#point.type),
      destinations: this.#destinationsModel.destinations,
      onFormSubmit: this.#onTripPointEditFormSubmit,
      onFormClose: this.#onTripPointEditFormClose,
      onTypeChange: this.#onTripPointTypeChange,
      onDestinationChange: this.#onTripPointDestinationChange,
      onDeleteClick: this.#onTripPointDeleteClick
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#tripPointsContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevEditPointComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset({
        ...this.#point,
        destinationObject: this.#destinationsModel.getDestination(this.#point.destination)
      });
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #onTripPointEdit = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #onTripPointEditFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #onTripPointEditFormClose = () => {
    this.#pointEditComponent.reset({
      ...this.#point,
      destinationObject: this.#destinationsModel.getDestination(this.#point.destination)
    });
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #onFavoriteTripPointClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };

  #onTripPointTypeChange = (type) => this.#handleTypeChange(type);

  #onTripPointDestinationChange = (destinationId) => this.#handleDestinationChange(destinationId);

  #onTripPointDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };
}
