/**
 * Created by carlos on 24/08/15.
 */

var app = angular.module('tic-tac-toe',[]);

app.controller('TicCtrl', [function () {

    var board = this;
    board.posiciones = ['', '', '', '', '', '', '', '', ''];
    board.posDisponible = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    board.victoria = [false, false, false, false, false, false, false, false, false];

    // configBoard
    board.player = '';
    board.cpu = '';
    board.players = {HUMAN:1 , CPU: 2};
    board.visible = false;
    board.playerSelector = true;

    board.computer = function () {
        var index = game.tramposo[Math.floor((Math.random() * 5) + 0)];
        board.marcar(board.players.CPU,index);
        board.posiciones[index]= board.cpu;
    };

    board.reset = function () {
            game.estado = 0;
            board.posDisponible = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            board.posiciones = ['', '', '', '', '', '', '', '', ''];
            board.victoria = [false, false, false, false, false, false, false, false, false];
            board.computer();
    };

    board.disponible = function (pos) {
        return (board.posDisponible[pos] == 0);
    };


    board.pcWin = function (player) {

            if (board.posDisponible[0] == player && board.posDisponible[1] == player && board.posDisponible[2] == player) {
                board.victoria[0] = true;
                board.victoria[1] = true;
                board.victoria[2] = true;
            }
            if (board.posDisponible[3] == player && board.posDisponible[4] == player && board.posDisponible[5] == player) {
                board.victoria[3] = true;
                board.victoria[4] = true;
                board.victoria[5] = true;
            }
            if (board.posDisponible[6] == player && board.posDisponible[7] == player && board.posDisponible[8] == player) {
                board.victoria[6] = true;
                board.victoria[7] = true;
                board.victoria[8] = true;
            }
            if (board.posDisponible[0] == player && board.posDisponible[3] == player && board.posDisponible[6] == player) {
                board.victoria[0] = true;
                board.victoria[3] = true;
                board.victoria[6] = true;
            }
            if (board.posDisponible[1] == player && board.posDisponible[4] == player && board.posDisponible[7] == player) {
                board.victoria[1] = true;
                board.victoria[4] = true;
                board.victoria[7] = true;
            }
            if (board.posDisponible[2] == player && board.posDisponible[5] == player && board.posDisponible[8] == player) {
                board.victoria[2] = true;
                board.victoria[5] = true;
                board.victoria[8] = true;
            }
            if (board.posDisponible[0] == player && board.posDisponible[4] == player && board.posDisponible[8] == player) {
                board.victoria[0] = true;
                board.victoria[4] = true;
                board.victoria[8] = true;
            }
            if (board.posDisponible[2] == player && board.posDisponible[4] == player && board.posDisponible[6] == player) {
                board.victoria[0] = true;
                board.victoria[4] = true;
                board.victoria[6] = true;
            }

    };
    board.esGanador = function (player) {
        if (board.posDisponible[0] == player && board.posDisponible[1] == player && board.posDisponible[2] == player) {
            return true;
        }
        if (board.posDisponible[3] == player && board.posDisponible[4] == player && board.posDisponible[5] == player) {
            return true;
        }
        if (board.posDisponible[6] == player && board.posDisponible[7] == player && board.posDisponible[8] == player) {
            return true;
        }
        if (board.posDisponible[0] == player && board.posDisponible[3] == player && board.posDisponible[6] == player) {
            return true;
        }
        if (board.posDisponible[1] == player && board.posDisponible[4] == player && board.posDisponible[7] == player) {
            return true;
        }
        if (board.posDisponible[2] == player && board.posDisponible[5] == player && board.posDisponible[8] == player) {
            return true;
        }
        if (board.posDisponible[0] == player && board.posDisponible[4] == player && board.posDisponible[8] == player) {
            return true;
        }
        if (board.posDisponible[2] == player && board.posDisponible[4] == player && board.posDisponible[6] == player) {
            return true;
        }
    };

    board.continuar = function () {
        for (var i = 0; i < 9; i++) {
            if (board.posDisponible[i] == 0)
            {
                return true;
            }
        }
        return false;
    };

    this.setPlayer = function (player) {
        if (player === 'X'){
            board.player = player;
            board.cpu = 'O';
        } else {
            board.player = player;
            board.cpu = 'X';
        }
        board.visible = true;
        board.playerSelector = false;
        board.computer();
    };

    board.marcar = function(turno, posicion){
        if(turno == 2){
            board.posiciones[posicion] = board.cpu;
        } else {
            board.posiciones[posicion] = board.player;
        }
        board.posDisponible[posicion] = turno;
    };


    this.setPos = function (pos) {
        if (board.continuar()){
            if (board.disponible(pos)){
                board.marcar(board.players.HUMAN,pos);
            }
        } else{
            console.log('game over');
        }



        console.log(board.posDisponible);
    };

    var game = this;
    game.tramposo = [0, 2, 4, 6, 8];
    board.ESTADO = { JUGANDO: 0, ESPERANDO: 1, TERMINADO:2 };

    game.movimientoAI = function () {
        var posicion = 0;
        var n = 9;
        var aux, mejor = -9999;

        for (var i = 0; i < n; i++)
        {
            if (board.disponible(i))
            {
                board.marcar(board.players.CPU,i);
                aux = this.min();
                if (aux > mejor)
                {
                    mejor = aux;
                    posicion = i;
                }
                board.marcar(0,i);
            }
        }

        board.marcar(board.players.CPU,posicion);
    };

    game.min = function(){
        if (board.esGanador(board.players.CPU)) return 1;
        if (!board.continuar()) return 0;
        var n = 9;
        var aux, mejor = 9999;

        for (var i = 0; i < n; i++)
        {
            if (board.disponible(i))
            {
                board.marcar(board.players.HUMAN,i);
                aux = this.max();
                if (aux < mejor)
                {
                    mejor = aux;
                }
                board.marcar(0,i);
            }
        }
        return mejor;
    };

    game.max=function(){
        if (board.esGanador(board.players.HUMAN)) return -1;
        if (!board.continuar()) return 0;
        var n = 9;
        var aux, mejor = -9999;

        for (var i = 0; i < n; i++)
        {
            if (board.disponible(i))
            {
                board.marcar(board.players.CPU,i);
                aux = this.min();
                if (aux > mejor)
                {
                    mejor = aux;
                }
                board.marcar(0,i);
            }
        }
        return mejor;
    };
    board.draw = function () {
        for(var i = 0; i < 9; i++){
            if (board.posDisponible[i] == 0)
            {
                board.posiciones[i] = '';
            }
            else
            {
                if(board.posDisponible[i] == 1){

                    board.posiciones[i] = board.player;
                }
                if(board.posDisponible[i] == 2){
                    board.posiciones[i] = board.cpu;
                }
            }
        }
    };
    game.estado = 0;
    game.logica = function(posicion){

        if (game.estado == board.ESTADO.JUGANDO)
        {
            if (board.disponible(posicion))
            {
                board.marcar(board.players.HUMAN,posicion);

                if (board.esGanador(board.players.HUMAN))
                {
                    game.estado = board.ESTADO.TERMINADO;
                    console.log("HUMANO GANADOR");
                }
                else if (!board.continuar())
                {
                    game.estado = board.ESTADO.TERMINADO;
                    console.log("EMPATE");
                    board.reset();
                }
                else
                {
                    game.estado=board.ESTADO.ESPERANDO;
                    game.movimientoAI();

                    if (board.esGanador(board.players.CPU))
                    {
                        game.estado = board.ESTADO.TERMINADO;
                        console.log("COMPUTADORA GANADORa");
                        board.pcWin(board.players.CPU);
                        board.reset();
                    }
                    else if (!board.continuar())
                    {
                        game.estado = board.ESTADO.TERMINADO;
                        console.log("EMPATE");
                        board.reset();
                    }
                    else
                    {
                        game.estado = board.ESTADO.JUGANDO;
                    }
                }
            }
            board.draw();
        }
        else if (game.estado==board.ESTADO.TERMINADO)
        {
            console.log('GAMEOVER');
        }

    };
}]);
