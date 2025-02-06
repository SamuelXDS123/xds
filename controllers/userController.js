// Função de login (controlador)
const loginUser = (req, res) => {
    const { username, password } = req.body;
  
    // Simulação de validação de usuário (substitua com sua lógica de banco de dados)
    if (username === 'admin' && password === '12345') {
      res.status(200).json({ message: 'Login bem-sucedido!' });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas.' });
    }
  };
  
  module.exports = { loginUser };
  