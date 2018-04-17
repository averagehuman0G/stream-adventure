//COMBINE ALL TEXT INTO ONE BUFFER
const { Writable } = require('stream');

class BufferUntilDone extends Writable {
    constructor(options, cb) {
        super(options);
        this.bufferedData = '';
        this.cb = cb;
      }
    
      _write(chunk, encoding, callback) {
        this.bufferedData += chunk.toString();
        callback(null);
      }

      _final(callback) {
          const reversedData = this.bufferedData.split("").reverse().join("");
          this.cb(Buffer.from(reversedData));
          callback();
      }
}

const bufferUntilDone = new BufferUntilDone(null, buffer => {
    const str = buffer.toString();
    console.log(str);
});

process.stdin.pipe(bufferUntilDone);