import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openModal, closeModal } from './utils.js';


const initialCards = [
  { name: 'Vale de Yosemite', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg' },
  { name: 'Lago Louise', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg' },
  { name: 'Montanhas Carecas', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg' },
  { name: 'Latemar', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg' },
  { name: 'Parque Nacional Vanoise', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg' },
  { name: 'Lago di Braies', link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg' }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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

const editFormValidator = new FormValidator(validationConfig, editForm);
const newCardFormValidator = new FormValidator(validationConfig, newCardForm);

editFormValidator.enableValidation();
newCardFormValidator.enableValidation();

function handleCardClick(name, link) {
  modalImageElement.src = link;
  modalImageElement.alt = name;
  modalCaption.textContent = name;
  openModal(imagePopup);
}

function createCard(data) {
  const card = new Card(data, '#card-template', handleCardClick);
  return card.generateCard();
}

function renderCard(data, container) {
  const cardElement = createCard(data);
  container.prepend(cardElement);
}

function handleOpenEditModal() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  editFormValidator.resetValidation();
  openModal(editPopup);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closeModal(editPopup);
}

function handleOpenNewCardModal() {
  newCardForm.reset();
  newCardFormValidator.resetValidation();
  openModal(newCardPopup);
}

function handleNewCardFormSubmit(event) {
  event.preventDefault();
  const name = cardNameInput.value.trim();
  const link = cardLinkInput.value.trim();
  if (!name || !link) return;

  renderCard({ name, link }, cardsContainer);
  closeModal(newCardPopup);
}

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

initialCards.forEach((cardData) => {
  renderCard(cardData, cardsContainer);
});