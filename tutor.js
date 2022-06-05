let selectedUserId = "";
// aqui fecha a modal assim que realiza o cadastro do tutor(ao clicar salvar ou cancelar)
function closeUserModal() {
    const modalElement = document.getElementById('userModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    document.getElementById("cpf").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";


    document.getElementById('submitBtn').innerHTML = "Salvar";
    selectedUserId = null;
}
//verifica se o id esta presente, se sim o tutor é atualizado, se não um novo tutor é gerado
function submitForm() {
    if (!selectedUserId) saveUser();
    else updateUser();
}
//escreve os parametros do tutor conforme identificado dentro da td adotaPet
function writerUserRow(user) {
    const userUpdate = encodeURIComponent(JSON.stringify(user));
    return `
    <tr id="row-${user.cpf}">
        <td>${user.cpf}</td> 
        <td>${user.nome}</td>
        <td>${user.cidade}</td>
        <td>${user.estado}</td>
        <td>${user.email}</td>
        <td>${user.telefone}</td>
        <td class="w-25">
            <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#userModal" onclick="fillFormForUpdate('${userUpdate}')">Editar</button>
            <button class="btn btn-danger" onclick ="deleteUser('${user.cpf}')">Apagar</button>
            <button class="btn btn-success" onclick ="petForm('${user.cpf}')">Animais Adotados</button>
        </td>
    </tr>
    `;
}
//aqui atualiza() o formulario do cadastro ja feito do tutor(clicando em editar)
function fillFormForUpdate(userPayload) {

    document.getElementById('submitBtn').innerHTML = "Atualizar";
    const user = JSON.parse(decodeURIComponent(userPayload));
    document.getElementById('cpf').value = user.cpf;
    document.getElementById('nome').value = user.nome;
    document.getElementById('cidade').value = user.cidade;
    document.getElementById('estado').value = user.estado;
    document.getElementById('email').value = user.email;
    document.getElementById('telefone').value = user.telefone;
    selectedUserId = user.cpf;
}

// assim que clica em "adicionar tutor" a modal abre e assim podera salvar os dados do tutor
function saveUser() {
    const cpf = document.getElementById("cpf").value;
    const nome = document.getElementById("nome").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;


    const { data } = axios.post('http://localhost:8080/adote-quatropatas/tutor', { cpf, nome, cidade, estado, email, telefone });

    const user = { selectedUserId, cpf, nome, cidade, estado, email, telefone };

    const appendData = writerUserRow(user);

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML += appendData;

    closeUserModal();
    setTimeout("location.reload(true);", 17);

}
//aqui atualiza os dados do tutor cadastrado 
function updateUser() {
    const nome = document.getElementById("nome").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;


    axios({
        method: 'put',
        url: 'http://localhost:8080/adote-quatropatas/tutor?cpf=' + selectedUserId,
        data: { nome, cidade, estado, email, telefone }
    })

    const nomeField = document.querySelector("#row-" + selectedUserId + " td:nth-child(2)");
    const cidadeField = document.querySelector("#row-" + selectedUserId + " td:nth-child(3)");
    const estadoField = document.querySelector("#row-" + selectedUserId + " td:nth-child(4)");
    const emailField = document.querySelector("#row-" + selectedUserId + " td:nth-child(5)");
    const telefoneField = document.querySelector("#row-" + selectedUserId + " td:nth-child(6)");


    const updateButtonField = document.querySelector("#row-" + selectedUserId + " td:nth-child(7) button:nth-child(1)");

    const userUpdate = encodeURIComponent(JSON.stringify({ cpf: selectedUserId, cpf, nome, cidade, estado, email, telefone }));

    updateButtonField.setAttribute("onclick", 'fillFormForUpdate("' + userUpdate + '")');

    nomeField.innerHTML = nome;
    cidadeField.innerHTML = cidade;
    estadoField.innerHTML = estado;
    emailField.innerHTML = email;
    telefoneField.innerHTML = telefone;


    closeUserModal();
}
// aqui é o botao deletar o tutor
async function deleteUser(userID) {


    await axios.delete('http://localhost:8080/adote-quatropatas/tutor?cpf=' + userID);

    const userElement = document.getElementById('row-' + userID);
    userElement.remove();
}

async function loadUsers() {
    let tableBodyContent = "";

    const { data: users } = await axios.get('http://localhost:8080/adote-quatropatas/tutor');

    users.forEach(user => (tableBodyContent += writerUserRow(user)));

    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = tableBodyContent;


}

loadUsers();

async function petForm(userID) {

    let tableBodyContent = "";

    const { data: users } = await axios.get('http://localhost:8080/adote-quatropatas/adocao?cpf='+userID);

    users.forEach(user => (tableBodyContent += writerPetRow(user)));

    const tableBody = document.getElementById("listaPets");
    tableBody.innerHTML = tableBodyContent;


}

function writerPetRow(user) {
    return `
    <tr id="row-${user.id}">
        <td>${user.id}</td>
        <td>${user.nome}</td>
        <td>${user.idade}</td>
        <td>${user.especie}</td>
        <td>${user.genero}</td>
        <td>${user.porte}</td>
        <td>${user.peso}</td>
        <td>${user.cidade}</td>
        <td>${user.estado}</td>
        <td>${user.deficiencia}</td>
    </tr>
    `;
}
