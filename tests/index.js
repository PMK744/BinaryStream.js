const { BinaryStream } = require('../dist/BinaryStream.js')

const stream = new BinaryStream()

const value = 1234567890

stream.writeInt64(value)

console.log(stream.readInt64()) // 1234567890