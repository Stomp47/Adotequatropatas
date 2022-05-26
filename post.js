    const post = (body) => {
        const data = {
            nome: body.nome,
            idade: body.idade,
            especie: body.especie,
            genero: body.genero,
            porte: body.porte,
            peso: body.peso,
            cidade: body.cidade,
            estado: body.estado,
            deficiencia: body.deficiencia
          };
    
        axios.post('http://localhost:8080/adote-quatropatas/pet', data)
        
        console.log('socorro Deus')
    }


function main() {
    event.preventDefault();
    
    let nome = document.getElementById("nome").value
    let idade = document.getElementById("idade").value
    let especie = document.getElementById("especie").value
    let genero = document.getElementById("genero").value
    let porte = document.getElementById("porte").value
    let peso = document.getElementById("peso").value
    let cidade = document.getElementById("cidade").value
    let estado = document.getElementById("estado").value
    let deficiencia = document.getElementById("deficiencia").value
    console.log(nome)
    console.log(idade)
    console.log(especie)
    console.log(genero)
    console.log(porte)
    console.log(peso)
    console.log(estado)
    console.log(cidade)
    console.log(deficiencia)

    body = {
        "nome": nome,
        "idade": idade,
        "especie": especie,
        "genero": genero,
        "porte": porte,
        "peso": peso,
        "estado": estado,
        "cidade": cidade,
        "deficiencia": deficiencia
    }

    post(body)
}