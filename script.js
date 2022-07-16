const abrirModal = () => novoCliente.classList.remove('d-none');
const fecharModal = () => novoCliente.classList.add('d-none');
const getLocalStorage = () => JSON.parse(localStorage.getItem('bdCliente')) ?? [];
const setLocalStorage = (bdCliente) => localStorage.setItem('bdCliente', JSON.stringify(bdCliente));
const criarCliente = (cliente) => {
    const bdCliente = getLocalStorage();
    bdCliente.push(cliente);
    setLocalStorage(bdCliente);
}
const deletarCliente = (index) => {
    const bdCliente = getLocalStorage();
    bdCliente.splice(index, 1);
    setLocalStorage(bdCliente);
}
const atualizarCliente = (index, cliente) => {
    const bdCliente = getLocalStorage();
    bdCliente[index] = cliente;
    setLocalStorage(bdCliente);
}
const validacaoCampos = () => {
    return document.getElementById('formularioCliente').reportValidity();
}
const limparCampos = () => {
    const campos = document.getElementById('formularioCliente');
    campos.forEach(campos => campos.value = '');
    document.getElementById('campoNome').dataset.index = 'new';
}
const salvarCliente = () => {
    if (validacaoCampos()) {
        const cliente = {
            nome: document.getElementById('campoNome').value,
            celular: document.getElementById('campoCelular').value,
            email: document.getElementById('campoEmail').value
        }
        const index = document.getElementById('campoNome').dataset.index;
        if (index == 'new') {
            criarCliente(cliente);
            atualizarTabela();
            fecharModal();
        } else {
            atualizarCliente(index, cliente);
            atualizarTabela();
            fecharModal();
        }
    }
}
const criarSala = (cliente, index) => {
    const novaSala = document.createElement('tr');
    novaSala.innerHTML = `
    <td>${cliente.nome}</td>
    <td>${cliente.email}</td>
    <td>${cliente.celular}</td>
    <td>
    <button type="button" class="btn btn-success btn-sm" id="edit-${index}">Editar</button>
    <button type="button" class="btn btn-danger btn-sm" id="delete-${index}" >Excluir</button>
    </td>
    `
    document.getElementById('tabelaCliente').appendChild(novaSala);
}
const limparTabela = () => {
    const sala = document.querySelectorAll('table>tbody tr')
    sala.forEach(sala => sala.parentNode.removeChild(sala));
}
const atualizarTabela = () => {
    const bdCliente = getLocalStorage();
    limparTabela();
    bdCliente.forEach(criarSala);
}
const preencherCampos = (cliente) => {
    document.getElementById('campoNome').value = cliente.nome;
    document.getElementById('campoCelular').value = cliente.celular;
    document.getElementById('campoEmail').value = cliente.email;
    document.getElementById('campoNome').dataset.index = cliente.index; 
}
const editarCliente = (index) => {
    const cliente = getLocalStorage()[index];
    cliente.index = index;
    preencherCampos(cliente);
    abrirModal();
}
const editarDeletar = (event) => {
    if(event.target.type == 'button'){
        const [action, index] = event.target.id.split('-');
        if(action == 'edit'){
            editarCliente(index);
        } else {
            const cliente = getLocalStorage()[index];
            const reposta = confirm(`Deseja Realmente excluir o cliente ${cliente.nome} ?`);
            if(reposta){
                deletarCliente(index);
                atualizarTabela();
            }
        }
    }
}
atualizarTabela();
document.getElementById('botaoSalvar').addEventListener('click', salvarCliente);
document.getElementById('botaoNovoCliente').addEventListener('click', abrirModal);
document.getElementById('botaoCancelar').addEventListener('click', fecharModal);
document.getElementById('tabelaCliente').addEventListener('click', editarDeletar);
