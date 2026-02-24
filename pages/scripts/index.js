const initialCards = [
    { name: "Vale de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
    { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
    { name: "Montanhas Carecas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
    { name: "Parque Nacional Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" }
];

// 3. Percorrendo o array
initialCards.forEach((item) => {
    console.log(item.name);
});


const editProfilePopup = document.querySelector('#edit-popup');
const editButton = document.querySelector('.profile__edit-button');
const modalElement = document.querySelector('#modal-edit');
const closeButton = modalElement.querySelector('.popup__close');
function openModal(modal) {
    modal.classList.add('popup_is-opened');
}

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
}

editButton.addEventListener('click', () => {
    openModal(modalElement);
});

closeButton.addEventListener('click', () => {
    closeModal(modalElement);
});

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const editButton = document.querySelector('.profile__edit-button');
const modalElement = document.querySelector('#modal-edit');
const closeButton = modalElement.querySelector('.popup__close');

const nameInput = modalElement.querySelector('.popup__input_type_name');
const aboutInput = modalElement.querySelector('.popup__input_type_about');

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
    openModal(modalElement);
}
editButton.addEventListener('click', handleOpenEditModal);

closeButton.addEventListener('click', () => {
    closeModal(modalElement);
});

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const modalElement = document.querySelector('#modal-edit');

const formElement = modalElement.querySelector('.popup__form'); 


const nameInput = modalElement.querySelector('.popup__input_type_name');
const aboutInput = modalElement.querySelector('.popup__input_type_about');


function openModal(modal) {
    modal.classList.add('popup_is-opened');
}

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
}

function handleProfileFormSubmit(evt) {

    evt.preventDefault();
    const newName = nameInput.value;
    const newAbout = aboutInput.value;

    profileName.textContent = newName;
    profileAbout.textContent = newAbout;

    closeModal(modalElement);
}
formElement.addEventListener('submit', handleProfileFormSubmit);
