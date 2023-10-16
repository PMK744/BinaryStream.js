import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { Type } from '../Type'

export class UShort extends Type {
  public static read(stream: BinaryStream, endian: Endianness): number {
    return stream.readUShort(endian)
  }

  public static write(stream: BinaryStream, value: number, endian: Endianness): void {
    stream.writeUShort(value, endian)
  }
}
