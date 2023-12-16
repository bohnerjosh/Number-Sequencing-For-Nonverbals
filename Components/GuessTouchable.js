import React, { Component, useState, useEffect } from 'react';
import {
    StyleSheet, 
    Button,
    Text,
    View,
    TouchableOpacity,
} from "react-native";

const GuessTouchable = ({onPress, getStyle, number, buttonID}) => {

    return (
        <TouchableOpacity 
            style={getStyle(number-1)}
            onPress={() => onPress(number)}
        >
            <Text style={styles.opacityText}>{number}</Text>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    opacityText: {
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 32,
        lineHeight: 40,
        fontWeight: 'bold',
    }
})

export default GuessTouchable;