import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class RandomNumber extends React.Component{
    static propTypes = {
        id: PropTypes.number.isRequired,
        number: PropTypes.number.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired
    };

    handlePress = () => {
        this.props.onPress(this.props.id)
    };
    
    ///*the && part means that if isSelected is true, react will add the styles.selected as extra styling.  otherwise, it will ignore*/
    render(){
        return(
            <TouchableOpacity onPress={this.handlePress}>
            <Text style={[styles.numbers, this.props.isDisabled && styles.disabled]}>
                {this.props.number}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    numbers: {
        fontSize: 35,
        backgroundColor: 'lavender',
        textAlign: 'center',
        width: 100,
        marginHorizontal: 15,
        marginVertical: 25,
    },
    disabled: {
        opacity: 0.3,
    }
})

export default RandomNumber;
