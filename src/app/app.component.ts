import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tick-tac-toe';

  squares: Array<'X' | 'O' | null> = Array.from({ length: 9 }, () => null);
  nextPlayer: 'X' | 'O' = 'X';
  winner: 'X' | 'O' | null = null;
  history: Array<Array<'X' | 'O' | null>> = [[...this.squares]];

  makeAMove(index: number): any {
    if(this.squares[index] || this.winner) {
      return;
    }
    this.squares[index] = this.nextPlayer;
    if (this.isWinner()) {
      this.winner = this.isWinner();
      return;
    } else {
      this.history.push([...this.squares]);
      this.nextPlayer = this.nextPlayer === 'X' ? 'O' : 'X';
    }
  }

  goToHistory(index: number) {
    this.squares = [...this.history[index]];
  }

  private isWinner(): 'X' | 'O' | null {
    const winningLines = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 5, 9],
      [3, 5, 7],
      [2, 5, 8],
      [1, 4, 7],
      [3, 6, 9]
    ];
    for (let i = 0; i < winningLines.length; i++) {
      let item = winningLines[i];
      item = item.map((element) => --element);
      if (this.squares[item[0]] && (this.squares[item[0]] === this.squares[item[1]] && this.squares[item[0]] === this.squares[item[2]])) {
        return this.squares[item[0]];
      }
    }
    return null;
  }

}
