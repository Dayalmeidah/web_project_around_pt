export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Método público para renderizar todos os elementos
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Método público para adicionar um elemento DOM ao contêiner
  addItem(element) {
    this._container.prepend(element);
  }
}