import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { DataType } from '../DataType'

/**
 * Reads or writes a 32 bit ( 4 byte ) unsigned integer ( 0 to 4294967295 )
 */
export class UInt32 extends DataType {
  public static read(stream: BinaryStream, endian: Endianness): number {
    return stream.readUInt32(endian)
  }

  public static write(stream: BinaryStream, value: number, endian: Endianness): void {
    stream.writeUInt32(value, endian)
  }
}
