import { Endianness } from './Endianness'

class BinaryStream {
  private readonly binary: number[]
  private readOffset: number
  private writeOffset: number

  /**
   * Constructs a new BinaryStream
   * @param buffer 
   * @param offset 
   */
  public constructor(buffer?: Buffer, offset?: number) {
    this.binary = buffer ? [...buffer] : []
    this.readOffset = offset ?? 0
    this.writeOffset = offset ?? 0
  }

  /**
   * Returns the stream
   * @returns {Buffer}
   */
  public getBuffer(): Buffer {
    return Buffer.from(this.binary)
  }

  /**
   * Gets the streams read offset
   * @returns {number}
   */
  public getReadOffset(): number {
    return this.readOffset
  }

  /**
   * Gets the streams write offset
   * @returns {number}
   */
  public getWriteOffset(): number {
    return this.writeOffset
  }

  /**
   * Sets the streams read offset
   * @param offset 
   */
  public setReadOffset(offset: number): void {
    this.readOffset = offset
  }

  /**
   * Sets the streams write offset
   * @param offset 
   */
  public setWriteOffset(offset: number): void {
    this.writeOffset = offset
  }

  /**
   * Checks if the cursor is at the end of the stream
   * @returns {boolean}
   */
  public cursorAtEnd(): boolean {
    return this.readOffset >= this.binary.length
  }

  /**
   * Checks if the cursor is at the start of the stream
   * @returns {boolean}
   */
  public cursorAtStart(): boolean {
    return this.readOffset <= 0
  }

  /**
   * Skips a number of bytes
   * @param length 
   */
  public skip(length: number): void {
    this.readOffset += length
  }

  /**
   * Reads the remaining bytes from the stream
   * @returns {Buffer}
   */
  public readRemaining(): Buffer {
    const bytes = this.binary.slice(this.readOffset)
    this.readOffset = this.binary.length
    return Buffer.from(bytes)
  }

  /**
   * Reads from the stream
   * @param length 
   * @returns {Buffer}
   */
  public read(length: number): Buffer {
    const bytes = this.binary.slice(this.readOffset, this.readOffset + length)
    this.readOffset += length
    return Buffer.from(bytes)
  }

  /**
   * Writes to the stream
   * @param buffer 
   */
  public write(buffer: Buffer): void {
    for (const byte of buffer) {
      this.binary[this.writeOffset++] = byte
    }
  }

  /**
   * Reads a unsigned byte ( 0 to 255 )
   * @returns {number}
   */
  public readByte(): number {
    return this.binary[this.readOffset++] || 0
  }

  /**
   * Writes a unsigned byte ( 0 to 255 )
   * @param value 
   */
  public writeByte(value: number, unsafe = false): void {
    this.binary[this.writeOffset++] = value
  }

  
  /**
   * Reads a boolean
   * @returns {boolean}
   */
  public readBool(): boolean {
    return Boolean(this.readByte())
  }

  /**
   * Writes a boolean
   * @param value 
   */
  public writeBool(value: boolean): void {
    this.writeByte(Number(value))
  }

  /**
   * Reads a string
   * @returns {string}
   */
  public readString(): string {
    const length = this.readUInt16()
    const buffer = this.read(length)
    return buffer.toString()
  }

  /**
   * Writes a string
   * @param value 
   */
  public writeString(value: string): void {
    this.writeUInt16(value.length)
    this.write(Buffer.from(value))
  }

  /**
   * Reads a 32 bit little endian string encoded in ASCII
   * @returns {string}
   */
  public readLittleString(): string {
    const length = this.readUInt32(Endianness.Little)
    const buffer = this.read(length)

    return buffer.toString('ascii')
  }

  /**
   * Writes a 32 bit little endian string encoded in ASCII
   * @param value 
   */
  public writeLittleString(value: string): void {
    const buffer = Buffer.from(value, 'ascii')
    this.writeUInt32(buffer.byteLength, Endianness.Little)
    this.write(buffer)
  }

  /**
   * Reads a 32 bit big endian string encoded in UTF8
   * @returns {string}
   */
  public readBigString(): string {
    const length = this.readVarInt()
    const buffer = this.read(length)

    return buffer.toString('utf8')
  }

