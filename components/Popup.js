export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Abre o pop-up e adiciona o ouvinte do teclado (Esc)
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Fecha o pop-up e remove o ouvinte do teclado (Esc)
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Fecha o pop-up ao pressionar a tecla Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Adiciona ouvintes de fechar no botão (x) e ao clicar na área sombreada (overlay)
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (
        evt.target.classList.contains('popup_opened') ||
        evt.target.classList.contains('popup__close')
      ) {
        this.close();
      }
    });
  }
}