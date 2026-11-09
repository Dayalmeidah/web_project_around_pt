import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import { api } from '../components/Api.js';
import { validationConfig } from '../utils/constants.js';

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
  aboutSelector: '.profile__description',
  avatarSelector: '.profile__image'
});

// 2. Instância do PopupWithImage
const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();

// 3. Instância do PopupWithConfirmation (Exclusão)
const confirmPopup = new PopupWithConfirmation('.popup_type_confirm');
confirmPopup.setEventListeners();

// Função auxiliar para criar cartões com todas as ações (Like, Delete, Imagem)
function createCard(cardData, userId) {
  const card = new Card({
    data: cardData,
    userId: userId,
    templateSelector: '#card-template',
    
    // Clique na imagem
    handleCardClick: (name, link) => {
      imagePopup.open({ name, link });
    },

    // Clique no Like
    handleLikeClick: (cardInstance) => {
      const isLiked = cardInstance.isLiked();
      api.changeLikeCardStatus(cardInstance.getId(), !isLiked)
        .then((updatedCard) => {
          cardInstance.setLikeState(updatedCard.isLiked);
        })
        .catch((err) => {
          console.log(`Erro ao alterar curtida: ${err}`);
        });
    },

    // Clique na Lixeira (Exclusão)
    handleDeleteClick: (cardInstance) => {
      confirmPopup.open();
      confirmPopup.setSubmitAction(() => {
        api.deleteCard(cardInstance.getId())
          .then(() => {
            cardInstance.removeCard();
            confirmPopup.close();
          })
          .catch((err) => {
            console.log(`Erro ao excluir cartão: ${err}`);
          });
      });
    }
  });

  return card.generateCard();
}

// 4. Instância do Section (inicialmente vazio, preenchido pelo Promise.all)
let cardList;

// 5. Pop-up de Adicionar Novo Cartão
const newCardPopup = new PopupWithForm('#new-card-popup', (formData) => {
  const submitButton = newCardForm.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = "Criando...";

  api.addCard({
    name: formData.name,
    link: formData.link
  })
    .then((cardData) => {
      const currentUserId = userInfo.getId(); 
      const newCardElement = createCard(cardData, currentUserId);
      cardList.addItem(newCardElement);
      newCardPopup.close();
    })
    .catch((err) => {
      console.log(`Erro ao criar cartão: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
});
newCardPopup.setEventListeners();

// 6. Pop-up de Editar Perfil
const editProfilePopup = new PopupWithForm('#edit-popup', (formData) => {
  const submitButton = editProfileForm.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = "Salvando...";

  api.updateUserInfo({
    name: formData.name,
    about: formData.about
  })
    .then((userData) => {
      userInfo.setUserInfo(userData);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(`Erro ao atualizar perfil: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
});
editProfilePopup.setEventListeners();

// 7. Carregamento Inicial de Dados do Servidor (Usuário + Cartões)
let currentUserId = null;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // Guarda o ID do utilizador
    currentUserId = userData._id;

    // Configura os dados do usuário na página
    userInfo.setUserInfo(userData);

    // Inicializa a secção de cartões com os dados do servidor
    cardList = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const cardElement = createCard(cardData, currentUserId);
          cardList.addItem(cardElement);
        }
      },
      '.cards__list'
    );

    // Renderiza os cartões iniciais
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(`Erro ao carregar dados iniciais: ${err}`);
  });

// 8. Ativação da Validação nos Formulários
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