//ligação com os elementos do HTML
var entrada = document.querySelector('#entrada');
var inputAtividade = document.getElementById("inputAtividade");
var listaAtividades = document.getElementById("listaAtividades");
var checkbox = document.querySelector(".checkbox");

//deixa o campo de input em foco no primeiro carregamento da página
inputAtividade.focus();

//evita que o site recarregue quando ocorre o submit e executa a criação do novo item da lista
entrada.addEventListener("submit", function() {    
    adicionarAtividade(inputAtividade.value);
    salvarAtividades();   
});

//armazenamento da lista de atividades
var atividadesDaLista = [];

//carrega a lista de atividades salva no local storage
carregarAtividades();

//função que adiciona um item à lista de atividades
function adicionarAtividade(inputValue) {

    //checa de o input foi preenchido e gera o novo item da lista
    if (inputValue) {
    var novaAtividade = document.createElement("li");
    novaAtividade.className = "pendente";
    
    //cria o elemento do texto do item da lsita
    var txtAtividade = document.createTextNode(inputValue);
    var spanAtividade = document.createElement("span");  
    
    novaAtividade.appendChild(spanAtividade);
    spanAtividade.appendChild(txtAtividade);
    listaAtividades.appendChild(novaAtividade);
    
    //cria a checkbox do item da lista
    var checkboxAtividade = document.createElement("input");
        
    checkboxAtividade.type = "checkbox";
    checkboxAtividade.name = "checkbox";
    checkboxAtividade.classList = "checkbox";
    checkboxAtividade.title = "Marcar atividade como realizada";

    novaAtividade.appendChild(checkboxAtividade);
    
    //adiciona o botão de excluir ao itme da lista
    var botaoExcluir = document.createElement("button");
    var txtExcluir = document.createTextNode("Excluir");    
    
    botaoExcluir.className = "excluir";
    botaoExcluir.appendChild(txtExcluir);
    novaAtividade.appendChild(botaoExcluir);

    atividadesDaLista.push(inputValue);
    
    //"reseta" o campo de input
    inputAtividade.value = "";
    inputAtividade.focus();
    
    //notifica caso o input não tenha sido preenchido
    } else { 
        alert("Insira uma atividade!"); 
    }
    
}

//função para salvar a lista no local storage
function salvarAtividades() {    
    localStorage.setItem("listaAtividades", JSON.stringify(atividadesDaLista));
}

//função para carregar a lista do local storage
function carregarAtividades() {
    var listaSalva = JSON.parse(localStorage.getItem("listaAtividades"));

        if(listaSalva){
        for (var i = 0; i < listaSalva.length; i++) {
            adicionarAtividade(listaSalva[i]);
        }
    }
}

//permite marcar atividades como realizadas na lista
var lista = document.querySelector('ul');
lista.addEventListener('click', function(e) {
    if (e.target.tagName === 'INPUT') {
        e.target.parentElement.classList.toggle('realizada');
    }
}, false);
 
//ativa o botão de excluir itens
var excluir = document.querySelectorAll('.excluir');

excluir.forEach(function(btn) {  
    btn.addEventListener('click', excluirItem);    
    salvarAtividades();
})

//função para excluir item do localStorage
function excluirItem() {
    var confirmaExcluir = confirm("Realmente deseja excluir este item?");
    if (confirmaExcluir == true) {
        var li = this.parentElement.firstChild;
        var liLimpo = li.textContent;
        
        const index = atividadesDaLista.indexOf(liLimpo);
            if (index > -1) {
                atividadesDaLista.splice(index, 1);
            }   
    }
    salvarAtividades();
    window.location = window.location;   
}

