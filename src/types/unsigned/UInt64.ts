import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { Type } from '../Type'

/**
 * Reads or writes a 64 bit ( 8 byte ) unsigned integer ( 0 to 18446744073709551615 )
 */
export class UInt64 extends Type {
  public static read(stream: BinaryStream, endian: Endianness): bigint {
    return stream.readUInt64(endian)
  }

  public static write(stream: BinaryStream, value: bigint, endian: Endianness): void {
    stream.writeUInt64(value, endian)
  }
}
