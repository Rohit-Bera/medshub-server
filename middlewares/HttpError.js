<<<<<<< HEAD
class HttpError extends Error {
  constructor(code, message) {
    super(message);

    this.code = code;
    console.log("code: ", code);
    console.log("message: ", message);
  }
}

module.exports = HttpError;
=======

class HttpError extends Error{
    constructor(code, message){
        super(message);
        this.code = code;
        // this.message = message;
    }
}

module.exports = HttpError;
>>>>>>> 0ee8b5a19718fecc4b8fa98127e02678f73bdf6d
