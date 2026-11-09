export default class Card {
  constructor({ data, userId, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this._cardId = data._id;
    this._ownerId = data.owner._id || data.owner; // ID do dono do cartão
    this._userId = userId; // ID do seu usuário logado
    
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  // Obtém o template HTML do DOM
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  // Verifica se o cartão foi curtido pelo usuário atual
  isLiked() {
    return this._isLiked;
  }

  getId() {
    return this._cardId;
  }

  // Atualiza o estado visual do like
  setLikeState(isLiked) {
    this._isLiked = isLiked;
    if (this._isLiked) {
      this._likeButton.classList.add('card__like-button_active');
    } else {
      this._likeButton.classList.remove('card__like-button_active');
    }
  }

  // Remove o cartão da DOM
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  // Adiciona os event listeners aos elementos do cartão
  _setEventListeners() {
    // Like
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    // Delete (Lixeira)
    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteClick(this);
      });
    }

    // Zoom da Imagem
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // Gera e preenche o cartão com os dados
  generateCard() {
    this._element = this._getTemplate();
    
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    // Define o estado inicial do like (verifica se o seu ID está no array de likes)
    const isAlreadyLiked = this._likes.some(user => user._id === this._userId || user === this._userId);
    this.setLikeState(isAlreadyLiked);

    // Regra da Lixeira: Oculta o botão de excluir se o cartão NÃO foi criado por você
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove(); // Remove o botão completamente se não for seu
    }

    this._setEventListeners();

    return this._element;
  }
}