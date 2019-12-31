import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';

class Game extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
    };

    state = {
        selectedNumbers: [],
    }

    randomNumbers = Array.from({ length: this.props.randomNumberCount }).map(()=> 1 + Math.floor(40 * Math.random()))
    target = this.randomNumbers.slice(0, this.props.randomNumberCount - 2).reduce ((acc, curr) => acc + curr, 0);
    
    isNumberDisabled = (numberIndex) => {
        return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
    }

    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
            selectedNumbers: [...prevState.selectedNumbers, numberIndex ]
        })
        )
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.target}>{this.target}</Text>
                <View style={styles.randomContainer}>
                {this.randomNumbers.map((randomNumber, index) =>
                <RandomNumber key={index}
                id={index}
                number={randomNumber}
                isDisabled={this.isNumberDisabled(index)}
                onPress={this.selectNumber}
                />
                    //dont forget to shuffle the randomNumbers
                )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1,
        paddingTop: 30,
    },
    target: {
        fontSize: 40,
        backgroundColor: '#aaa',
        marginHorizontal: 50,
        textAlign: 'center',
        margin: 50,
    },
    randomContainer: {
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        flexDirection: 'row',
        flex: 1,
        margin: 40,
    },

    numbers: {
        fontSize: 35,
        backgroundColor: 'lavender',
        textAlign: 'center',
        width: 100,
        marginHorizontal: 15,
        marginVertical: 25,
    }
})

export default Game;