  /**
   * Writes a 32 bit big endian string encoded in UTF8
   * @param value 
   */
  public writeBigString(value: string): void {
    const buffer = Buffer.from(value, 'utf8')
    this.writeVarInt(buffer.byteLength)
    this.write(buffer)
  }

  /**
   * Reads a 32 bit ( 4 bytes ) IEEE 754 floating point number
   * @returns {number}
   */
  public readFloat(): number {
    const buffer = this.read(4)
    return buffer.readFloatBE(0)
  }
  
  /**
   * Writes a 32 bit ( 4 bytes ) IEEE 754 floating point number
   * @param value 
   */
  public writeFloat(value: number): void {
    const buffer = Buffer.alloc(4)
    buffer.writeFloatBE(value, 0)
    this.write(buffer)
  }

  /**
   * Reads a 32 bit ( 4 bytes ) little endian IEEE 754 floating point number
   * @returns {number}
   */
  public readLF32(): number {
    const buffer = this.read(4)
    return buffer.readFloatLE(0)
  }

  /**
   * Writes a 32 bit ( 4 bytes ) little endian IEEE 754 floating point number
   * @param value 
   */
  public writeLF32(value: number): void {
    const buffer = Buffer.alloc(4)
    buffer.writeFloatLE(value, 0)
    this.write(buffer)
  }

  /**
   * Reads a UTF8 string, encoded for UUID
   * @returns {string}
   */
  public readUuid(): string {
    const buffer = this.read(16)
    const string = buffer.toString('hex')
    return `${string.slice(0, 8)}-${string.slice(8, 12)}-${string.slice(12, 16)}-${string.slice(16, 20)}-${string.slice(20)}`
  }

  /**
   * Writes a UTF8 string, encoded for UUID
   * @param value 
   */
  public writeUuid(value: string): void {
    const buffer = Buffer.from(value.replace(/-/g, ''), 'hex')
    this.write(buffer)
  }

  /**
   * Reads a signed 8 ( 1 byte ) bit integer ( -128 to 127 )
   * @returns {number}
   */
  public readInt8(): number {
    let value = this.binary[this.readOffset++] || 0

    if (value < -128 || value > 127) {
      value = value < 0 ? 256 + value : value - 256
    }

    return value
  }

  /**
   * Writes a signed 8 ( 1 byte ) bit integer ( -128 to 127 )
   * @param value 
   */
  public writeInt8(value: number): void {
    if (value < -128 || value > 127) {
      value = value < 0 ? 256 + value : value - 256
    }
    this.binary[this.writeOffset++] = value
  }

  /**
   * Reads a unsigned 8 ( 1 byte ) bit integer ( 0 to 255 )
   * @returns {number}
   */
  public readUInt8(): number {
    let value = this.binary[this.readOffset++] || 0

    if (value < 0 || value > 255) {
      value = value < 0 ? 256 + value : value - 256
    }

    return value
  }

  /**
   * Writes a unsigned 8 ( 1 byte ) bit integer ( 0 to 255 )
   * @param value 
   */
  public writeUInt8(value: number): void {
    if (value < 0 || value > 255) {
      value = value < 0 ? 256 + value : value - 256
    }
    this.binary[this.writeOffset++] = value
  }

  /**
   * Reads a 16 bit ( 2 bytes ) signed big or little endian integer ( -32768 to 32767 )
   * @returns {number}
   */
  public readInt16(endian: Endianness = Endianness.Big): number {
    let value = endian === Endianness.Big
      ? this.readByte() << 8 | this.readByte()
      : this.readByte() | this.readByte() << 8

    if (value < -32768 || value > 32767) {
      value = value < 0 ? 65536 + value : value - 65536
    }

    return value
  }

  /**
   * Writes a 16 bit ( 2 bytes ) signed big or little endian integer ( -32768 to 32767 )
   * @param value 
   */
  public writeInt16(value: number, endian: Endianness = Endianness.Big): void {
    if (value < -32768 || value > 32767) {
      value = value < 0 ? 65536 + value : value - 65536
    }
    if (endian === Endianness.Big) {
      this.writeByte(value >> 8)
      this.writeByte(value & 0xFF)
    } else {
      this.writeByte(value & 0xFF)
      this.writeByte(value >> 8)
    }
  }

