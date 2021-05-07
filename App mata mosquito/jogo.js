var altura
var largura
var vidas=1
var tempo=10

var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '') //replace vai remover o ? capturado de location.search

if(nivel==='normal'){
	criaMosquitoTempo = 1500
}else if(nivel === 'dificil'){
	criaMosquitoTempo = 1000
}else if(nivel === 'chucknorris'){
	criaMosquitoTempo = 750
}

function ajustaTamanhoJogo(){
	altura = window.innerHeight
	largura =  window.innerWidth
	console.log(largura, altura)
}

ajustaTamanhoJogo()

var cronometro = setInterval(function(){
	
	tempo--
	if(tempo<0){
		clearInterval(cronometro)
		clearInterval(criaMosca)
		alert('VOCÊ GANHOU!!')
		window.location.href = "vitoria.html"
	}else{
		document.getElementById('cronometro').innerHTML = tempo//valor contido entre as tags
	}


}, 1000)

function posicaoRandomica(){
	//remover o mosquito anterior (caso exista)
	if(document.getElementById('mosquito')){ //verifica se existe um retorno do id mosquito, ou seja, se ele existe
		document.getElementById('mosquito').remove() //caso exista remove o elemento

		if(vidas>3){ //se 
			alert('GAME OVER!!')
			window.location.href = "fim_do_jogo.html"
			return
		}else{
			document.getElementById('v' + vidas).src="imagens/coracao_vazio.png"
			vidas++
		}
		
	}


	//Math.floor() -> arredonda pra baixo
	//Math.random() -> gera um numero aleatorio entre 0 e 1
	var posicaoX = Math.floor(Math.random() * largura) - 85
	var posicaoY = Math.floor(Math.random() * altura) - 85

	//Se posicao < 0 então posicao=0, se não mantem o valor original de posicaoXY
	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)


	//criar o elemento HTML
	//criando a imagem do mosquito de forma programática / forma dinâmica
	var mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosquito.png'
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()//o nome da classe será definido pelo retorno (string) da função
	//necessário espaço para concatenação de mais classes

	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	mosquito.onclick = function(){
		this.remove() //this faz referencia ao próprio elemento html que executa a função
	}

	document.body.appendChild(mosquito) //adiciona um filho para o body

	

}

//função para gerar o tamanho aleatório em cada criação
function tamanhoAleatorio(){
	var classe = Math.floor(Math.random()*3)
	
	switch(classe){
		case 0: 
			return 'mosquito1' 
		case 1:
			return 'mosquito2'
		case 2:
			return 'mosquito3'
	}
}

//função para gerar o lado aleatório do mosquito
function ladoAleatorio(){
	var classe = Math.floor(Math.random()*2)
	
	switch(classe){
		case 0: 
			return 'ladoA'
		case 1:
			return 'ladoB'
	}
}