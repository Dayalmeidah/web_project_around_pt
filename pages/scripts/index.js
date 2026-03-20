const initialCards = [
  { name: 'Vale de Yosemite', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg' },
  { name: 'Lago Louise', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg' },
  { name: 'Montanhas Carecas', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg' },
  { name: 'Latemar', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg' },
  { name: 'Parque Nacional Vanoise', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg' },
  { name: 'Lago di Braies', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg' }
];



initialCards.forEach((item) => {

});


const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('#edit-popup');
const editCloseButton = editPopup.querySelector('.popup__close');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');
const nameInput = editPopup.querySelector('.popup__input_type_name');
const aboutInput = editPopup.querySelector('.popup__input_type_description');
const editForm = editPopup.querySelector('#edit-profile-form');

const addCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('#new-card-popup');
const newCardCloseButton = newCardPopup.querySelector('.popup__close');
const newCardForm = newCardPopup.querySelector('#new-card-form');
const cardNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardPopup.querySelector('.popup__input_type_url');

const imagePopup = document.querySelector('#image-popup');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
const modalImageElement = imagePopup.querySelector('.popup__image');
const modalCaption = imagePopup.querySelector('.popup__caption');

const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;

function openModal(modal) {
  modal.classList.add('popup_is-opened');
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
}

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closeModal(editPopup);
}

function handleOpenNewCardModal() {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  openModal(newCardPopup);
}

function handleNewCardFormSubmit(event) {
  event.preventDefault();
  const name = cardNameInput.value.trim();
  const link = cardLinkInput.value.trim();
  if (!name || !link) return;
  renderCard(name, link, cardsContainer);
  newCardForm.reset();
  closeModal(newCardPopup);
}

function toggleLike(button) {
  button.classList.toggle('card__like-button_is-active');
}

function handleLikeIcon(event) {
  toggleLike(event.currentTarget);
}

function handleDeleteCard(event) {
  const card = event.target.closest('.card');
  if (card) card.remove();
}

function createCardElement(name = 'Lugar sem nome', link = './images/placeholder.jpg') {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener('click', () => {
    modalImageElement.src = link;
    modalImageElement.alt = name;
    modalCaption.textContent = name;
    openModal(imagePopup);
  });

  likeButton.addEventListener('click', handleLikeIcon);
  deleteButton.addEventListener('click', handleDeleteCard);

  return cardElement;
}

function renderCard(name, link, container) {
  const card = createCardElement(name, link);
  container.prepend(card);
}

function setupEventListeners() {
  editButton.addEventListener('click', handleOpenEditModal);
  editCloseButton.addEventListener('click', () => closeModal(editPopup));
  editForm.addEventListener('submit', handleProfileFormSubmit);

  addCardButton.addEventListener('click', handleOpenNewCardModal);
  newCardCloseButton.addEventListener('click', () => closeModal(newCardPopup));
  newCardForm.addEventListener('submit', handleNewCardFormSubmit);

  imagePopupCloseButton.addEventListener('click', () => closeModal(imagePopup));

  document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('mousedown', (event) => {
      if (event.target === popup) closeModal(popup);
    });
  });
}

initialCards.forEach((card) => renderCard(card.name, card.link, cardsContainer));
setupEventListeners();
