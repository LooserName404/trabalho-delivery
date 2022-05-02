const jwt = require("jsonwebtoken")

function autenticar({ associado }) {
  function verificarToken(req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) return res.status(401).json({ message: 'Usuário não autenticado' })
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Falha na autenticação do token' })

      if ('cpf' in decoded && associado) return res.status(403).json({ message: 'Acesso negado' })

      if ('cpf' in decoded) req.motoboy = decoded
      else if ('cnpj' in decoded) req.associado = decoded
      else throw new Error()

      next()
    })
  }
}

