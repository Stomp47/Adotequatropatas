let selectedUserId = "";
var id;
// assim que clicar no botão salvar fechará a modal e atualiza
function closeUserModal() {
    const modalElement = document.getElementById('userModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("especie").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("porte").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("deficiencia").value = "";

    document.getElementById('submitBtn').innerHTML = "Salvar";
    selectedUserId = null;
}

function submitForm() {
    if (!selectedUserId) saveUser();
    else updateUser();
}

function writerUserRow(user) {
    const userUpdate = encodeURIComponent(JSON.stringify(user));
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
        <td class="w-25">
            <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#userModal" onclick="fillFormForUpdate('${userUpdate}')">Editar</button>
            <button class="btn btn-danger" onclick ="deleteUser('${user.id}')">Apagar</button>
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#adotaPet" onclick="adotarPet('${user.id}')">Adotar</button>
        </td>
    </tr>
    `;
}
//aqui atualiza o animal cadastrado
function fillFormForUpdate(userPayload) {
    document.getElementById('submitBtn').innerHTML = "Atualizar";
    const user = JSON.parse(decodeURIComponent(userPayload));
    document.getElementById('nome').value = user.nome;
    document.getElementById('idade').value = user.idade;
    document.getElementById('especie').value = user.especie;
    document.getElementById('genero').value = user.genero;
    document.getElementById('porte').value = user.porte;
    document.getElementById('peso').value = user.peso;
    document.getElementById('cidade').value = user.cidade;
    document.getElementById('estado').value = user.estado;
    document.getElementById('deficiencia').value = user.deficiencia;
    selectedUserId = user.id;
}

//botão salvar animal
function saveUser() {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const especie = document.getElementById("especie").value;
    const genero = document.getElementById("genero").value;
    const porte = document.getElementById("porte").value;
    const peso = document.getElementById("peso").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const deficiencia = document.getElementById("deficiencia").value;

    const { data } = axios.post('http://localhost:8080/adote-quatropatas/pet', { nome, idade, especie, genero, porte, peso, cidade, estado, deficiencia });

    const user = { selectedUserId, nome, idade, especie, genero, porte, peso, cidade, estado, deficiencia };

    const appendData = writerUserRow(user);

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML += appendData;

    closeUserModal();
    setTimeout("location.reload(true);", 17);

}
//botao atualizar animal
function updateUser() {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const especie = document.getElementById("especie").value;
    const genero = document.getElementById("genero").value;
    const porte = document.getElementById("porte").value;
    const peso = document.getElementById("peso").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const deficiencia = document.getElementById("deficiencia").value;

    axios({
        method: 'put',
        url: 'http://localhost:8080/adote-quatropatas/pet?id_externo=' + selectedUserId,
        data: { nome, idade, especie, genero, porte, peso, cidade, estado, deficiencia }
    })

    console.log(selectedUserId);
    const nomeField = document.querySelector("#row-" + selectedUserId + " td:nth-child(2)");
    const idadeField = document.querySelector("#row-" + selectedUserId + " td:nth-child(3)");
    const especieField = document.querySelector("#row-" + selectedUserId + " td:nth-child(4)");
    const generoField = document.querySelector("#row-" + selectedUserId + " td:nth-child(5)");
    const porteField = document.querySelector("#row-" + selectedUserId + " td:nth-child(6)");
    const pesoField = document.querySelector("#row-" + selectedUserId + " td:nth-child(7)");
    const cidadeField = document.querySelector("#row-" + selectedUserId + " td:nth-child(8)");
    const estadoField = document.querySelector("#row-" + selectedUserId + " td:nth-child(9)");
    const deficienciaField = document.querySelector("#row-" + selectedUserId + " td:nth-child(10)");

    const updateButtonField = document.querySelector("#row-" + selectedUserId + " td:nth-child(11) button:nth-child(1)");

    const userUpdate = encodeURIComponent(JSON.stringify({ id: selectedUserId, nome, idade, especie, genero, porte, peso, cidade, estado, deficiencia }));

    updateButtonField.setAttribute("onclick", 'fillFormForUpdate("' + userUpdate + '")');

    nomeField.innerHTML = nome;
    idadeField.innerHTML = idade;
    generoField.innerHTML = genero;
    porteField.innerHTML = porte;
    pesoField.innerHTML = peso;
    cidadeField.innerHTML = cidade;
    estadoField.innerHTML = estado;
    especieField.innerHTML = especie;
    deficienciaField.innerHTML = deficiencia;


    closeUserModal();
}
//botão deletar animal
async function deleteUser(userID) {
    await axios.delete('http://localhost:8080/adote-quatropatas/pet?id_externo=' + userID);

    const userElement = document.getElementById('row-' + userID);
    userElement.remove();
}

async function loadUsers() {
    let tableBodyContent = "";

    const { data: users } = await axios.get('http://localhost:8080/adote-quatropatas/pet');

    users.forEach(user => (tableBodyContent += writerUserRow(user)));

    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = tableBodyContent;

}
loadUsers();


// Fecha modal do adota pet
function closeAdocaoModal() {
    const modalElement = document.getElementById('adotaPet');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    document.getElementById("cpf").value = "";


    document.getElementById('submitBtn').innerHTML = "Adotar";
    selectedUserId = null;
}



// Função de adotar o pet
function adotarPet(userID) {

    console.log(userID)
    const cpf = document.getElementById("cpf").value;

    var id_pet = userID;
    axios.post('http://localhost:8080/adote-quatropatas/adocao', { id_pet, cpf }).then((response) => {
        console.log('Everything is awesome.');
    }).catch((error) => {
        console.warn('Not good man :(', error);
    })

    // closeAdocaoModal();
    // setTimeout("location.reload(true);", 17);

}

