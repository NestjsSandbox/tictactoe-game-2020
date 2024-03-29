import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: 'board.component.html',
  styles: [
    `
      main {
        display: grid;
        grid-template-columns: 100px 100px 100px;
        grid-gap: 0px;
      }
      app-square {
        border: 1px gray solid;
        height: 100px;
      }
    `,
  ],
})
export class BoardComponent {
  squares: any[] = Array(9).fill(null);
  xIsNext: boolean = true;
  winner: string | null = null;

  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner(): string | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
