require("dotenv").config();
const { userLogin, userRegister } = require("./userControllers");

jest.mock("../../db/models/User", () => ({
  ...jest.requireActual("../../db/models/User"),
  findOne: jest.fn().mockResolvedValue(true),
  create: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  ...jest.requireActual("bcrypt"),
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue(),
}));

const next = () => {};

const req = {
  body: {
    username: "bernat",
    pasword: "bernat",
  },
};

describe("Given the userLogin function", () => {
  describe("When invoked with an existing username and password", () => {
    test("Then it should have been called called with the status code 200", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const statusCode = 200;

      await userLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });
});

describe("Given a userRegister function", () => {
  describe("When invoked without an existing username and password", () => {
    test("Then it should have been called called with the status code 201", async () => {
      const createdStatusCode = 201;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userRegister(req, res, next);

      expect(res.status).toHaveBeenCalledWith(createdStatusCode);
    });
  });
});
