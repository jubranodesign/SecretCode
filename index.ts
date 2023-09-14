
abstract class SecretCode {
    private _encodedString: string = "";
    private _decodedString: string = "";

    /**
     * Getter encodedString
     * @return {string }
     */
    public get encodedString(): string {
        return this._encodedString;
    }

    /**
     * Setter encodedString
     * @param {string } value
     */
    protected set encodedString(value: string) {
        this._encodedString = value;
    }

    /**
     * Getter decodedString
     * @return {string }
     */
    public get decodedString(): string {
        return this._decodedString;
    }

    /**
     * Setter decodedString
     * @param {string } value
     */
    protected set decodedString(value: string) {
        this._decodedString = value;
    }

    public abstract encode(s: string): void;
    public abstract decode(s: string): void;
}

class MorseCode extends SecretCode {
    private static readonly _arrAlphabet: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z"];
    private static readonly _arrMorse: string[] = [".-", "-...", "-.-.", "-..",
        ".", "..-.", "--.", "....",
        "..", ".---", "-.-", ".-..",
        "--", "-.", "---", ".--.",
        "--.-", ".-.", "...", "-",
        "..-", "...-", ".--", "-..-", "-.--", "--.."];

    /**
     * Getter arrAlphabet
     * @return {string[] }
     */
    protected static get arrAlphabet(): string[] {
        return MorseCode._arrAlphabet;
    }

    /**
     * Getter arrMorse
     * @return {string[] }
     */
    protected static get arrMorse(): string[] {
        return MorseCode._arrMorse;
    }

    private mapToMorseCode(s: string): string {
        let str: string = "";

        for (let i = 0; i < s.length; i++) {
            if (s[i] !== " ") {
                let position = s.charCodeAt(i) - 97;
                str += MorseCode.arrMorse[position] + " ";
            } else {
                str = str + "  ";
            }
        }
        return str;
    }

    private mapToAlphabet(s: string): string {
        let str: string = "";
        let counterWord: number = 0;
        let counterSpace: number = 0;
        let position: number = 0;

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

            } else {
                counterSpace = 0;
            }
        }

        return str;
    }

    public encode(s: string): void {
        this.encodedString = this.mapToMorseCode(s.toLowerCase());
        this.decodedString = s.toLowerCase();
    };

    public decode(s: string): void {
        this.decodedString = this.mapToAlphabet(s);
        this.encodedString = s;
    };

}

class ReverseCode extends SecretCode {

    private reverse(s: string): string {
        return s.split("").reverse().join("");
    }

    public encode(s: string): void {
        this.encodedString = this.reverse(s);
        this.decodedString = s;
    };

    public decode(s: string): void {
        this.decodedString = this.reverse(s);
        this.encodedString = s;
    };

}

class RotCode extends SecretCode {

    private mapCharToRot13Representation(c: string): string {
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

    private rotate(s: string): string {
        let str: string = "";

        for (let i = 0; i < s.length; i++) {
            str = str + this.mapCharToRot13Representation(s.charAt(i));
        }
        return str;
    }

    public encode(s: string) {
        this.encodedString = this.rotate(s);
        this.decodedString = s;
    }

    public decode(s: string): void {
        this.decodedString = this.rotate(s);
        this.encodedString = s;
    };
}


function testSecretCodes() {

    // creating an array (named "secretCodeArr") of 3 SecretCode objects, 
    //   and creating 3 objects and inserting them into the array 
    let secretCodeArr: SecretCode[] = [new MorseCode(), new RotCode(), new ReverseCode()];


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