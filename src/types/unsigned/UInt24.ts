import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { DataType } from '../DataType'

/**
 * Reads or writes a 24 bit ( 3 byte ) unsigned integer ( 0 to 16777215 )
 */
export class UInt24 extends DataType {
  public static read(stream: BinaryStream, endian: Endianness): number {
    return stream.readUInt24(endian)
  }

  public static write(stream: BinaryStream, value: number, endian: Endianness): void {
    stream.writeUInt24(value, endian)
  }
}
