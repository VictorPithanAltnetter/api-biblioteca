const livroService = require("../services/livroService");

async function listar(req, res) {
  const livros = await livroService.listar();

  res.json(livros);
}

async function criar(req, res) {
  const { titulo } = req.body;

  const livro = await livroService.criar(titulo);

  res.status(201).json(livro);
}

async function buscarPorId(req, res) {
  const { id } = req.params;

  const livro = await livroService.buscarPorId(id);

  if (!livro) {
    return res.status(404).json({
      mensagem: "Livro não encontrado",
    });
  }

  res.json(livro);
}

async function atualizar(req, res) {
  const { id } = req.params;
  const { titulo } = req.body;

  const livro = await livroService.atualizar(id, titulo);

  if (!livro) {
    return res.status(404).json({
      mensagem: "Livro não encontrado",
    });
  }

  res.json(livro);
}

async function excluir(req, res) {
  const { id } = req.params;

  const livro = await livroService.excluir(id);

  if (!livro) {
    return res.status(404).json({
      mensagem: "Livro não encontrado",
    });
  }

  res.json({
    mensagem: "Livro desativado com sucesso",
    livro,
  });
}

module.exports = {
  listar,
  criar,
  buscarPorId,
  atualizar,
  excluir,
};
