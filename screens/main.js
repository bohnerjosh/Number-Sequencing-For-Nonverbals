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

DEFAULT_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
DEFAULT_BUTTON_STATES = [0,0,0,0,0,0,0,0,0,0]

const Main = () => {

    const [numbers, setNumbers] = useState([...DEFAULT_NUMBERS]);
    const [choiceButtonStates, setChoiceButtonStates] = useState(DEFAULT_BUTTON_STATES);

    const shuffle = () => {
        array = [...DEFAULT_NUMBERS];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        setNumbers(array);
    }

    useEffect(() => {
        shuffle();
    }, [])
    
    const reset = () => {
        setChoiceButtonStates([...DEFAULT_BUTTON_STATES]);
        shuffle();
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

    return (
        <View style={styles.container}>
            <View style={styles.counterView}>
                <Text style={styles.progressCounter}>Count to ten!</Text>
            </View>
            <View style={styles.choiceContainer}>
                <GuessTouchable 
                    onPress={speak}
                    buttonID={0}
                    getStyle={_getTouchableColor}
                    number={numbers[0]}
                />
                <GuessTouchable 
                    onPress={speak}
                    buttonID={1}
                    getStyle={_getTouchableColor}
                    number={numbers[1]}
                />
                <GuessTouchable 
                    onPress={speak}
                    buttonID={2}
                    getStyle={_getTouchableColor}
                    number={numbers[2]}
                />
            </View>
            <View style={styles.choiceContainer}>
                <GuessTouchable 
                    onPress={speak}
                    buttonID={3}
                    getStyle={_getTouchableColor}
                    number={numbers[3]}
                />
                <GuessTouchable 
                    onPress={speak}
                    buttonID={4}
                    getStyle={_getTouchableColor}
                    number={numbers[4]}
                />
                <GuessTouchable 
                    onPress={speak}
                    buttonID={5}
                    getStyle={_getTouchableColor}
                    number={numbers[5]}
                />
            </View>
            <View style={styles.choiceContainer}>
                <GuessTouchable 
                    onPress={speak}
                    buttonID={6}
                    getStyle={_getTouchableColor}
                    number={numbers[6]}
                />
                <GuessTouchable 
                    onPress={speak}
                    buttonID={7}
                    getStyle={_getTouchableColor}
                    number={numbers[7]}
                />
                <GuessTouchable 
                    onPress={speak}
                    buttonID={8}
                    getStyle={_getTouchableColor}
                    number={numbers[8]}
                />
            </View>
            <View style={styles.choiceContainer}>
                <GuessTouchable 
                    onPress={speak}
                    buttonID={9}
                    getStyle={_getTouchableColor}
                    number={numbers[9]}
                />
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
    
})

export default Main;