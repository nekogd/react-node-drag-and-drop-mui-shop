export default class ErrorHandler {
  /**
   * @param e our error
   * TODO: prepare handlers and maybe connect to Flux in the hooks
   */
  static handleApiError(e) {
    // do something with our error
    console.log(e);
  }
}
