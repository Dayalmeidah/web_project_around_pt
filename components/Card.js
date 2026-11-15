export default class Card {
  constructor({ data, userId, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick }) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id || data.owner; // ID do dono do cartão
    this._userId = userId; // ID do usuário logado

    // A API devolve `isLiked` (boolean). Se não vier, calcula pelo array `likes`.
    this._isLiked = this._getInitialLikeState(data);

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getInitialLikeState(data) {
    if (typeof data.isLiked === 'boolean') {
      return data.isLiked;
    }
    const likes = data.likes || [];
    return likes.some((user) => user._id === this._userId || user === this._userId);
  }

  // Obtém o template HTML do DOM
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  isLiked() {
    return this._isLiked;
  }

  getId() {
    return this._cardId;
  }

  // Atualiza o estado visual do like (coração preto quando curtido)
  setLikeState(isLiked) {
    this._isLiked = isLiked;
    this._likeButton.classList.toggle('card__like-button_active', this._isLiked);
  }

  // Remove o cartão do DOM
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteClick(this);
      });
    }

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this.setLikeState(this._isLiked);

    // Só mostra a lixeira nos cartões criados pelo usuário
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }

    this._setEventListeners();

    return this._element;
  }
}
