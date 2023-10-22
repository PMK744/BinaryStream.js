const { BinaryStream } = require('../dist/BinaryStream.js')

const stream = new BinaryStream()

stream.writeVarInt(12345)

console.log(stream.readVarLong())