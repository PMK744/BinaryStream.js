import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { Type } from '../Type'

export class Int64 extends Type {
  public static read(stream: BinaryStream, endian: Endianness): bigint {
    return stream.readInt64(endian)
  }

  public static write(stream: BinaryStream, value: bigint, endian: Endianness): void {
    stream.writeInt64(value, endian)
  }
}
