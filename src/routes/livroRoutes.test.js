const request = require("supertest");
const app = require("../app");
const livroController = require("../controllers/livroController");

jest.mock("../controllers/livroController");

describe("Rotas de livros", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /livros deve chamar o controller de listar", async () => {
    livroController.listar.mockImplementation(async (req, res) => {
      res.json([
        {
          id: 1,
          titulo: "O Hobbit",
          ativo: true,
        },
      ]);
    });

    const response = await request(app).get("/livros");

    expect(response.status).toBe(200);

    expect(response.body).toEqual([
      {
        id: 1,
        titulo: "O Hobbit",
        ativo: true,
      },
    ]);
  });
});