  /**
   * Reads a 16 bit ( 2 bytes ) unsigned big or little endian integer ( 0 to 65535 )
   * @returns {number}
   */
  public readUInt16(endian: Endianness = Endianness.Big): number {
    let value = endian === Endianness.Big
      ? this.readByte() << 8 | this.readByte()
      : this.readByte() | this.readByte() << 8

    if (value < 0 || value > 65535) {
      value = value < 0 ? 65536 + value : value - 65536
    }

    return value
  }

  /**
   * Writes a 16 bit ( 2 bytes ) unsigned big or little endian integer ( 0 to 65535 )
   * @param value 
   */
  public writeUInt16(value: number, endian: Endianness = Endianness.Big): void {
    if (value < 0 || value > 65535) {
      value = value < 0 ? 65536 + value : value - 65536
    }
    if (endian === Endianness.Big) {
      this.writeByte(value >> 8)
      this.writeByte(value & 0xFF)
    } else {
      this.writeByte(value & 0xFF)
      this.writeByte(value >> 8)
    }
  }

  /**
  * Reads a 24 bit ( 3 bytes ) signed big or little endian integer ( -8388608 to 8388607 )
  * @returns {number}
  */
  public readInt24(endian: Endianness = Endianness.Big): number {
    let value = endian === Endianness.Big
      ? this.readByte() << 16 |
        this.readByte() << 8 |
        this.readByte()
      : this.readByte() |
        this.readByte() << 8 |
        this.readByte() << 16

    if (value < -8388608 || value > 8388607) {
      value = value < 0 ? 16777216 + value : value - 16777216
    }

    return value
  }

  /**
   * Writes a 24 bit ( 3 bytes ) signed big or little endian integer ( -8388608 to 8388607 )
   * @param value 
   */
  public writeInt24(value: number, endian: Endianness = Endianness.Big): void {
    if (value < -8388608 || value > 8388607) {
      value = value < 0 ? 16777216 + value : value - 16777216
    }
    if (endian === Endianness.Big) {
      this.writeByte(value >> 16)
      this.writeByte(value >> 8)
      this.writeByte(value)
    } else {
      this.writeByte(value)
      this.writeByte(value >> 8)
      this.writeByte(value >> 16)
    }
  }

  /**
   * Reads a 24 bit ( 3 bytes ) unsigned big or little endian integer ( 0 to 16777215 )
   * @returns {number}
   */
  public readUInt24(endian: Endianness = Endianness.Big): number {
    let value = endian === Endianness.Big
      ? this.readByte() << 16 |
        this.readByte() << 8 |
        this.readByte()
      : this.readByte() |
        this.readByte() << 8 |
        this.readByte() << 16

    if (value < 0 || value > 16777215) {
      value = value < 0 ? 16777216 + value : value - 16777216
    }

    return value
  }

  /**
   * Writes a 24 bit ( 3 bytes ) unsigned big or little endian integer ( 0 to 16777215 )
   * @param value 
   */
  public writeUInt24(value: number, endian: Endianness = Endianness.Big): void {
    if (value < 0 || value > 16777215) {
      value = value < 0 ? 16777216 + value : value - 16777216
    }
    if (endian === Endianness.Big) {
      this.writeByte(value >> 16)
      this.writeByte(value >> 8)
      this.writeByte(value)
    } else {
      this.writeByte(value)
      this.writeByte(value >> 8)
      this.writeByte(value >> 16)
    }
  }

  /**
   * Reads a 32 bit ( 4 bytes ) signed big or little endian integer ( -2147483648 to 2147483647 )
   * @returns {number}
   */
  public readInt32(endian: Endianness = Endianness.Big): number {
    let value = endian === Endianness.Big
      ? this.readByte() << 24 |
        this.readByte() << 16 |
        this.readByte() << 8 |
        this.readByte()
      : this.readByte() |
        this.readByte() << 8 |
        this.readByte() << 16 |
        this.readByte() << 24

    if (value < -2147483648 || value > 2147483647) {
      value = value < 0 ? 4294967296 + value : value - 4294967296
    }

    return value
  }

