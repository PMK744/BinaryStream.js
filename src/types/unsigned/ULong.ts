import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { Type } from '../Type'

export class ULong extends Type {
  public static read(stream: BinaryStream, endian: Endianness): bigint {
    return stream.readULong(endian)
  }

  public static write(stream: BinaryStream, value: bigint, endian: Endianness): void {
    stream.writeULong(value, endian)
  }
}
