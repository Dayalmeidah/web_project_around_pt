import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards, validationConfig } from '../utils/constants.js';

// Seletores dos elementos/botões da página
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('#name-input');
const descriptionInput = document.querySelector('#description-input');

// Seleção dos formulários para validação
const editProfileForm = document.querySelector('#edit-profile-form');
const newCardForm = document.querySelector('#new-card-form');

// 1. Instância do UserInfo
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  descriptionSelector: '.profile__description'
});

// 2. Instância do PopupWithImage
const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();

// Função auxiliar para criar cartões
function createCard(cardData) {
  const card = new Card(cardData, '#card-template', (data) => {
    imagePopup.open(data);
  });
  return card.generateCard();
}

// 3. Instância do Section para renderizar os cartões
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardList.addItem(cardElement);
    }
  },
  '.cards__list'
);

// Renderiza os cartões iniciais
cardList.renderItems();

// 4. Pop-up de Adicionar Novo Cartão
// 4. Pop-up de Adicionar Novo Cartão
const newCardPopup = new PopupWithForm('#new-card-popup', (formData) => {
  const newCardElement = createCard({
    name: formData.name,
    link: formData.link
  });
  cardList.addItem(newCardElement);
  newCardPopup.close();
});
newCardPopup.setEventListeners();

// 5. Pop-up de Editar Perfil
const editProfilePopup = new PopupWithForm('#edit-popup', (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    description: formData.description || formData['about']
  });
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

// 6. Ativação da Validação nos Formulários
const editFormValidator = new FormValidator(validationConfig, editProfileForm);
const newCardFormValidator = new FormValidator(validationConfig, newCardForm);

editFormValidator.enableValidation();
newCardFormValidator.enableValidation();

// Listeners dos botões de abertura dos Pop-ups
profileEditButton.addEventListener('click', () => {
  const currentUserData = userInfo.getUserInfo();
  nameInput.value = currentUserData.name;
  descriptionInput.value = currentUserData.description;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

profileAddButton.addEventListener('click', () => {
  newCardFormValidator.resetValidation();
  newCardPopup.open();
});