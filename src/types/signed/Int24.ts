import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { Type } from '../Type'

/**
 * Reads or writes a 24 bit ( 3 byte ) signed integer ( -8388608 to 8388607 )
 */
export class Int24BE extends Type {
  public static read(stream: BinaryStream, endian?: Endianness): number {
    return stream.readInt24(endian)
  }

  public static write(stream: BinaryStream, value: number, endian: Endianness): void {
    stream.writeInt24(value, endian)
  }
}
