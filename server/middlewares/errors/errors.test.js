const { notFoundError, generalError } = require("./errors");

describe("Given a notFoundError function", () => {
  describe("When it's invoked with a response", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call the reponse method status with a 404 status code", () => {
      const expectedStatusCode = 404;

      notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
    test("Then it should call the reponse's method json with a message 'No endpoint found", () => {
      const expectedResponseMEssage = { msg: "No endpoint found" };

      notFoundError(null, res);

      expect(res.json).toHaveBeenCalledWith(expectedResponseMEssage);
    });
  });
});

describe("Given a generalError function", () => {
  describe("When its invoked with a response", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const error = { msg: "Unknown error" };

    test("Then it should call the reponse's method status with a 500", () => {
      const expectedStatusCode = 500;

      generalError(error, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
    test("Then it should call the reponse's method json with a message 'General error'", () => {
      const expectedResponseMessage = "General error";

      generalError(error, null, res);

      expect(res.json).toHaveBeenCalledWith(expectedResponseMessage);
    });
  });
});
