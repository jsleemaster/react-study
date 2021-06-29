import React, { Component } from 'react';
import Square from './Square';
//게임 컨텐츠
class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true
    //     }
    // }

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={
                    () => this.props.onClick(i)
                }
            ></Square >
        );
    }
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
    // render() {
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //     status = 'Winner: ' + winner;
    // } else {
    //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }
    // // const status = "Next Player : " + (this.state.xIsNext ? "X" : "O");
    // return (
    //     <div>
    //         <div>
    //             <div className="status">{status}</div>
    //             <div className="board-row">
    //                 {this.renderSquare(0)}
    //                 {this.renderSquare(1)}
    //                 {this.renderSquare(2)}
    //             </div>
    //             <div className="board-row">
    //                 {this.renderSquare(3)}
    //                 {this.renderSquare(4)}
    //                 {this.renderSquare(5)}
    //             </div>
    //             <div className="board-row">
    //                 {this.renderSquare(6)}
    //                 {this.renderSquare(7)}
    //                 {this.renderSquare(8)}
    //             </div>
    //         </div>
    //     </div>
    // )
    // }
}
//우승자 정하기
function calculateWinner(squares) {
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
//Game 컴포넌트
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }
    handleClick(i) {
        // const squares = this.state.squares.slice();
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            // squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        //map 함수 이용
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />

                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

export default Game;