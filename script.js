var botaoNovoContato = document.getElementById('botaoNovoContato');
var formContato = document.getElementById('formContato');
var campoNome = document.getElementById('nomeContato');
var campoTelefone = document.getElementById('telefoneContato');
var campoEmail = document.getElementById('emailContato');
var mensagemErro = document.getElementById('mensagemErro');
var botaoCancelar = document.getElementById('buttonCancelar');
var botaoSalvar = document.getElementById('buttonSalvar');
var novoContato = document.getElementById('novoContato');
var tabelaContatos = document.getElementById('tabelaContatos');
var listaContatos = [];

botaoNovoContato.addEventListener('click', function () {
    novoContato.classList.remove('d-none');
})
botaoCancelar.addEventListener('click', limparArea)

function limparArea(){
    novoContato.classList.add('d-none');
    mensagemErro.classList.add('d-none');
    campoNome.classList.remove('is-invalid');
    campoTelefone.classList.remove('is-invalid');
    campoEmail.classList.remove('is-invalid');
    campoTelefone.value = '';
    campoNome.value = '';
    campoEmail.value = '';
    mensagemErro.innerHTML = '';
}
function testeDados(nome, telefone, email) {
    var validacaoOk = true;
    var erro = '';
    if (nome.trim().length === 0) {
        mensagemErro.classList.remove('d-none');
        campoNome.classList.add('is-invalid');
        validacaoOk = false;
        erro = "Digite o <b>Nome</b> corretamente<br>";
    } else {
        mensagemErro.classList.add('d-none');
        campoNome.classList.remove('is-invalid');
        validacaoOk;
    };
    if (telefone == ' ' || telefone.length < 11) {
        mensagemErro.classList.remove('d-none');
        erro += 'Digite o <b>Telefone</b> corretamente<br>';
        campoTelefone.classList.add('is-invalid');
        validacaoOk = false;
    } else {
        mensagemErro.classList.add('d-none');
        campoTelefone.classList.remove('is-invalid');
        validacaoOk;
    };
    if (email.trim().length === 0) {
        mensagemErro.classList.remove('d-none');
        erro += " Digite o <b>Email</b> corretamente"
        campoEmail.classList.add('is-invalid');
    } else {
        mensagemErro.classList.add('d-none');
        campoEmail.classList.remove('is-invalid');
        validacaoOk;
    };

    if (!validacaoOk) {
        mensagemErro.innerHTML = erro;
    };

    return validacaoOk;
};

formContato.addEventListener('submit', salvarContato);

function salvarContato(e) {
    e.preventDefault();
    var nome = campoNome.value;
    var telefone = campoTelefone.value;
    var email = campoEmail.value;
    if (testeDados(nome, telefone, email)) {
        listaContatos.push({
            nome: nome,
            telefone: telefone,
            email: email,
        });
        atualizarListaDeContatos();
        limparArea();
    } else {
        console.log('dados Invalidos')
    }
};

function atualizarListaDeContatos() {
    if (listaContatos.length === 0) {
        tabelaContatos.innerHTML = '<tr><td colspan="4">Nenhum Contato</td></tr>';
    }
    tabelaContatos.innerHTML = '';
    for (var i = 0; i < listaContatos.length; i++) {
        var objeto = listaContatos[i];
        var linha = document.createElement('tr');
        var celulaNome = document.createElement('td');
        var celulaTelefone = document.createElement('td');
        var celulaEmail = document.createElement('td');
        var celulaAcoes = document.createElement('td');
        var botaoExcluir = document.createElement('button');
        var botaoEditar = document.createElement('button');
        botaoEditar.innerText = "Editar";
        botaoEditar.classList.add('btn');
        botaoEditar.classList.add('btn-success');
        botaoEditar.classList.add('btn-sm');
        botaoExcluir.innerText = "Remover";
        botaoExcluir.classList.add('btn');
        botaoExcluir.classList.add('btn-danger');
        botaoExcluir.classList.add('btn-sm');
        celulaNome.innerText = objeto.nome;
        celulaTelefone.innerText = objeto.telefone;
        celulaEmail.innerText = objeto.email;
        linha.appendChild(celulaNome);
        linha.appendChild(celulaTelefone);
        linha.appendChild(celulaEmail);
        linha.appendChild(celulaAcoes);
        celulaAcoes.appendChild(botaoExcluir);
        celulaAcoes.appendChild(botaoEditar);
        tabelaContatos.appendChild(linha);

        botaoExcluir.addEventListener('click', function (e) {
            var posicao = e.target.getAttribute('nome-telefone-email');
            listaContatos.splice(posicao, 1);
            atualizarListaDeContatos();
            limparArea();
        });

        botaoEditar.addEventListener('click', function(e){
            console.log(e);
        } )
    }
}


window.addEventListener('load', atualizarListaDeContatos);
