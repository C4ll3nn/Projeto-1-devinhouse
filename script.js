//ligação com os elementos do HTML
var entrada = document.querySelector('#entrada');
var inputAtividade = document.getElementById("inputAtividade");
var listaAtividades = document.getElementById("listaAtividades");

//armazenamento de dados no local storage
var atividadesDaLista = [];
var arrayStatus = [];

//deixa o campo de input em foco no primeiro carregamento da página
inputAtividade.focus();

//evita que o site recarregue quando ocorre o submit e executa a criação do novo item da lista
entrada.addEventListener("submit", function() {    
    adicionarAtividade(inputAtividade.value);
    salvarAtividades();
    salvarStatus(); 
});

//carrega a lista de atividades salva no local storage
carregarAtividades();

//função que adiciona um item à lista de atividades
function adicionarAtividade(inputValue) {

    //checa de o input foi preenchido e gera o novo item da lista
    if (inputValue) {
    var novaAtividade = document.createElement("li");
    novaAtividade.className = "pendente";
    
    //cria o elemento do texto do item da lista e salva no array
    var txtAtividade = document.createTextNode(inputValue);
    var spanAtividade = document.createElement("span");  
    
    novaAtividade.appendChild(spanAtividade);
    spanAtividade.appendChild(txtAtividade);
    listaAtividades.appendChild(novaAtividade);

    atividadesDaLista.push(inputValue);
    
    //cria a checkbox do item da lista
    var checkboxAtividade = document.createElement("input");
        
    checkboxAtividade.type = "checkbox";
    checkboxAtividade.name = "checkbox";
    checkboxAtividade.classList = "checkbox";
    checkboxAtividade.title = "Marcar atividade como realizada";

    novaAtividade.appendChild(checkboxAtividade);

    arrayStatus.push(novaAtividade.className);
    
    //adiciona o botão de excluir ao item da lista
    var botaoExcluir = document.createElement("button");
    var txtExcluir = document.createTextNode("Excluir");    
    
    botaoExcluir.className = "excluir";
    botaoExcluir.appendChild(txtExcluir);
    novaAtividade.appendChild(botaoExcluir);

    //"reseta" o campo de input
    inputAtividade.value = "";
    inputAtividade.focus();
    
    //notifica caso o input não tenha sido preenchido
    } else { 
        alert("Insira uma atividade!"); 
    }    
}

//função para salvar as listas no local storage
function salvarAtividades() {    
    localStorage.setItem("listaAtividades", JSON.stringify(atividadesDaLista));
}

function salvarStatus() {    
    localStorage.setItem("listaStatusAtividades", JSON.stringify(arrayStatus));
}

//função para carregar a lista do local storage
function carregarAtividades() {
    var listaSalva = JSON.parse(localStorage.getItem("listaAtividades"));
    var listaSalvaStatus = JSON.parse(localStorage.getItem("listaStatusAtividades"));

        if(listaSalva){
        for (var i = 0; i < listaSalva.length; i++) {
            adicionarAtividade(listaSalva[i]);
        }
    }
}

//toogle no botão de atividades realizadas
var checkboxToggle = document.querySelectorAll(".checkbox");

checkboxToggle.forEach(function(btn) {  
    btn.addEventListener('click', toggleStatusItem);    
})

//ativa o botão de excluir itens
var excluir = document.querySelectorAll('.excluir');

excluir.forEach(function(btn) {  
    btn.addEventListener('click', excluirItem);
})

//função para excluir item do localStorage
function excluirItem() {
    var confirmaExcluir = confirm("Realmente deseja excluir este item?");
    if (confirmaExcluir == true) {
        var li = this.parentElement.firstChild;
        var liLimpo = li.textContent;
        
        var index = atividadesDaLista.indexOf(liLimpo);
            if (index > -1) {
                atividadesDaLista.splice(index, 1);
                arrayStatus.splice(index, 1);
            }   
    }
    salvarAtividades();
    salvarStatus();
    window.location = window.location; 
}

//função para toogle do status do item no localStorage
function toggleStatusItem() {
    var status = this.parentElement;
    var liStatus = this.parentElement.firstChild;
    var liStatusLimpo = liStatus.textContent;        
    var indexStatus = atividadesDaLista.indexOf(liStatusLimpo);

    if (this.checked) {
        status.classList.add('realizada');
        status.classList.remove('pendente');
        arrayStatus.splice(indexStatus, 1, 'realizada');
    } else {
        status.classList.add('pendente');
        status.classList.remove('realizada');
        arrayStatus.splice(indexStatus, 1, 'pendente');
    }
    salvarStatus();
}

