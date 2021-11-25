class HttpError extends Error {
  constructor(code, message) {
    super(message);

    this.code = code;
    console.log("code: ", code);
    console.log("message: ", message);
  }
}

module.exports = HttpError;
