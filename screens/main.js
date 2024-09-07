import {
    StyleSheet, 
    Button,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from "react-native";
import { useState, useEffect } from "react";
import GuessTouchable from "../Components/GuessTouchable";
import * as Speech from "expo-speech"
import Slider from '@react-native-community/slider';

DEFAULT_NUMBERS = [1, 2, 3];
DEFAULT_BUTTON_STATES = [0,0,0];
DEFAULT_NUMBER_RANGE = 3;
SLIDER_MAX_RANGE = 50;

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

        for (var i=0; i<currNumberRange; i++) {
            renderButtons.push(
                <GuessTouchable 
                    onPress={speak}
                    buttonID={i}
                    getStyle={_getTouchableColor}
                    number={numbers[i]}
                    key={i}
                />
            );
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
                    maximumValue={SLIDER_MAX_RANGE}
                    step={1}
                    onSlidingComplete={generateNumberRange}
                    value={DEFAULT_NUMBER_RANGE}
                    minimumTrackTintColor="black"
                    maximumTrackTintColor="black"
                />
            </View>
            <View style={{top: 90}}>
            <ScrollView style={styles.choiceContainer} contentContainerStyle={styles.choiceContainerContent} >
                {_buttonRender()}
            </ScrollView>
            </View>
            
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
        alignSelf: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        width: '95%',
        height: '83%'
    },
    choiceContainerContent: {
        justifyContent: "center",
        alignSelf: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        width: '95%',
        height: '83%',
        flex: 1,
        ///backgroundColor: "red",
    },
    navContainer: {
        justifyContent: "center",
        alignItems: "center",
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
    text: {
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 40,
        lineHeight: 50,
        fontWeight: 'bold',
    },
    guessTouchableNormal: {
        //flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 70,
        width: 70,
        borderRadius: 20,
        backgroundColor: "black",
        margin: 15,
    },
    guessTouchableGreen: {
        alignItems: "center",
        justifyContent: "center",
        height: 70,
        width: 70,
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
    slider: {
        width: 200, 
        height: 40,
        alignSelf: "center",
        flex: 1
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