const livroController = require("./livroController");
const livroService = require("../services/livroService");

jest.mock("../services/livroService");

describe("livroController", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("criar", () => {

        test("deve criar um livro e retornar status 201", async () => {

            livroService.criar.mockResolvedValue({
                id: 1,
                titulo: "O Hobbit",
                ativo: true
            });

            const req = {
                body: {
                    titulo: "O Hobbit"
                }
            };

            const status = jest.fn().mockReturnThis();
            const json = jest.fn();

            const res = {
                status,
                json
            };

            await livroController.criar(req, res);

            expect(livroService.criar)
                .toHaveBeenCalledWith("O Hobbit");

            expect(status)
                .toHaveBeenCalledWith(201);

            expect(json)
                .toHaveBeenCalledWith({
                    id: 1,
                    titulo: "O Hobbit",
                    ativo: true
                });
        });

    });

    describe("buscarPorId", () => {

        test("deve retornar um livro quando encontrado", async () => {

            livroService.buscarPorId.mockResolvedValue({
                id: 1,
                titulo: "O Hobbit",
                ativo: true
            });

            const req = {
                params: {
                    id: "1"
                }
            };

            const json = jest.fn();

            const res = {
                json
            };

            await livroController.buscarPorId(req, res);

            expect(livroService.buscarPorId)
                .toHaveBeenCalledWith("1");

            expect(json)
                .toHaveBeenCalledWith({
                    id: 1,
                    titulo: "O Hobbit",
                    ativo: true
                });
        });

        test("deve retornar 404 quando o livro não existir", async () => {

            livroService.buscarPorId.mockResolvedValue(undefined);

            const req = {
                params: {
                    id: "999"
                }
            };

            const status = jest.fn().mockReturnThis();
            const json = jest.fn();

            const res = {
                status,
                json
            };

            await livroController.buscarPorId(req, res);

            expect(status)
                .toHaveBeenCalledWith(404);

            expect(json)
                .toHaveBeenCalledWith({
                    mensagem: "Livro não encontrado"
                });
        });

    });

    describe("atualizar", () => {

        test("deve atualizar um livro", async () => {

            livroService.atualizar.mockResolvedValue({
                id: 1,
                titulo: "O Hobbit Atualizado",
                ativo: true
            });

            const req = {
                params: {
                    id: "1"
                },
                body: {
                    titulo: "O Hobbit Atualizado"
                }
            };

            const json = jest.fn();

            const res = {
                json
            };

            await livroController.atualizar(req, res);

            expect(livroService.atualizar)
                .toHaveBeenCalledWith(
                    "1",
                    "O Hobbit Atualizado"
                );

            expect(json)
                .toHaveBeenCalledWith({
                    id: 1,
                    titulo: "O Hobbit Atualizado",
                    ativo: true
                });
        });

    });

    describe("excluir", () => {

        test("deve desativar um livro", async () => {

            livroService.excluir.mockResolvedValue({
                id: 1,
                titulo: "O Hobbit",
                ativo: false
            });

            const req = {
                params: {
                    id: "1"
                }
            };

            const json = jest.fn();

            const res = {
                json
            };

            await livroController.excluir(req, res);

            expect(livroService.excluir)
                .toHaveBeenCalledWith("1");

            expect(json).toHaveBeenCalledWith({
                mensagem: "Livro desativado com sucesso",
                livro: {
                    id: 1,
                    titulo: "O Hobbit",
                    ativo: false
                }
            });
        });

    });

});