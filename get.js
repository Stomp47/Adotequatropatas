 get = () => {

    const config = {
        params: {
            _limit: 2
        }
    };
    const teste = axios.get('http://localhost:8080/adote-quatropatas/pet', config)
        .then((response) => response.data.forEach(element => {
            let linha = criaLinha(element);
            tabela.appendChild(linha);

        }))
    console.log('FREZAA PQ VC MATOU O KURIRIN')

return teste;

}


function criaLinha(data) {

    linha = document.createElement("tr");
    tdNome = document.createElement("td");
    tdIdade = document.createElement("td");
    tdEspecie = document.createElement("td");
    tdPorte = document.createElement("td");
    tdGenero = document.createElement("td");
    tdPeso = document.createElement("td");
    tdCidade = document.createElement("td");
    tdEstado = document.createElement("td");
    tdDeficiencia = document.createElement("td");
    btnExcluir = document.createElement("button");
    btnEditar = document.createElement("button");

    tdNome.innerHTML = data.nome;
    tdIdade.innerHTML = data.idade;
    tdEspecie.innerHTML = data.especie;
    tdPorte.innerHTML = data.porte;
    tdGenero.innerHTML = data.genero;
    tdPeso.innerHTML = data.peso;
    tdCidade.innerHTML = data.cidade;
    tdEstado.innerHTML = data.estado;
    tdDeficiencia.innerHTML = data.deficiencia;
    btnExcluir.innerHTML =  "Excluir";
    btnEditar.innerHTML =  "editar";


    linha.appendChild(tdNome);
    linha.appendChild(tdIdade);
    linha.appendChild(tdEspecie);
    linha.appendChild(tdPorte);
    linha.appendChild(tdGenero);
    linha.appendChild(tdPeso);
    linha.appendChild(tdCidade);
    linha.appendChild(tdEstado);
    linha.appendChild(tdDeficiencia);
    linha.appendChild(btnExcluir);
    linha.appendChild(btnEditar);


    return linha;
}



 

