import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent  implements OnInit{

  //declaration of variables
  squares:any=[];//creation of the array that would store the values for 3 columns i.e. 9 elements
  xIsNext=true;
  winner='';//blank string because their is no initial winner at refreshment of page
  counter=0;//counts the number of turns done i.e if 9 turns are done then the game would be declared a draw
  isdraw=''//would give confirmation in HTML about if the matchj is draw or not
  freshpage=true;//the game should not directly display board but a button to begin
  

  constructor(){}

  ngOnInit():void{}

  //function to begin the game i.e. a new game
  newGame(){
    this.squares=Array(9).fill(null);
    this.winner=''; //after completion of a game when start game is again pressed the values should be back to initial state
    this.isdraw='';//since there is no draw at the beginning of a new game
    this.counter=0;//since number of turns would return to initial value at the beginning of the new game
    this.freshpage=false;
  }

  //function to get players
  get Player(){
    //if true x has the turn and if false o is has the run  hence there is switching between the players according to turn
    return this.xIsNext?'X':'O'
  }

  //Function to get the index number of a box and see if there is an element already placed or not and if not then place the next element
  makeMove(idx:number){
    if(!this.squares[idx]){//works if there is no  value present at that index
    //splicing done  at the index clicked by the user first chance at beginning would be given to x since value of xIsNext is intialized as x
    this.squares.splice(idx,1,this.Player)
    this.xIsNext=!this.xIsNext;//to switch turn to next player i.e. 'o'
    this.counter++;//to count the number of moves made at each turn
    }
    this.winner=this.calculateWinner();//to check the winner after completion of 9 moves
    
    //to check and send a message if the game is a draw
    if(!this.winner && this.counter==9){
      this.isdraw='yes';
    }
  }

  //function to check conditions to declare the winner
  calculateWinner(){
    const lines=[
      //conditions for the winner
      //012-first row of tic tac toe board
      //345-second row of tic tac toe board
      //678-third row of tic tac toe board
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ]
    //iteration through each condition to find the suitable
    for(let i=0;i<lines.length;i++){
      const [a,b,c]=lines[i];
      //this.squares[a] is placed to make sure there should be a value present in the variable before comapring them with above  and below stated condtions 
      if(this.squares[a] && this.squares[a]===this.squares[b] && this.squares[a]===this.squares[c]){
        return this.squares[a];
      }
    }
    return null;//when loops completes since the loop will be working after and every  single move to analyse the conditions
  }
}
