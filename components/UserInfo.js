export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    };
  }

  setUserInfo(userData) {
    if (userData.name) {
      this._nameElement.textContent = userData.name;
    }
    if (userData.about) {
      this._aboutElement.textContent = userData.about;
    }
    if (userData.avatar && this._avatarElement) {
      this._avatarElement.src = userData.avatar;
    }
    if (userData._id) {
      this._userId = userData._id;
    }
  }

  getId() {
    return this._userId;
  }
}