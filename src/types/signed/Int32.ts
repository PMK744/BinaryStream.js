import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { Type } from '../Type'

export class Int32 extends Type {
  public static read(stream: BinaryStream, endian: Endianness): number {
    return stream.readInt32(endian)
  }

  public static write(stream: BinaryStream, value: number, endian: Endianness): void {
    stream.writeInt32(value, endian)
  }
}
