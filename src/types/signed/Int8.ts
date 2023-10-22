import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { Type } from '../Type'

/**
 * Reads or writes a 8 bit ( 1 byte ) signed integer ( -128 to 127 )
 */
export class Int8 extends Type {
  public static read(stream: BinaryStream): number {
    return stream.readInt8()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeInt8(value)
  }
}
