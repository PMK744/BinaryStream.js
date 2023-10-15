# BinaryStream.js

BinaryStream.js is a simple package designed to simplify streaming of binary data in Javascript.
Development of this package is still very early, and contributions are welcomed!

## Installing

Installing using npm
```npm install binarystream.js```

Installing using yarn
```yarn add binarystream.js```

Installing using bun
```bun add binarystream.js```

## Usage
```ts
import { BinaryStream } from 'binarystream.js'

const stream = new BinaryStream()
stream.writeUInt8(255)
stream.writeString('Hello World!')

stream.readUInt8() // 255
stream.readString() // Hello World!
```