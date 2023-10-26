const { BinaryStream } = require('../dist/BinaryStream.js')

const stream = new BinaryStream()

const value = 1234567890

stream.writeUInt16(65378)

console.log(stream.readInt16())