let idPetSelecionado = "";

// assim que clicar no botão salvar fechará a modal e atualiza
function fechaModalCadastro() {
    const modalElement = document.getElementById('modalCadastro');
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
    idPetSelecionado = null;
}

function escolheFuncao() {
    if (!idPetSelecionado) cadastraPet();
    else EditaCadastroPet();
}

function escreveLinhaCadastroPet(pet) {
    const userUpdate = encodeURIComponent(JSON.stringify(pet));
    return `
    <tr id="row-${pet.id}">
        <td>${pet.id}</td> 
        <td>${pet.nome}</td>
        <td>${pet.idade}</td>
        <td>${pet.especie}</td>
        <td>${pet.genero}</td>
        <td>${pet.porte}</td>
        <td>${pet.peso}</td>
        <td>${pet.cidade}</td>
        <td>${pet.estado}</td>
        <td>${pet.deficiencia}</td>
        <td class="w-25">
            <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalCadastro" onclick="carregaInformacoesParaAtualizar('${userUpdate}')">Editar</button>
            <button class="btn btn-dark" onclick ="apagaCadastroPet('${pet.id}')">Apagar</button>
            <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#adotaPet" onclick="carregaInformacoesParaAdotar('${userUpdate}')">Adota Pet</button>
        </td>
    </tr>
    `;
}
//aqui atualiza o animal cadastrado
function carregaInformacoesParaAtualizar(petPayload) {
    document.getElementById('submitBtn').innerHTML = "Atualizar";
    const pet = JSON.parse(decodeURIComponent(petPayload));
    document.getElementById('nome').value = pet.nome;
    document.getElementById('idade').value = pet.idade;
    document.getElementById('especie').value = pet.especie;
    document.getElementById('genero').value = pet.genero;
    document.getElementById('porte').value = pet.porte;
    document.getElementById('peso').value = pet.peso;
    document.getElementById('cidade').value = pet.cidade;
    document.getElementById('estado').value = pet.estado;
    document.getElementById('deficiencia').value = pet.deficiencia;
    idPetSelecionado = pet.id;
}

//botão salvar animal
function cadastraPet() {
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

    const user = { idPetSelecionado, nome, idade, especie, genero, porte, peso, cidade, estado, deficiencia };

    const appendData = escreveLinhaCadastroPet(user);

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML += appendData;

    setTimeout("location.reload(true);", 17);
    fechaModalCadastro();
}

//botao atualizar animal
function EditaCadastroPet() {
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
        url: 'http://localhost:8080/adote-quatropatas/pet?id=' + idPetSelecionado,
        data: { nome, idade, especie, genero, porte, peso, cidade, estado, deficiencia }
    })

    const nomeField = document.querySelector("#row-" + idPetSelecionado + " td:nth-child(2)");
    const idadeField = document.querySelector("#row-" + idPetSelecionado + " td:nth-child(3)");
    const especieField = document.querySelector("#row-" + idPetSelecionado + " td:nth-child(4)");
    const generoField = document.querySelector("#row-" + idPetSelecionado + " td:nth-child(5)");
    const porteField = document.querySelector("#row-" + idPetSelecionado + " td:nth-child(6)");
    const pesoField = document.querySelector("#row-" + idPetSelecionado + " td:nth-child(7)");
    const cidadeField = document.querySelector("#row-" + idPetSelecionado + " td:nth-child(8)");
    const estadoField = document.querySelector("#row-" + idPetSelecionado + " td:nth-child(9)");
    const deficienciaField = document.querySelector("#row-" + idPetSelecionado + " td:nth-child(10)");

    const updateButtonField = document.querySelector("#row-" + idPetSelecionado + " td:nth-child(11) button:nth-child(1)");

    const petPayload = encodeURIComponent(JSON.stringify({ id: idPetSelecionado, nome, idade, especie, genero, porte, peso, cidade, estado, deficiencia }));

    updateButtonField.setAttribute("onclick", 'carregaInformacoesParaAtualizar("' + petPayload + '")');

    nomeField.innerHTML = nome;
    idadeField.innerHTML = idade;
    generoField.innerHTML = genero;
    porteField.innerHTML = porte;
    pesoField.innerHTML = peso;
    cidadeField.innerHTML = cidade;
    estadoField.innerHTML = estado;
    especieField.innerHTML = especie;
    deficienciaField.innerHTML = deficiencia;

    setTimeout("location.reload(true);", 17);
    fechaModalCadastro();
}

//botão deletar animal
async function apagaCadastroPet(userID) {
    await axios.delete('http://localhost:8080/adote-quatropatas/pet?id=' + userID);

    const userElement = document.getElementById('row-' + userID);
    userElement.remove();
}

async function carregaListaPets() {
    let tableBodyContent = "";

    const { data: users } = await axios.get('http://localhost:8080/adote-quatropatas/pet');

    users.forEach(user => (tableBodyContent += escreveLinhaCadastroPet(user)));

    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = tableBodyContent;

}
carregaListaPets();


// Fecha modal do adota pet
function closeAdocaoModal() {
    const modalElement = document.getElementById('adotaPet');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    document.getElementById("cpf").value = "";
    document.getElementById("id").value = "";

    document.getElementById('submitBtn').innerHTML = "Adotar";
    idPetSelecionado = null;
}

// Função de adotar o pet
function adotarPet() {

    const id = document.getElementById("id").value;
    const cpf = document.getElementById("cpf").value;

    axios.post('http://localhost:8080/adote-quatropatas/adocao', { id, cpf })

    setTimeout("location.reload(true);", 17);
    closeAdocaoModal();
}

function carregaInformacoesParaAdotar(userPayload) {
    const user = JSON.parse(decodeURIComponent(userPayload));
    document.getElementById('id').value = user.id;
    const cpf = document.getElementById("cpf").value;
}
