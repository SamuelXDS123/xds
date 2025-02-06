document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        const messageElement = document.getElementById('message');
        if (response.ok) {
            // Salva o token no localStorage
            localStorage.setItem('authToken', result.token);

            // Exibe mensagem de sucesso
            messageElement.textContent = 'Login bem-sucedido! Redirecionando...';
            messageElement.style.color = 'green';

            // Redireciona para a página sistema.html após 2 segundos
            setTimeout(() => {
                window.location.href = 'sistema.html';
            }, 2000);
        } else {
            // Exibe mensagem de erro
            messageElement.textContent = result.message || 'Erro ao fazer login.';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = 'Erro ao se conectar ao servidor.';
        messageElement.style.color = 'red';
    }
});
const loginForm = document.getElementById('login-form');
const messageDiv = document.getElementById('message');

// Lógica de login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
            // Redireciona para o sistema.html
            window.location.href = 'sistema.html';
        } else {
            messageDiv.textContent = result.message || 'Erro ao fazer login.';
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        messageDiv.textContent = 'Erro ao conectar com o servidor.';
        messageDiv.style.color = 'red';
    }
});
