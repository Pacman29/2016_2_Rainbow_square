import View from "../modules/view"

export  default  class RedirectToMainMenu extends View {
  constructor(options = {}) {
    super(options);
  }

  resume(options = {}) {
    this.router.go('/play')
  }

  hide() {
  }

  show() {
  }
}
