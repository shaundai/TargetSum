import React from 'react';
import Game from './Game';

class App extends React.Component{
  state = {
    gameId: 1,
  }

  resetGame = () => {
    this.setState((prevState) => {
      return {
        gameId: prevState.gameId + 1
      }
    })
  }
// adding a key to this App component is an easy trick for remounting and starting new game
  render(){
    return (
      <Game key={this.state.gameId}
      onPlayAgain={this.resetGame}
      randomNumberCount={6}
      initialSeconds={10} />
    );
  }
}

export default App;
