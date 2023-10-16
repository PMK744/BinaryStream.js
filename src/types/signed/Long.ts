import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { Type } from '../Type'

export class Long extends Type {
  public static read(stream: BinaryStream, endian: Endianness): bigint {
    return stream.readLong(endian)
  }

  public static write(stream: BinaryStream, value: bigint, endian: Endianness): void {
    stream.writeLong(value, endian)
  }
}
