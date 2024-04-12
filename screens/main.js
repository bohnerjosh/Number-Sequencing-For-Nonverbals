import {
    StyleSheet, 
    Button,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import GuessTouchable from "../Components/GuessTouchable";
import * as Speech from "expo-speech"
import Slider from '@react-native-community/slider';

DEFAULT_NUMBERS = [1, 2, 3];
DEFAULT_BUTTON_STATES = [0,0,0];
DEFAULT_NUMBER_RANGE = 3;

selectListData = [
    {key:'1', value:1},
    {key:'2', value:2},
    {key:'3', value:3},
    {key:'4', value:4},
    {key:'5', value:5},
    {key:'6', value:6},
    {key:'7', value:7},
    {key:'8', value:8},
    {key:'9', value:9},
    {key:'10', value:10},
    {key:'11', value:11},
    {key:'12', value:12},
    {key:'13', value:13},
    {key:'14', value:14},
    {key:'15', value:15}
];

const Main = () => {
    const [numbers, setNumbers] = useState([...DEFAULT_NUMBERS]);
    const [choiceButtonStates, setChoiceButtonStates] = useState(DEFAULT_BUTTON_STATES);
    const [currNumberRange, setCurrNumberRange] = useState(DEFAULT_NUMBER_RANGE);

    const generateNumberRange = (length) => {
        var newArray = [];
        var buttonStates = [];
        for(var i=1; i<=length; i++) {
            newArray.push(i);
            buttonStates.push(0);
        }
        const shuffledArray = shuffle(newArray, length)
        setNumbers(shuffledArray);
        setChoiceButtonStates(buttonStates);
        setCurrNumberRange(length);

    } 

    const shuffle = (numberArray, length) => {
        array = [...numberArray];
        for (let i = length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    const reset = () => {
        generateNumberRange(currNumberRange);
    }

    const speak = (number) => {
        const buttonIndex = number-1;
        Speech.speak(number.toString());

        if (choiceButtonStates[buttonIndex-1] == 1 || number == 1) {
            var newStates = [...choiceButtonStates];
            newStates[buttonIndex] = 1;
            setChoiceButtonStates(newStates);
        }
    }

    const _getTouchableColor = (btnID) => {
        if (choiceButtonStates[btnID] == 0) return styles.guessTouchableNormal
        else if (choiceButtonStates[btnID] == 1) return styles.guessTouchableGreen;
        else if (choiceButtonStates[btnID] == 2) return styles.guessTouchableRed;
    }

    const _buttonRender = () => {
        var renderButtons = [];
        var j=0;

        for (var i=0; i<currNumberRange/3; i++) {
            renderButtons.push(
                <View style={styles.choiceContainer} key={i}>
                    <GuessTouchable 
                        onPress={speak}
                        buttonID={j}
                        getStyle={_getTouchableColor}
                        number={numbers[j]}
                    />
                    {numbers[j+1] !== undefined &&
                        <GuessTouchable 
                            onPress={speak}
                            buttonID={j+1}
                            getStyle={_getTouchableColor}
                            number={numbers[j+1]}
                        />
                    }
                    {numbers[j+2] !== undefined &&
                        <GuessTouchable 
                            onPress={speak}
                            buttonID={j+2}
                            getStyle={_getTouchableColor}
                            number={numbers[j+2]}
                        /> 
                    }
                </View>
            );
            j += 3
        }
        return renderButtons;

    }
 
    return (
        <View style={styles.container}>
            <View style={styles.counterView}>
                <Text style={styles.optionsTitle}>Number Range</Text>
                <Text style={styles.optionsValue}>{currNumberRange}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={30}
                    step={1}
                    onSlidingComplete={generateNumberRange}
                    value={DEFAULT_NUMBER_RANGE}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                />
            </View>
            {_buttonRender()}
            <View style={styles.resetView}>
                <TouchableOpacity 
                    style={styles.resetTouchable}
                    onPress={reset}
                >
                    <Text style={styles.opacityText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    resetView: {
        position: "absolute",
        alignSelf: "center",
        bottom: 10
    },
    speakButton: {
        justifyContent: "center",
        alignSelf: "center",
        margin: 15,
    },
    counterView: {
        top: 55, 
        flex: 1,
        position: "absolute",
        alignSelf: "center",
    },
    progressCounter: {
        color: "black",
        fontSize: 40,
        fontWeight: "400"
    },
    choiceContainer: {
        justifyContent: "center",
        flexDirection: "row",
    },
    navContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    speakTouchable: {
        alignItems: "center",
        justifyContent: "center",
        height: 75,
        width: 150,
        borderRadius: 20,
        backgroundColor: "orange",
        margin: 40,
    },
    resultTouchable: {
        alignItems: "center",
        justifyContent: "center",
        height: 75,
        width: 200,
        borderRadius: 20,
        backgroundColor: "black",
        marginTop: 25,
    },
    resetTouchable: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 65,
        width: 150,
        borderRadius: 20,
        backgroundColor: "black",
        margin: 15,
    },
    dangerTouchable: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        marginTop: 10,
    },
    dangerText: {
        color: "red",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        fontWeight: 'bold',
    },
    text: {
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 40,
        lineHeight: 50,
        fontWeight: 'bold',
    },
    resultText: {
        color: "black",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 40,
        lineHeight: 50,
        fontWeight: 'bold',
    },
    guessTouchableNormal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 65,
        maxWidth: 185,
        borderRadius: 20,
        backgroundColor: "black",
        margin: 15,
    },
    guessTouchableRed: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 65,
        maxWidth: 185,
        borderRadius: 20,
        backgroundColor: "red",
        margin: 15,
    },
    guessTouchableGreen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 65,
        maxWidth: 185,
        borderRadius: 20,
        backgroundColor: "green",
        margin: 15,
    },
    opacityText: {
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 32,
        lineHeight: 40,
        fontWeight: 'bold',
    },
    opacityText: {
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 32,
        lineHeight: 40,
        fontWeight: 'bold',
    },
    slider: {
        width: 200, 
        height: 40,
        alignSelf: "center"
    },
    optionsTitle: {
        color: "black",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        lineHeight: 50,
        fontWeight: 'bold',
        textAlign: "center",
    },
    optionsValue: {
        color: "black",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
    }
    
})

export default Main;