  /**
   * Writes a 32 bit ( 4 bytes ) signed big eddian integer ( -2147483648 to 2147483647 )
   * @param value 
   */
  public writeInt32(value: number, endian: Endianness = Endianness.Big): void {
    if (value < -2147483648 || value > 2147483647) {
      value = value < 0 ? 4294967296 + value : value - 4294967296
    }
    if (endian === Endianness.Big) {
      this.writeByte(value >> 24)
      this.writeByte(value >> 16)
      this.writeByte(value >> 8)
      this.writeByte(value)
    } else {
      this.writeByte(value)
      this.writeByte(value >> 8)
      this.writeByte(value >> 16)
      this.writeByte(value >> 24)
    }
  }

  /**
   * Reads a 32 bit ( 4 bytes ) unsigned big or little endian integer ( 0 to 4294967295 )
   * @returns {number}
   */
  public readUInt32(endian: Endianness = Endianness.Big): number {
    let value = endian === Endianness.Big
      ? this.readByte() << 24 |
        this.readByte() << 16 |
        this.readByte() << 8 |
        this.readByte()
      : this.readByte() |
        this.readByte() << 8 |
        this.readByte() << 16 |
        this.readByte() << 24

    if (value < 0 || value > 4294967295) {
      value = value < 0 ? 4294967296 + value : value - 4294967296
    }

    return value
  }

  /**
   * Writes a 32 bit ( 4 bytes ) unsigned big eddian integer ( 0 to 4294967295 )
   * @param value 
   */
  public writeUInt32(value: number, endian: Endianness = Endianness.Big): void {
    if (value < 0 || value > 4294967295) {
      value = value < 0 ? 4294967296 + value : value - 4294967296
    }
    if (endian === Endianness.Big) {
      this.writeByte(value >> 24)
      this.writeByte(value >> 16)
      this.writeByte(value >> 8)
      this.writeByte(value)
    } else {
      this.writeByte(value)
      this.writeByte(value >> 8)
      this.writeByte(value >> 16)
      this.writeByte(value >> 24)
    }
  }

  /**
   * Reads a 64 bit ( 8 bytes ) signed big or little endian integer ( -9223372036854775808 to 9223372036854775807 )
   * @returns {bigint}
   */
  public readInt64(endian: Endianness = Endianness.Big): bigint {
    let value = endian === Endianness.Big
      ? BigInt(this.readByte()) << 56n |
        BigInt(this.readByte()) << 48n |
        BigInt(this.readByte()) << 40n |
        BigInt(this.readByte()) << 32n |
        BigInt(this.readByte()) << 24n |
        BigInt(this.readByte()) << 16n |
        BigInt(this.readByte()) << 8n |
        BigInt(this.readByte())
      : BigInt(this.readByte()) |
        BigInt(this.readByte()) << 8n |
        BigInt(this.readByte()) << 16n |
        BigInt(this.readByte()) << 24n |
        BigInt(this.readByte()) << 32n |
        BigInt(this.readByte()) << 40n |
        BigInt(this.readByte()) << 48n |
        BigInt(this.readByte()) << 56n
    
    if (value < -9223372036854775808n || value > 9223372036854775807n) {
      value = value < 0 ? 18446744073709551616n + value : value - 18446744073709551616n
    }

    return value
  }

  /**
   * Writes a 64 bit ( 8 bytes ) signed big or little endian integer ( -9223372036854775808 to 9223372036854775807 )
   * @param value 
   */
  public writeInt64(value: bigint, endian: Endianness = Endianness.Big): void {
    if (value < -9223372036854775808n || value > 9223372036854775807n) {
      value = value < 0 ? 18446744073709551616n + value : value - 18446744073709551616n
    }
    if (endian === Endianness.Big) {
      this.writeByte(Number(value >> 56n))
      this.writeByte(Number(value >> 48n))
      this.writeByte(Number(value >> 40n))
      this.writeByte(Number(value >> 32n))
      this.writeByte(Number(value >> 24n))
      this.writeByte(Number(value >> 16n))
      this.writeByte(Number(value >> 8n))
      this.writeByte(Number(value))
    } else {
      this.writeByte(Number(value))
      this.writeByte(Number(value >> 8n))
      this.writeByte(Number(value >> 16n))
      this.writeByte(Number(value >> 24n))
      this.writeByte(Number(value >> 32n))
      this.writeByte(Number(value >> 40n))
      this.writeByte(Number(value >> 48n))
      this.writeByte(Number(value >> 56n))
    }
  }

