var myIp = '';
var ipsSimulatedSensors = ['1.1.1.1', '2.2.2.2', '3.3.3.3', '4.4.4.4', '5.5.5.5', 
'6.6.6.6', '7.7.7.7', '8.8.8.8'];

var realValueDistanceSensor = 24; //distancia en cm desde el sensor hasta lo que haya dentro del cubo
var realValueCollisionSensor = true; //la tapa del cubo está cerrada ya que el sensor detecta colision
var limitValueDistanceSensor = 10;

var canvas = document.getElementById("canvas");
var contexto = canvas.getContext("2d");
var imagen = new Image();

imagen.src = "Mapa.PNG";

imagen.onload = function() {
    contexto.drawImage(imagen, 0, 0, imagen.width, imagen.height, 0, 0, 780, 520);
};

function randomValuesForSensor(numSensor){
    console.log("Generating random values");

    var randomDistance = Math.floor(Math.random()*20 + 15);
    var randomCollision = Math.random() <= 0.5 ? "Cubo abierto" : "Cubo cerrado";

    $('#data').html('<div>Sensor ' + (numSensor + 1) + ' con IP: ' + ipsSimulatedSensors[numSensor]+ '</div>' +
        '<div>Sensor de distancia: ' + randomDistance + ' cm</div>' +
        '<div>Sensor de colisiones: ' + randomCollision + '</div>' +
        '<input type="button" value="Encender LED" class="btn">' +
        '<input type="button" value="Apagar LED" class="btn">');
}

function valuesForRealSensor(){
    console.log("Researching real values");

    var state = 'Cubo abierto';
    if(realValueCollisionSensor){
        state = 'Cubo cerrado';
    }

    $('#data').html('<div>Sensor 9 con IP: ' + myIp + '</div>' +
        '<div>Sensor de distancia: ' + realValueDistanceSensor + ' cm</div>' +
        '<div>Sensor de colisiones: ' + state + '</div>' +
        '<input type="button" value="Encender LED" class="btn" onclick="encenderLed()">' +
        '<input type="button" value="Apagar LED" class="btn" onclick="apagarLed()">');
}

function apagarLed(){
    /* var myRequest = new XMLHttpRequest();
     var url = 'http://' + myIp + '/index?apagar';
     myRequest.open("GET", url);
     myRequest.send();*/
     console.log("apagar");
 }
 
 function encenderLed(){
     /*var myRequest = new XMLHttpRequest();
     var url = 'http://' + myIp + '/index?encender';
     myRequest.open("GET", url);
     myRequest.send();*/
     console.log("encender");
 }

 
 function obtainDataFromArduino(latitud, longitud){
    $.ajax({
     url: 'http://' + myIp + '/index?',
     type: 'post',
     dataType: 'json',
     success: function(data){
      console.log(data);
      realValueDistanceSensor = data.distancia;
      realValueCollisionSensor = data.colision;
        if(realValueDistanceSensor >= limitValueDistanceSensor){
            $('#notification').html('El sensor con ip: ' + myIp + ' detecta que el cubo está demasiado lleno.'
            + ' La distancia medida es inferior a 10 cm.');
            $('#notification').css('background', 'orangered');
        } else {
                $('#notification').html('Todos los sensores son correctos');
                $('#notification').css('background', 'greenyellow');
            }
        },
      error: function(){
        console.log("ERROR conectando con arduino");
      }
    });
    
}
  
/*
$(document).ready(function(){
    setInterval(obtainDataFromArduino(),1000);
});*/