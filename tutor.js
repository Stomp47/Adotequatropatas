let idTutorSelecionado = "";

// aqui fecha a modal assim que realiza o cadastro do tutor(ao clicar salvar ou cancelar)
function fechaModalCadastro() {
    const modalElement = document.getElementById('modalCadastro');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    document.getElementById("cpf").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";


    document.getElementById('submitBtn').innerHTML = "Salvar";
    idTutorSelecionado = null;
}

//verifica se o id esta presente, se sim o tutor é atualizado, se não um novo tutor é gerado
function escolheFuncao() {
    if (!idTutorSelecionado) cadastraTutor();
    else editaCadastroTutor();
}
//escreve os parametros do tutor conforme identificado dentro da td adotaPet
function escreveLinhaTutor(tutor) {
    const tutorAtualizado = encodeURIComponent(JSON.stringify(tutor));
    return `
    <tr id="row-${tutor.cpf}">
        <td>${tutor.cpf}</td> 
        <td>${tutor.nome}</td>
        <td>${tutor.cidade}</td>
        <td>${tutor.estado}</td>
        <td>${tutor.email}</td>
        <td>${tutor.telefone}</td>
        <td class="w-25">
            <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalCadastro" onclick="carregaInformacoesParaAtualizar('${tutorAtualizado}')">Editar</button>
            <button class="btn btn-dark" onclick ="apagaCadastroTutor('${tutor.cpf}')">Apagar</button>
            <button class="btn btn-dark" onclick ="listaPetsAdotados('${tutor.cpf}')">Animais Adotados</button>
        </td>
    </tr>
    `;
}

//aqui atualiza() o formulario do cadastro ja feito do tutor(clicando em editar)
function carregaInformacoesParaAtualizar(tutorPayload) {

    document.getElementById('submitBtn').innerHTML = "Atualizar";
    const tutor = JSON.parse(decodeURIComponent(tutorPayload));
    document.getElementById('cpf').value = tutor.cpf;
    document.getElementById('nome').value = tutor.nome;
    document.getElementById('cidade').value = tutor.cidade;
    document.getElementById('estado').value = tutor.estado;
    document.getElementById('email').value = tutor.email;
    document.getElementById('telefone').value = tutor.telefone;
    idTutorSelecionado = tutor.cpf;
}

// assim que clica em "adicionar tutor" a modal abre e assim podera salvar os dados do tutor
function cadastraTutor() {
    const cpf = document.getElementById("cpf").value;
    const nome = document.getElementById("nome").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;


    const { data } = axios.post('http://localhost:8080/adote-quatropatas/tutor', { cpf, nome, cidade, estado, email, telefone });

    const user = { idTutorSelecionado, cpf, nome, cidade, estado, email, telefone };

    const appendData = escreveLinhaTutor(user);

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML += appendData;

    fechaModalCadastro();
    setTimeout("location.reload(true);", 17);
}

//aqui atualiza os dados do tutor cadastrado 
function editaCadastroTutor() {
    const nome = document.getElementById("nome").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;

    axios({
        method: 'put',
        url: 'http://localhost:8080/adote-quatropatas/tutor?cpf=' + idTutorSelecionado,
        data: { nome, cidade, estado, email, telefone }
    })

    const nomeField = document.querySelector("#row-" + idTutorSelecionado + " td:nth-child(2)");
    const cidadeField = document.querySelector("#row-" + idTutorSelecionado + " td:nth-child(3)");
    const estadoField = document.querySelector("#row-" + idTutorSelecionado + " td:nth-child(4)");
    const emailField = document.querySelector("#row-" + idTutorSelecionado + " td:nth-child(5)");
    const telefoneField = document.querySelector("#row-" + idTutorSelecionado + " td:nth-child(6)");


    const updateButtonField = document.querySelector("#row-" + idTutorSelecionado + " td:nth-child(7) button:nth-child(1)");

    const userUpdate = encodeURIComponent(JSON.stringify({ cpf: idTutorSelecionado, cpf, nome, cidade, estado, email, telefone }));

    updateButtonField.setAttribute("onclick", 'carregaInformacoesParaAtualizar("' + userUpdate + '")');

    nomeField.innerHTML = nome;
    cidadeField.innerHTML = cidade;
    estadoField.innerHTML = estado;
    emailField.innerHTML = email;
    telefoneField.innerHTML = telefone;

    fechaModalCadastro();
}


// aqui é o botao deletar o tutor
async function apagaCadastroTutor(userID) {

    await axios.delete('http://localhost:8080/adote-quatropatas/tutor?cpf=' + userID);

    const userElement = document.getElementById('row-' + userID);
    userElement.remove();
}

async function carregaListaTutores() {
    let tableBodyContent = "";

    const { data: users } = await axios.get('http://localhost:8080/adote-quatropatas/tutor');

    users.forEach(user => (tableBodyContent += escreveLinhaTutor(user)));

    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = tableBodyContent;

}

carregaListaTutores();

async function listaPetsAdotados(userID) {

    let tableBodyContent = "";

    const { data: users } = await axios.get('http://localhost:8080/adote-quatropatas/adocao?cpf=' + userID);

    users.forEach(user => (tableBodyContent += escreveLinhaCadastroPet(user)));

    const tableBody = document.getElementById("listaPets");
    tableBody.innerHTML = tableBodyContent;


}

function escreveLinhaCadastroPet(user) {
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