  /**
   * Reads a 64 bit ( 8 bytes ) unsigned big or little endian integer ( 0 to 18446744073709551615 )
   * @returns {bigint}
   */
  public readUInt64(endian: Endianness = Endianness.Big): bigint {
    let value = endian === Endianness.Big
      ? BigInt(this.readByte()) << 56n |
        BigInt(this.readByte()) << 48n |
        BigInt(this.readByte()) << 40n |
        BigInt(this.readByte()) << 32n |
        BigInt(this.readByte()) << 24n |
        BigInt(this.readByte()) << 16n |
        BigInt(this.readByte()) << 8n |
        BigInt(this.readByte())
      : BigInt(this.readByte()) |
        BigInt(this.readByte()) << 8n |
        BigInt(this.readByte()) << 16n |
        BigInt(this.readByte()) << 24n |
        BigInt(this.readByte()) << 32n |
        BigInt(this.readByte()) << 40n |
        BigInt(this.readByte()) << 48n |
        BigInt(this.readByte()) << 56n

    if (value < 0n || value > 18446744073709551615n) {
      value = value < 0n ? 18446744073709551616n + value : value - 18446744073709551616n
    }

    return value
  }

  /**
   * Writes a 64 bit ( 8 bytes ) unsigned big or little endian integer ( 0 to 18446744073709551615 )
   * @param value 
   */
  public writeUInt64(value: bigint, endian: Endianness = Endianness.Big): void {
    if (value < 0n || value > 18446744073709551615n) {
      value = value < 0n ? 18446744073709551616n + value : value - 18446744073709551616n
    }
    if (endian === Endianness.Big) {
      this.writeByte(Number(value >> 56n))
      this.writeByte(Number(value >> 48n))
      this.writeByte(Number(value >> 40n))
      this.writeByte(Number(value >> 32n))
      this.writeByte(Number(value >> 24n))
      this.writeByte(Number(value >> 16n))
      this.writeByte(Number(value >> 8n))
      this.writeByte(Number(value))
    } else {
      this.writeByte(Number(value))
      this.writeByte(Number(value >> 8n))
      this.writeByte(Number(value >> 16n))
      this.writeByte(Number(value >> 24n))
      this.writeByte(Number(value >> 32n))
      this.writeByte(Number(value >> 40n))
      this.writeByte(Number(value >> 48n))
      this.writeByte(Number(value >> 56n))
    }
  }

  /**
   * Reads a 16 bit ( 2 bytes ) signed big or little endian integer ( -32768 to 32767 )
   * @returns {number}
   */
  public readShort(endian: Endianness = Endianness.Big): number {
    let value = endian === Endianness.Big
      ? this.readByte() << 8 | this.readByte()
      : this.readByte() | this.readByte() << 8

    if (value < -32768 || value > 32767) {
      value = value < 0 ? 65536 + value : value - 65536
    }

    return value
  }

  /**
   * Writes a 16 bit ( 2 bytes ) signed big or little endian integer ( -32768 to 32767 )
   * @param value 
   */
  public writeShort(value: number, endian: Endianness = Endianness.Big): void {
    if (value < -32768 || value > 32767) {
      value = value < 0 ? 65536 + value : value - 65536
    }
    if (endian === Endianness.Big) {
      this.writeByte(value >> 8)
      this.writeByte(value & 0xFF)
    } else {
      this.writeByte(value & 0xFF)
      this.writeByte(value >> 8)
    }
  }

  /**
   *  Reads a 16 bit ( 2 bytes ) unsigned big or little endian integer ( 0 to 65535 )
   * @returns {number}
   */
  public readUShort(endian: Endianness = Endianness.Big): number {
    let value = endian === Endianness.Big
      ? this.readByte() << 8 | this.readByte()
      : this.readByte() | this.readByte() << 8

    if (value < 0 || value > 65535) {
      value = value < 0 ? 65536 + value : value - 65536
    }

    return value
  }

