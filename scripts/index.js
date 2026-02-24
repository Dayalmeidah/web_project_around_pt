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

 
