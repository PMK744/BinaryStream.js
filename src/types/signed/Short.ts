import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { Type } from '../Type'

/**
 * Reads or writes a 16 bit ( 2 byte ) signed integer ( -32768 to 32767 )
 */
export class Short extends Type {
  public static read(stream: BinaryStream, endian: Endianness): number {
    return stream.readShort(endian)
  }

  public static write(stream: BinaryStream, value: number, endian: Endianness): void {
    stream.writeShort(value, endian)
  }
}