  /**
   * Writes a 16 bit ( 2 bytes ) unsigned big or little endian integer ( 0 to 65535 )
   * @param value 
   */
  public writeUShort(value: number, endian: Endianness = Endianness.Big): void {
    if (value < 0 || value > 65535) {
      value = value < 0 ? 65536 + value : value - 65536
    }
    if (endian === Endianness.Big) {
      this.writeByte(value >> 8)
      this.writeByte(value & 0xFF)
    } else {
      this.writeByte(value & 0xFF)
      this.writeByte(value >> 8)
    }
  }

  /**
   * Reads a 64 bit ( 8 bytes ) signed big or little endian integer ( -9223372036854775808 to 9223372036854775807 )
   * @returns {bigint}
   */
  public readLong(endian: Endianness = Endianness.Big): bigint {
    let value = endian === Endianness.Big
      ? BigInt(this.readByte()) << 56n |
        BigInt(this.readByte()) << 48n |
        BigInt(this.readByte()) << 40n |
        BigInt(this.readByte()) << 32n |
        BigInt(this.readByte()) << 24n |
        BigInt(this.readByte()) << 16n |
        BigInt(this.readByte()) << 8n |
        BigInt(this.readByte())
      : BigInt(this.readByte()) |
        BigInt(this.readByte()) << 8n |
        BigInt(this.readByte()) << 16n |
        BigInt(this.readByte()) << 24n |
        BigInt(this.readByte()) << 32n |
        BigInt(this.readByte()) << 40n |
        BigInt(this.readByte()) << 48n |
        BigInt(this.readByte()) << 56n

    if (value < -9223372036854775808n || value > 9223372036854775807n) {
      value = value < 0n ? 18446744073709551616n + value : value - 18446744073709551616n
    }

    return value
  }

  /**
   * Writes a 64 bit ( 8 bytes ) signed big or little endian integer ( -9223372036854775808 to 9223372036854775807 )
   * @param value 
   */
  public writeLong(value: bigint, endian: Endianness = Endianness.Big): void {
    if (value < -9223372036854775808n || value > 9223372036854775807n) {
      value = value < 0n ? 18446744073709551616n + value : value - 18446744073709551616n
    }
    if (endian === Endianness.Big) {
      this.writeByte(Number(value >> 56n))
      this.writeByte(Number(value >> 48n))
      this.writeByte(Number(value >> 40n))
      this.writeByte(Number(value >> 32n))
      this.writeByte(Number(value >> 24n))
      this.writeByte(Number(value >> 16n))
      this.writeByte(Number(value >> 8n))
      this.writeByte(Number(value))
    } else {
      this.writeByte(Number(value))
      this.writeByte(Number(value >> 8n))
      this.writeByte(Number(value >> 16n))
      this.writeByte(Number(value >> 24n))
      this.writeByte(Number(value >> 32n))
      this.writeByte(Number(value >> 40n))
      this.writeByte(Number(value >> 48n))
      this.writeByte(Number(value >> 56n))
    }
  }

  /**
   * Reads a 64 bit ( 8 bytes ) unsigned big or little endian integer ( 0 to 18446744073709551615 )
   * @returns {bigint}
   */
  public readULong(endian: Endianness = Endianness.Big): bigint {
    let value = endian === Endianness.Big
      ? BigInt(this.readByte()) << 56n |
        BigInt(this.readByte()) << 48n |
        BigInt(this.readByte()) << 40n |
        BigInt(this.readByte()) << 32n |
        BigInt(this.readByte()) << 24n |
        BigInt(this.readByte()) << 16n |
        BigInt(this.readByte()) << 8n |
        BigInt(this.readByte())
      : BigInt(this.readByte()) |
        BigInt(this.readByte()) << 8n |
        BigInt(this.readByte()) << 16n |
        BigInt(this.readByte()) << 24n |
        BigInt(this.readByte()) << 32n |
        BigInt(this.readByte()) << 40n |
        BigInt(this.readByte()) << 48n |
        BigInt(this.readByte()) << 56n

    if (value < 0n || value > 18446744073709551615n) {
      value = value < 0n ? 18446744073709551616n + value : value - 18446744073709551616n
    }

    return value
  }

