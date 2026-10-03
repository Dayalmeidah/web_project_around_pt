export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  // Retorna um objeto com os dados atuais do utilizador na página
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent
    };
  }

  // Atualiza os dados do utilizador no DOM
  setUserInfo({ name, description }) {
    if (name) this._nameElement.textContent = name;
    if (description) this._descriptionElement.textContent = description;
  }
}