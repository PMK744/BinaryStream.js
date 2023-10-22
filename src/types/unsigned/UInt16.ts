import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { DataType } from '../DataType'

/**
 * Reads or writes a 16 bit ( 2 byte ) unsigned integer ( 0 to 65535 )
 */
export class UInt16 extends DataType {
  public static read(stream: BinaryStream, endian: Endianness): number {
    return stream.readUInt16(endian)
  }

  public static write(stream: BinaryStream, value: number, endian: Endianness): void {
    stream.writeUInt16(value, endian)
  }
}
