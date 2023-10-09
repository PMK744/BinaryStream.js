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
    this.readOffset = offset || 0
    this.writeOffset = offset || 0
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
  public writeByte(value: number): void {
    this.binary[this.writeOffset++] = value
  }

  /**
   * Reads a signed byte ( -128 to 127 )
   * @returns {number}
   */
  public readInt8(): number {
    return this.readByte()
  }

  /**
   * Writes a signed byte ( -128 to 127 )
   * @param value 
   */
  public writeInt8(value: number): void {
    this.writeByte(value)
  }

  /**
   * Reads a unsigned byte ( 0 to 255 )
   * @returns {number}
   */
  public readUInt8(): number {
    return this.readByte()
  }

  /**
   * Writes a unsigned byte ( 0 to 255 )
   * @param value 
   */
  public writeUInt8(value: number): void {
    this.writeByte(value)
  }

  /**
   * Reads a 16 bit ( 2 bytes ) signed big eddian integer ( -32768 to 32767 )
   * @returns {number}
   */
  public readInt16(): number {
    return this.readByte() << 8 |
    this.readByte()
  }

  /**
   * Writes a 16 bit ( 2 bytes ) signed big eddian integer ( -32768 to 32767 )
   * @param value 
   */
  public writeInt16(value: number): void {
    this.writeByte(value >> 8)
    this.writeByte(value & 0xFF)
  }

  /**
   * Reads a 16 bit ( 2 bytes ) unsigned big eddian integer ( 0 to 65535 )
   * @returns {number}
   */
  public readUInt16(): number {
    return this.readByte() << 8 |
    this.readByte()
  }

  /**
   * Writes a 16 bit ( 2 bytes ) unsigned big eddian integer ( 0 to 65535 )
   * @param value 
   */
  public writeUInt16(value: number): void {
    this.writeByte(value >> 8)
    this.writeByte(value & 0xFF)
  }

  /**
   * Reads a 32 bit ( 4 bytes ) signed big eddian integer ( -2147483648 to 2147483647 )
   * @returns {number}
   */
  public readInt32(): number {
    return this.readByte() << 24 |
    this.readByte() << 16 |
    this.readByte() << 8 |
    this.readByte()
  }

  /**
   * Writes a 32 bit ( 4 bytes ) signed big eddian integer ( -2147483648 to 2147483647 )
   * @param value 
   */
  public writeInt32(value: number): void {
    this.writeByte(value >> 24)
    this.writeByte(value >> 16)
    this.writeByte(value >> 8)
    this.writeByte(value)
  }

  /**
   * Reads a 32 bit ( 4 bytes ) unsigned big eddian integer ( 0 to 4294967295 )
   * @returns {number}
   */
  public readUInt32(): number {
    return this.readByte() << 24 |
    this.readByte() << 16 |
    this.readByte() << 8 |
    this.readByte()
  }

  /**
   * Writes a 32 bit ( 4 bytes ) unsigned big eddian integer ( 0 to 4294967295 )
   * @param value 
   */
  public writeUInt32(value: number): void {
    this.writeByte(value >> 24)
    this.writeByte(value >> 16)
    this.writeByte(value >> 8)
    this.writeByte(value)
  }

  /**
   * Reads a 16 bit ( 2 bytes ) signed big eddian integer ( -32768 to 32767 )
   * @returns {number}
   */
  public readShort(): number {
    return this.readByte() << 8 | this.readByte()
  }

  /**
   * Writes a 16 bit ( 2 bytes ) signed big eddian integer ( -32768 to 32767 )
   * @param value 
   */
  public writeShort(value: number): void {
    this.writeByte(value >> 8)
    this.writeByte(value & 0xFF)
  }

  /**
   *  Reads a 16 bit ( 2 bytes ) unsigned big eddian integer ( 0 to 65535 )
   * @returns {number}
   */
  public readUShort(): number {
    return this.readByte() << 8 | this.readByte()
  }

  /**
   * Writes a 16 bit ( 2 bytes ) unsigned big eddian integer ( 0 to 65535 )
   * @param value 
   */
  public writeUShort(value: number): void {
    this.writeByte(value >> 8)
    this.writeByte(value & 0xFF)
  }

  /**
   * Reads a 64 bit ( 8 bytes ) signed big eddian integer ( -9223372036854775808 to 9223372036854775807 )
   * @returns {bigint}
   */
  public readLong(): bigint {
    return BigInt(this.readByte()) << 56n |
    BigInt(this.readByte()) << 48n |
    BigInt(this.readByte()) << 40n |
    BigInt(this.readByte()) << 32n |
    BigInt(this.readByte()) << 24n |
    BigInt(this.readByte()) << 16n |
    BigInt(this.readByte()) << 8n |
    BigInt(this.readByte())
  }

  /**
   * Writes a 64 bit ( 8 bytes ) signed big eddian integer ( -9223372036854775808 to 9223372036854775807 )
   * @param value 
   */
  public writeLong(value: bigint): void {
    this.writeByte(Number(value >> 56n))
    this.writeByte(Number(value >> 48n))
    this.writeByte(Number(value >> 40n))
    this.writeByte(Number(value >> 32n))
    this.writeByte(Number(value >> 24n))
    this.writeByte(Number(value >> 16n))
    this.writeByte(Number(value >> 8n))
    this.writeByte(Number(value))
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
}

export default BinaryStream
