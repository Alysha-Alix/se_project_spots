const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");


const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn")
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostImageInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#card-caption-input");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileCardImage = document.querySelector(".card__image");
const profileCardTitle = document.querySelector(".card__title");

const imageModal = document.querySelector("#image-modal");
const imageModalCloseBtn = imageModal.querySelector(".modal__close-btn");
const modalContainer = document.querySelector(".modal__container");
const imageEl = imageModal.querySelector(".modal__image");
const modalCaption = imageModal.querySelector(".modal__caption");
const inputList = Array.from(document.querySelectorAll(config.inputSelector));
const allModals = document.querySelectorAll(".modal");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtn = cardElement.querySelector(".card__like-btn")
  cardLikeBtn.addEventListener("click", () => {
  cardLikeBtn.classList.toggle("card__like-btn_active")
});

  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn")
  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
});

cardImageEl.addEventListener("click", () => {
  imageEl.src = data.link;
  imageEl.alt = data.name;
  modalCaption.textContent = data.name;
  openModal(imageModal);
});
  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

editProfileBtn.addEventListener("click", function () {
  openModal(editProfileModal);
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(editProfileForm, Array.from(editProfileForm.querySelectorAll(config.inputSelector)), config)
});

editProfileCloseBtn.addEventListener("click", function() {
  closeModal(editProfileModal);
});

imageModalCloseBtn.addEventListener("click", function() {
  closeModal(imageModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});


function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const cardElement = getCardElement({
    name: newPostCaptionInput.value,
    link: newPostImageInput.value
    });
  cardsList.prepend(cardElement);
  disableButton(newPostSubmitBtn, config);
  closeModal(newPostModal);
  newPostForm.reset();
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

allModals.forEach(function (modal) {
modal.addEventListener("click", (evt) => {
  if (evt.target === modal) {
    closeModal(modal);
  }
});
});

function handleEscape (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_is-opened");
    closeModal(openedPopup);
  }
}