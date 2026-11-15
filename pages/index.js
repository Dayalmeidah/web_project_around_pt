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
const profileAvatarButton = document.querySelector('.profile__avatar-button');
const nameInput = document.querySelector('#name-input');
const descriptionInput = document.querySelector('#description-input');

// Seleção dos formulários para validação
const editProfileForm = document.querySelector('#edit-profile-form');
const newCardForm = document.querySelector('#new-card-form');
const avatarForm = document.querySelector('#avatar-form');

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

    handleCardClick: (name, link) => {
      imagePopup.open({ name, link });
    },

    handleLikeClick: (cardInstance) => {
      const isLiked = cardInstance.isLiked();
      api.changeLikeCardStatus(cardInstance.getId(), !isLiked)
        .then((updatedCard) => {
          // Usa a resposta da API; se não vier `isLiked`, usa o valor que acabou de ser enviado
          const newState = typeof updatedCard.isLiked === 'boolean' ? updatedCard.isLiked : !isLiked;
          cardInstance.setLikeState(newState);
        })
        .catch((err) => {
          console.log(`Erro ao alterar curtida: ${err}`);
        });
    },

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

// 4. Instância do Section (preenchida depois do Promise.all)
let cardList;

// 5. Pop-up de Adicionar Novo Cartão
const newCardPopup = new PopupWithForm('#new-card-popup', (formData) => {
  const submitButton = newCardForm.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Criando...';

  api.addCard({
    name: formData.name,
    link: formData.link
  })
    .then((cardData) => {
      const newCardElement = createCard(cardData, userInfo.getId());
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
  submitButton.textContent = 'Salvando...';

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

// 7. Pop-up de Alterar Foto do Perfil (Etapa 9)
const avatarPopup = new PopupWithForm('#avatar-popup', (formData) => {
  const submitButton = avatarForm.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Salvando...';

  api.updateAvatar(formData.avatar)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(`Erro ao atualizar avatar: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
});
avatarPopup.setEventListeners();

// 8. Carregamento inicial de dados do servidor (usuário + cartões)
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);

    cardList = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const cardElement = createCard(cardData, userData._id);
          cardList.addItem(cardElement);
        }
      },
      '.cards__list'
    );

    cardList.renderItems();
  })
  .catch((err) => {
    console.log(`Erro ao carregar dados iniciais: ${err}`);
  });

// 9. Validação dos formulários
const editFormValidator = new FormValidator(validationConfig, editProfileForm);
const newCardFormValidator = new FormValidator(validationConfig, newCardForm);
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);

editFormValidator.enableValidation();
newCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Listeners dos botões de abertura dos pop-ups
profileEditButton.addEventListener('click', () => {
  const currentUserData = userInfo.getUserInfo();
  nameInput.value = currentUserData.name;
  descriptionInput.value = currentUserData.about; // era .description (undefined)
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

profileAddButton.addEventListener('click', () => {
  newCardFormValidator.resetValidation();
  newCardPopup.open();
});

profileAvatarButton.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});
