const initialCards = [
    { name: "Vale de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
    { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
    { name: "Montanhas Carecas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
    { name: "Parque Nacional Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" }
];



initialCards.forEach((item) => {
    console.log(item.name);
});

// Elementos DOM
const editButton = document.querySelector('.profile__edit-button');
const modalElement = document.querySelector('#modal-edit');
const closeButton = modalElement.querySelector('.popup__close');


const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');



const nameInput = modalElement.querySelector('.popup__input_type_name');
const aboutInput = modalElement.querySelector('.popup__input_type_about');
const formElement = modalElement.querySelector('.popup__form');

// Funções do modal
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


function handleProfileFormSubmit(evt) {
 
    evt.preventDefault();
    const newName = nameInput.value;
    const newAbout = aboutInput.value;

    profileName.textContent = newName;
    profileAbout.textContent = newAbout;

    closeModal(modalElement);
}

// Event listeners
editButton.addEventListener('click', handleOpenEditModal);
closeButton.addEventListener('click', () => {
    closeModal(modalElement);
});
formElement.addEventListener('submit', handleProfileFormSubmit);