  /**
   * Writes a 64 bit ( 8 bytes ) unsigned big or little endian integer ( 0 to 18446744073709551615 )
   * @param value 
   */
  public writeULong(value: bigint, endian: Endianness = Endianness.Big): void {
    if (value < 0n || value > 18446744073709551615n) {
      value = value < 0n ? 18446744073709551616n + value : value - 18446744073709551616n
    }
    if (endian === Endianness.Big) {
      this.writeByte(Number(value >> 56n))
      this.writeByte(Number(value >> 48n))
      this.writeByte(Number(value >> 40n))
      this.writeByte(Number(value >> 32n))
      this.writeByte(Number(value >> 24n))
      this.writeByte(Number(value >> 16n))
      this.writeByte(Number(value >> 8n))
      this.writeByte(Number(value))
    } else {
      this.writeByte(Number(value))
      this.writeByte(Number(value >> 8n))
      this.writeByte(Number(value >> 16n))
      this.writeByte(Number(value >> 24n))
      this.writeByte(Number(value >> 32n))
      this.writeByte(Number(value >> 40n))
      this.writeByte(Number(value >> 48n))
      this.writeByte(Number(value >> 56n))
    }
  }

  /**
   * Reads a 32 bit ( 4 bytes ) unsigned variable length integer ( 0 to 4294967295 )
   * @returns {number}
   */
  public readVarInt(): number {
    let numRead = 0
    let result = 0

    while (true) {
      const read = this.readUInt8()
      const value = read & 0b01111111

      result |= value << (7 * numRead)

      numRead += 1

      if (numRead > 5) {
        throw Error('VarInt is too big')
      }

      if ((read & 0b10000000) === 0) {
        break
      }
    }

    return result
  }

  /**
   * Writes a 32 bit ( 4 bytes ) unsigned variable length integer ( 0 to 4294967295 )
   * @param value 
   */
  public writeVarInt(value: number): void {
    while (true) {
      if ((value & 0b01111111) === value) {
        this.writeByte(value)
        break
      } else {
        this.writeByte(value & 0b01111111 | 0b10000000)
        value >>= 7
      }
    }
  }

  /**
   * Reads a 64 bit ( 8 bytes ) unsigned variable length integer ( 0 to 18446744073709551615 )
   * @returns {bigint}
   */
  public readVarLong(): bigint {
    let numRead = 0
    let result = 0n

    while (true) {
      const read = this.readByte()
      const value = read & 0b01111111

      result |= BigInt(value) << BigInt(7 * numRead)

      numRead += 1

      if (numRead > 10) {
        throw Error('VarLong is too big')
      }

      if ((read & 0b10000000) === 0) {
        break
      }
    }

    return result
  }

  /**
   * Writes a 64 bit ( 8 bytes ) unsigned variable length integer ( 0 to 18446744073709551615 )
   * @param value 
   */
  public writeVarLong(value: bigint): void {
    while (true) {
      if ((value & 0b01111111n) === value) {
        this.writeByte(Number(value))
        break
      } else {
        this.writeByte(Number(value & 0b01111111n | 0b10000000n))
        value >>= 7n
      }
    }
  }

  /**
   * Reads a 32 bit ( 4 bytes ) zig-zag encoded variable length integer ( -2147483648 to 2147483647 )
   * @returns {number}
   */
  public readZigZag(): number {
    let value = this.readVarInt()
    value = value >> 1 ^ -(value & 1)
    const signed = value < 0

    return signed ? -value : value
  }

  /**
   * Writes a 32 bit ( 4 bytes ) zig-zag encoded variable length integer ( -2147483648 to 2147483647 )
   * @param value 
   */
  public writeZigZag(value: number): void {
    value = value << 1 ^ value >> 31
    this.writeVarInt(value)
  }

  /**
   * Reads a 64 bit ( 8 bytes ) zig-zag encoded variable length integer ( -9223372036854775808 to 9223372036854775807 )
   * @returns {bigint}
   */
  public readZigZong(): bigint {
    let value = this.readVarLong()
    value = value >> 1n ^ -(value & 1n)
    const signed = value < 0n

    return signed ? -value : value
  }

  /**
   * Writes a 64 bit ( 8 bytes ) zig-zag encoded variable length integer ( -9223372036854775808 to 9223372036854775807 )
   * @param value 
   */
  public writeZigZong(value: bigint): void {
    value = value << 1n ^ value >> 63n
    this.writeVarLong(value)
  }
}

export {
  BinaryStream,
}
