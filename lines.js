const { Transform } = require('stream');

class UpperEven extends Transform {
    constructor(options) {
        super(options);
        this._odd = true;
        this._chunks = 0;
    }

    

    _transform(chunk, encoding, callback) {
        // WE INCREMENT THE NUMBER OF CHUNKS THAT WE HAVE RECIEVED
        this._chunks++;

        const strFromChunk = chunk.toString();

        //IF THERE IS NO NO NEW LINE WE ASSUME IT IS ONE LINE
        if(strFromChunk.indexOf('\n')  >= 0) {
            //IF IT IS ODD THEN WE RETURN IT LOWERCASED
            if(this._odd) {
                this._chunks++;
                this._odd = !this._odd;
                const lowerCased = strFromChunk.toLowerCase();
                const buffFromLowerCased = Buffer.from(lowerCased, 'utf8');

                return callback(null, buffFromLowerCased);
            }
            // IF IT IS EVEN WE RETURN THE UPPERCASED CHUNK
            this._odd = !this._odd;
            this._chunks++;
            const upperCased = strFromChunk.toUpperCase();
            const buffFromUpperCased = Buffer.from(upperCased, 'utf8');
            return callback(null, buffFromUpperCased);
        } else {
            //THERE IS MORE THAN JUST ONE LINE IN THIS CHUNK
            this._chunks++;

            const arrOfLines = strFromChunk.split('\n');
            
        
            const transformedLines = arrOfLines.map((line) => {
                if(this._odd) {
                    this._odd = !this._odd;
                    return line.toLowerCase();
                }
                this._odd = !this._odd;
                return line.toUpperCase();
            });

            const transformedStrings = transformedLines.join('\n');

            const buf = Buffer.from(transformedStrings, 'utf8');

            callback(null, buf);
        }
    }
}

const upperEven = new UpperEven();



process.stdin.pipe(upperEven).pipe(process.stdout);