const validate = require("./validate");

describe("validate", () => {
  const schema = {
    safeParse: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve permitir dados válidos", () => {
    schema.safeParse.mockReturnValue({
      success: true,
      data: {
        titulo: "O Hobbit",
      },
    });

    const req = {
      body: {
        titulo: "O Hobbit",
      },
    };

    const res = {};

    const next = jest.fn();

    const middleware = validate(schema);

    middleware(req, res, next);

    expect(req.body).toEqual({
      titulo: "O Hobbit",
    });

    expect(next).toHaveBeenCalled();
  });

  test("deve rejeitar dados inválidos", () => {
    schema.safeParse.mockReturnValue({
      success: false,
      error: {
        issues: [
          {
            message: "Título inválido",
          },
        ],
      },
    });

    const req = {
      body: {
        titulo: "",
      },
    };

    const status = jest.fn().mockReturnThis();
    const json = jest.fn();

    const res = {
      status,
      json,
    };

    const next = jest.fn();

    const middleware = validate(schema);

    middleware(req, res, next);

    expect(status).toHaveBeenCalledWith(400);

    expect(json).toHaveBeenCalledWith({
      mensagem: "Dados inválidos",
      erros: [
        {
          message: "Título inválido",
        },
      ],
    });

    expect(next).not.toHaveBeenCalled();
  });
});
