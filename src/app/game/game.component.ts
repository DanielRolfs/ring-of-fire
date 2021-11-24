import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimtation = false;
  currentCard: string = '';
  game: Game;

  constructor(private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this
      .firestore
      .collection('games')
      .valueChanges()
      .subscribe((game) =>{
        console.log('Game update',game)
      });
  }

  newGame() {
    this.game = new Game();
    this.firestore
     .collection('games')
     .add(this.game.toJson());
  }

  takeCard() {
    if (!this.pickCardAnimtation) {
      this.currentCard = this.game.stack.pop(); // pop gibt letzten wert aus array & entfernt es aus dem array
      this.pickCardAnimtation = true;
      

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimtation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}