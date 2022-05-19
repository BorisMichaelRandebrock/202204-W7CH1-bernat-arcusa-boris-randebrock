require("dotenv").config();
const { userLogin } = require("./userControllers");

jest.mock("../../db/models/User", () => ({
  findOne: jest.fn().mockResolvedValue(true),
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn().mockResolvedValue(true),
}));
const statusCode = 200;
const next = () => {};

describe("Given the userControllers function", () => {
  describe("When invoked with an existing username and password", () => {
    const req = {
      body: {
        username: "bernat",
        pasword: "bernat",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should have been called called with the res.statusCode(200)", async () => {
      await userLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
    test("Then it should return a match", async () => {
      await userLogin(req, res, next);

      const expectedToken = process.env.NUESTRO_TOKEN;

      expect(res.json).toHaveBeenCalledWith({ expectedToken });
    });
  });
});
