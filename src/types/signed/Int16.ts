import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { Type } from '../Type'

/**
 * Reads or writes a 16 bit ( 2 byte ) signed integer ( -32768 to 32767 )
 */
export class Int16 extends Type {
  public static read(stream: BinaryStream, endian?: Endianness): number {
    return stream.readInt16(endian)
  }

  public static write(stream: BinaryStream, value: number, endian?: Endianness): void {
    stream.writeInt16(value, endian)
  }
}
