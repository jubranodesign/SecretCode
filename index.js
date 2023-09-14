"use strict";
class SecretCode {
    constructor() {
        this._encodedString = "";
        this._decodedString = "";
    }
    /**
     * Getter encodedString
     * @return {string }
     */
    get encodedString() {
        return this._encodedString;
    }
    /**
     * Setter encodedString
     * @param {string } value
     */
    set encodedString(value) {
        this._encodedString = value;
    }
    /**
     * Getter decodedString
     * @return {string }
     */
    get decodedString() {
        return this._decodedString;
    }
    /**
     * Setter decodedString
     * @param {string } value
     */
    set decodedString(value) {
        this._decodedString = value;
    }
}
class MorseCode extends SecretCode {
    /**
     * Getter arrAlphabet
     * @return {string[] }
     */
    static get arrAlphabet() {
        return MorseCode._arrAlphabet;
    }
    /**
     * Getter arrMorse
     * @return {string[] }
     */
    static get arrMorse() {
        return MorseCode._arrMorse;
    }
    mapToMorseCode(s) {
        let str = "";
        for (let i = 0; i < s.length; i++) {
            if (s[i] !== " ") {
                let position = s.charCodeAt(i) - 97;
                str += MorseCode.arrMorse[position] + " ";
            }
            else {
                str = str + "  ";
            }
        }
        return str;
    }
    mapToAlphabet(s) {
        let str = "";
        let counterWord = 0;
        let counterSpace = 0;
        let position = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] === " ") {
                counterSpace++;
                if (counterSpace === 1) {
                    position = this.decodedString.charCodeAt(counterWord++) - 97;
                    str += MorseCode.arrAlphabet[position];
                }
                if (counterSpace === 2) {
                    counterWord++;
                    str += " ";
                }
            }
            else {
                counterSpace = 0;
            }
        }
        return str;
    }
    encode(s) {
        this.encodedString = this.mapToMorseCode(s.toLowerCase());
        this.decodedString = s.toLowerCase();
    }
    ;
    decode(s) {
        this.decodedString = this.mapToAlphabet(s);
        this.encodedString = s;
    }
    ;
}
MorseCode._arrAlphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z"];
MorseCode._arrMorse = [".-", "-...", "-.-.", "-..",
    ".", "..-.", "--.", "....",
    "..", ".---", "-.-", ".-..",
    "--", "-.", "---", ".--.",
    "--.-", ".-.", "...", "-",
    "..-", "...-", ".--", "-..-", "-.--", "--.."];
class ReverseCode extends SecretCode {
    reverse(s) {
        return s.split("").reverse().join("");
    }
    encode(s) {
        this.encodedString = this.reverse(s);
        this.decodedString = s;
    }
    ;
    decode(s) {
        this.decodedString = this.reverse(s);
        this.encodedString = s;
    }
    ;
}
class RotCode extends SecretCode {
    mapCharToRot13Representation(c) {
        let position;
        //'a' = 97     'z'=122
        if ((97 <= c.charCodeAt(0)) && (c.charCodeAt(0) <= 122)) {
            position = c.charCodeAt(0) - 97;
            //the mapping is circular over the Alpha-Bet 26 letters
            position = (position + 13) % 26;
            c = String.fromCharCode(position + 97);
        }
        // 'A' = 65 'Z'=90
        else if ((65 <= c.charCodeAt(0)) && (c.charCodeAt(0) <= 90)) {
            position = c.charCodeAt(0) - 65;
            position = (position + 13) % 26;
            c = String.fromCharCode(position + 65);
        }
        return c;
    }
    rotate(s) {
        let str = "";
        for (let i = 0; i < s.length; i++) {
            str = str + this.mapCharToRot13Representation(s.charAt(i));
        }
        return str;
    }
    encode(s) {
        this.encodedString = this.rotate(s);
        this.decodedString = s;
    }
    decode(s) {
        this.decodedString = this.rotate(s);
        this.encodedString = s;
    }
    ;
}
function testSecretCodes() {
    // creating an array (named "secretCodeArr") of 3 SecretCode objects, 
    //   and creating 3 objects and inserting them into the array 
    let secretCodeArr = [new MorseCode(), new RotCode(), new ReverseCode()];
    for (let curr of secretCodeArr) {
        // calling the method "encode" on the object
        curr.encode("Hello World");
    }
    for (let curr of secretCodeArr) {
        console.log("encoded " + curr.encodedString);
    }
    for (let curr of secretCodeArr) {
        let tempSt = curr.encodedString;
        curr.decode(tempSt);
        console.log("decoded " + curr.decodedString);
    }
    for (let curr of secretCodeArr) {
        let tempSt = curr.decodedString;
        curr.encode(tempSt);
        console.log("encoded " + curr.encodedString);
    }
    for (let curr of secretCodeArr) {
        let tempSt = curr.encodedString;
        curr.decode(tempSt);
        console.log("decoded " + curr.decodedString);
    }
}
testSecretCodes();
