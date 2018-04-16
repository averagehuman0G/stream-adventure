const fs = require('fs');
const stream = require('stream');
const util = require('util');

const Transform = stream.Transform;

class

class UpperCase extends Transform {
    constructor(options) {
        super(options)
    }
    _transform(chunk, enc, cb) {
        const upperCased = chunk.toString().toUpperCase();
        this.push(upperCased);
        cb();
    }
}


const toUpper = new UpperCase();


process.stdin.pipe(toUpper).pipe(process.stdout);
