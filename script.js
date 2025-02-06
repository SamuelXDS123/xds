const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const uploadForm = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const dadosTabela = document.getElementById('dados-tabela').querySelector('tbody');
const messageDiv = document.getElementById('message');
const uploadMessage = document.getElementById('upload-message');

// Função para exibir mensagens
function showMessage(element, message, isSuccess = true) {
    element.textContent = message;
    element.style.color = isSuccess ? 'green' : 'red';
}

// Evento de login
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();
            showMessage(messageDiv, result.message, response.ok);
        } catch (err) {
            console.error(err);
            showMessage(messageDiv, 'Erro ao realizar login.', false);
        }
    });
}

// Evento de registro de usuário
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('new-username').value;
        const password = document.getElementById('new-password').value;

        try {
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();
            showMessage(messageDiv, result.message, response.ok);
        } catch (err) {
            console.error(err);
            showMessage(messageDiv, 'Erro ao realizar registro.', false);
        }
    });
}

// Evento de upload e exibição de dados na tabela
if (uploadForm) {
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const file = fileInput.files[0];
        if (!file) {
            alert('Por favor, selecione uma planilha.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:3000/api/import-data', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();

                // Limpa a tabela
                dadosTabela.innerHTML = '';

                // Preenche a tabela com os dados da planilha
                data.forEach((row) => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row['Chave de Acesso'] || ''}</td>
                        <td>${row['Numero de NF-e'] || ''}</td>
                        <td>${row['Destinatario'] || ''}</td>
                        <td><input type="date" value="${row['Previsao de Entrega'] || ''}"></td>
                        <td>${row['Telefone'] || ''}</td>
                        <td>${row['Peso'] || ''}</td>
                        <td>${row['Cidade'] || ''}</td>
                    `;
                    dadosTabela.appendChild(tr);
                });

                showMessage(uploadMessage, 'Planilha importada com sucesso!');
            } else {
                showMessage(uploadMessage, 'Erro ao importar a planilha.', false);
            }
        } catch (err) {
            console.error(err);
            showMessage(uploadMessage, 'Erro ao processar a solicitação.', false);
        }
    });
}

// Botão para salvar dados adicionais
const salvarDadosBtn = document.getElementById('salvar-dados');
if (salvarDadosBtn) {
    salvarDadosBtn.addEventListener('click', () => {
        const chaveAcesso = document.getElementById('chave-acesso').value;
        const numeroNfe = document.getElementById('numero-nfe').value;
        const destinatario = document.getElementById('destinatario').value;
        const previsaoEntrega = document.getElementById('previsao-entrega').value;
        const telefone = document.getElementById('telefone').value;
        const peso = document.getElementById('peso').value;
        const cidade = document.getElementById('cidade').value;

        // Aqui você pode validar ou enviar os dados para o servidor
        console.log('Dados salvos:', {
            chaveAcesso,
            numeroNfe,
            destinatario,
            previsaoEntrega,
            telefone,
            peso,
            cidade,
        });

        document.getElementById('mensagem').textContent = 'Dados salvos com sucesso!';
    });
}
