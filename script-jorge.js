let lastTime = 0;  //cnstante que utilizaremos en la funcion de actualizacion (update) de la posicion  
let dropInterval= 1000; // esta y la siguiente es para ajustar la velocidad de actualizacion de posicion 
let dropCounter= 0;

const canvas= document.getElementById("tetris"); //espacio donde creamos nuestra animacion
const context = canvas.getContext("2d"); // nuestra animacion sera en dos dimensiones
const grid= createMatriz(10,20); //  esta llamando a la funcion create matriz. crea el grid donde trabajamos con nuestro tetrocosas, se sustuira por el grid que cree Jose 
const player= {                 // es un objeto que representa el tetrocosa y su posición  ( x e y )
    pos: {x: 0, y:0},            // posicion
    matriz:[                     // tetrocosa los 1 son los cuadrados que tienen "color", es decir la forma de la tetrocosa. ( esta es la tetrocosa T) los ceros de arriba son para tener margen a la hora de rotar la pieza, los 0 son posiciones vacias
        [0,0,0],
        [1,1,1],
        [0,1,0]
    ]
};

context.scale(20,20);           // tamaño de los divs de tetrocosas

function createMatriz(width,height){      // es la funcion que crea el grid, se suistuira por la de Jose ( los parametros son el ancho y largo)
    const matriz = [];                    // creamos un array vacio que será nuestro tablero Matriz
    while(height--){                      // recorremos desde 20 (height)hasta 0 
        matriz.push(new Array(width).fill(0));// añadimos el nuevo array que nos genera el ancho del tablero , llenandolos con 0 (cuadrados vacios)
        
    } 
    return matriz; // nos da el tablero matriz
}

function collide(grid, player){    // funcion que nos da la colision de nuestra tetrocosa con los limite del tablero matriz u otras piezas
    const matriz = player.matriz; // es la tetrocosa ( mirar linea 8 y 10)
    const offset = player.pos;    // es la posicion de la tetrocosa ( mirar linea 8 y 9)

    for(let y = 0; y<matriz.length; ++y){ // recorremos la tetrocosa en el eje Y ,nos ponemos en cada fila de la tetrocosa
        for(let x = 0; x<matriz[y].length; ++x){ // recorremos en el eje x cada fila ( bucle anidade que nos da todas las posiciones de la tetrocosa)
            if(matriz[y][x]!==0 && (grid[y + offset.y] && grid[y+ offset.y][x + offset.x])!== 0 ) { // eto comprueba si hay colision, ya que cuando matriz[y][x] sea distinto de cero significa que hay cuadrado relleno,  y la posicion que va a tener en el siguiente paso tambien es distinta de cero , significa que hay "obstaculo". 
                return true; // Hay colision
            }
        }
    }
    
    return false; // si no no hay colision y la ficha sigue avanzando (funcion drop)
}

function merge(grid, player){     //  esta funcion al desplazar el tetrocosa ocupa nuevas posiciones que cambiara los 0 por el 1 (cuando una tertocosa se queda quieta en una posicion  cambiara los 0 por 1 en el lugar que esta ocupando la pieza)
    player.matriz.forEach((row,y) => { // recorre las filas y va bajando en el eje Y de la tetrocosa
        row.forEach((value, x) => { // 
            if (value!==0){      // cuando el valor de la posicion es distinto a cero significa que esta relleno el hueco
                grid[y + player.pos.y][x + player.pos.x]= value; // si el valor es distinto a 0, es decir, hay "objeto", cambia el valor de la futura posicion de nuestro tetrocosa ( grid[y + player.pos.y][x + player.pos.x]), (codigo que ya hemos usado en la funcion anterior, offset es igual a player.pos.y o x ) al valor "value" que era distinto de cero, es decir, lo deja rellenado (1) esd ecir cuando nuesa trocosa baja.
            }
        });    
    })
}

function drawMatriz(matriz, offset){    // dbuja la tetrocosa, recorre la tetrocosa igual que en la funcion anterior, y su la posicion que encuentra dentro de la tetrocosa, esta rellena (1) la pinta de rojo, es decirl , la forma de la tetrocosa  
    matriz.forEach((row, y )=> {
        row.forEach((value,x) => {
            if(value !== 0 ){
                context.fillStyle= "red";
                context.fillRect (x + offset.x, y + offset.y , 1, 1)  // el context eran los cuadraditos que hemos creado
            }
        });
    });
}

function draw(){                            // cad avez que la tetrocosa avanza una posicion, se elimina y se crea un tablero nuev con la posicion actualizada. ( es decir, loque antes era 0 y ahora 1)
    context.fillStyle = "#000" ; // esta funcion, te pinta iniaclmente todo de negro,
    context.fillRect(0, 0, canvas.width, canvas.height); // y con los huecos 0
    drawMatriz(grid, {x:0 , y:0}); // pinta el grid
    drawMatriz(player.matriz, player.pos); // pinta la tetrocosa
}

function update(time = 0) {      // me repite todo otra vez, me pinta todo otra vz, 
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;          // Estas lineas no las entiendo muy bien. hay que preguntarle a Alex, la funcion marca la velocidad del tetrocosa
    if(dropCounter>dropInterval) {
        playerDrop();
    }
    draw();
    requestAnimationFrame (update) //El método window.requestAnimationFrame informa al navegador que quieres realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación.
}

function playerDrop(){ // esta funcion hace que cuando el tetronimo encuentre "barrera" en el suelo u otra pieza, que ya esta parada, hace que se genere el nuevo tetrocosa
    player.pos.y++; // baja una posicion a la pieza
    if (collide(grid,player)){ // si en cientra colision, en el eje Y :
        player.pos.y--;  // no deja avanzar a la pieza en el eje Y
        merge(grid, player);  // llama a Merge, para que  rellene los huecos con "1".
        playerReset(); // llama a playerReste, que genera una tetrocosa nueva
    }
    dropCounter=0; // esto de momento mo hace nada 
}

function playerMove(direction){     //Esta funcion permite movel el tetrocosa a la izquierda y a la derecha. el 
    player.pos.x+= direction;    // la direccion será uno o menos uno según lo que se indique en el .addEventeListener ( x+1 o x-1)
    if (collide(grid,player)){ // si encuentra colision por los laterales ( eje x) me devuelve a la posicion anterior, es decir no deja salirse del borde del grid
        player.pos.x-= direction;
    }
}

function playerReset(){ // reinicia las posiciones iniciales de x e y  ( nuevo tetrodromo)
    player.pos.y = 0;
    player.pos.x= 0;
}

document.addEventListener("keydown", event => { // Llama a las funciones cuando se aprietal las teclas 
    if(event.keyCode===40){ // en la pagina https://keycode.info/  te dice el codigo que pertenece a cada tecla, la flecha hacia abajo es la  40
    playerDrop();
    } else if (event.keyCode===37){ // izquierda
        playerMove(-1);
    }else if (event.keyCode===39){ // derecha
        playerMove(1);
    }
})

update(); // actualizacion en cada movimiento