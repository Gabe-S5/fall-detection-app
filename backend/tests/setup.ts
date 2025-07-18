import { sequelize } from "../src/config/db";

// Define mock firebase verification for tests
jest.mock("../src/config/firebase", () => ({
  verifyToken: jest.fn((token: string) => {
    if (token === "valid-token") {
      return Promise.resolve({ uid: "mockUid", email: "test@example.com" });
    } else {
      return Promise.reject(new Error("Invalid Token"));
    }
  }),
}));

// Mock openai summary creation
jest.mock("openai", () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: jest.fn().mockResolvedValue({
              choices: [{ message: { content: "Mocked summary." } }],
            }),
          },
        },
      };
    }),
  };
});

// Ensure tables are synced after each test run
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});
