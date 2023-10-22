import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { Type } from '../Type'

/**
 * Reads or writes a 64 bit ( 8 byte ) signed integer ( -9223372036854775808 to 9223372036854775807 )
 */
export class Int64 extends Type {
  public static read(stream: BinaryStream, endian: Endianness): bigint {
    return stream.readInt64(endian)
  }

  public static write(stream: BinaryStream, value: bigint, endian: Endianness): void {
    stream.writeInt64(value, endian)
  }
}
