import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

class Game extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
        onPlayAgain: PropTypes.func.isRequired,
    };

    state = {
        selectedIds: [],
        remainingSeconds: this.props.initialSeconds,
    }
    
    gameStatus = 'PLAYING';
    randomNumbers = Array.from({ length: this.props.randomNumberCount }).map(()=> 1 + Math.floor(40 * Math.random()))
    target = this.randomNumbers.slice(0, this.props.randomNumberCount - 2).reduce ((acc, curr) => acc + curr, 0);
    shuffledRandomNumbers = shuffle(this.randomNumbers);
    timerStatus = 'going';


    componentDidMount(){
        this.intervalId = setInterval(()=> {
            this.setState((prevState) => {
                return { remainingSeconds: prevState.remainingSeconds - 1 };
            },() => {
                if(this.state.remainingSeconds === 0){
                clearInterval(this.intervalId)
            }
            });
        }, 1000)
    }

    UNSAFE_componentWillUpdate(nextProps, nextState){
        if(nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0){
            this.gameStatus = this.calcGameStatus(nextState);
            if(this.gameStatus !== 'PLAYING'){
                clearInterval(this.intervalId)
            }
        }
    }

    componentWillUnmount(){
        clearInterval(this.intervalId)
    }

    isNumberDisabled = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    }

    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
            selectedIds: [...prevState.selectedIds, numberIndex ]
        })
        )
    }
    
    calcGameStatus = (nextState) => {
        const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
            return acc + this.shuffledRandomNumbers[curr]
        }, 0);
        if(nextState.remainingSeconds === 0){
            this.timerStatus = 'up';
            return 'LOST'
        }
        if(sumSelected < this.target){
            return 'PLAYING'
        }
        if(sumSelected === this.target){
            return 'WON'
        }
        if(sumSelected > this.target){
            return 'LOST'
        }
    }

    render(){
        const gameStatus = this.gameStatus;
        return(
            <View style={styles.container}>
                <Text style={styles.instructions}>Choose the numbers that add up to the target number.  Don't go over or you'll lose!</Text>
                <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
                <View style={styles.randomContainer}>
                {this.shuffledRandomNumbers.map((randomNumber, index) =>
                <RandomNumber key={index}
                id={index}
                number={randomNumber}
                isDisabled={this.isNumberDisabled(index) || gameStatus !== ('PLAYING')}
                onPress={this.selectNumber}
                />
                )}
                </View>
                <Text style={[styles.timer, styles[`TIMERIS${this.timerStatus}`]]}>Seconds Remaining: {this.state.remainingSeconds}</Text>
                {this.gameStatus !== 'PLAYING' && (
                <Button style={styles.playagain} title="Play Again" onPress={this.props.onPlayAgain}/>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    instructions: {
        fontSize: 20,
        paddingTop: 30,
        textAlign: 'center',
        flex: .25,
        flexWrap: 'wrap',
    },
    container: {
        backgroundColor: '#ddd',
        flex: 1,
        paddingTop: 30,
        paddingRight: 30,
        paddingLeft: 30,
    },
    target: {
        color: 'purple',
        fontSize: 40,
        backgroundColor: 'tan',
        marginHorizontal: 50,
        textAlign: 'center',
        margin: 50,
    },
    randomContainer: {
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginHorizontal: 40,
    },
    STATUS_PLAYING: {
        backgroundColor: '#bbb'
    },
    STATUS_WON: {
        backgroundColor: 'green'
    },
    STATUS_LOST: {
        backgroundColor: 'red'
    },
    timer: {
        fontSize: 25,
        textAlign: 'center',
        width: 300,
        marginHorizontal: 5,
        flex: 1,
        alignSelf: 'center',
    },

    TIMERISgoing: {
        color: 'purple',
    },
    TIMERISup: {
        color: 'red',
    },
    playagain: {
        marginTop: 0,
        flex: 2,
        marginBottom: 10,
    }
})

export default Game;