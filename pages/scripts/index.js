const initialCards = [
    { name: "Vale de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
    { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
    { name: "Montanhas Carecas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
    { name: "Parque Nacional Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" }
];



initialCards.forEach((item) => {

});


const editButton = document.querySelector('.profile__edit-button');
const modalElement = document.querySelector('.popup');
const closeButton = modalElement.querySelector('.popup__close');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');
const nameInput = modalElement.querySelector('.popup__input_type_name');
const aboutInput = modalElement.querySelector('.popup__input_type_description');
const formElement = modalElement.querySelector('.popup__form');

// Seletores para o Modal de Imagem Ampliada
const imageModal = document.querySelector('#image-popup');
const imageModalCloseButton = imageModal.querySelector('.popup__close');
const modalImageElement = imageModal.querySelector('.popup__image');
const modalCaption = imageModal.querySelector('.popup__caption');

function openModal(modal) {
    console
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
    openModal(modalElement);
}


function handleProfileFormSubmit(evt) {
 
    evt.preventDefault();
    const newName = nameInput.value;
    const newAbout = aboutInput.value;

    profileName.textContent = newName;
    profileAbout.textContent = newAbout;

    closeModal(modalElement);
}


editButton.addEventListener('click', handleOpenEditModal);
closeButton.addEventListener('click', () => {
    closeModal(modalElement);
});
formElement.addEventListener('submit', handleProfileFormSubmit);

function getCardElement(data) {
   
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = data.name || "Lugar sem nome";
    cardImage.src = data.link || "./images/placeholder.jpg";
    cardImage.alt = data.name || "Lugar sem nome";

    return cardElement;
}

function renderCard(data, container) {
    const card = getCardElement(data);
    container.prepend(card); 
}


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

const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;

function handleLikeIcon(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(evt) {
    const cardItem = evt.target.closest(".card");
    cardItem.remove();
}

function getCardElement(name = "Lugar sem nome", link = "./images/placeholder.jpg") {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    return cardElement;
}


function renderCard(name, link, container) {
    const card = getCardElement(name, link);
    container.prepend(card);
}


initialCards.forEach((item) => {

    renderCard(item.name, item.link, cardsContainer);
});

function handleDeleteCard(evt) {

  const cardItem = evt.target.closest(".card");
  cardItem.remove();
}

function getCardElement(name = "Lugar sem nome", link = "./images/placeholder.jpg") {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  likeButton.addEventListener("click", handleLikeIcon);
  deleteButton.addEventListener("click", handleDeleteCard);

  return cardElement;
}

function renderCard(name, link, container) {
  const card = getCardElement(name, link);
  container.prepend(card);
}

function getCardElement(name = "Lugar sem nome", link = "./images/placeholder.jpg") {
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
        openModal(imageModal);                
    });


    likeButton.addEventListener('click', handleLikeIcon);
    deleteButton.addEventListener('click', handleDeleteCard);

    return cardElement;
}

imageModalCloseButton.addEventListener('click', () => {
    closeModal(imageModal);
});