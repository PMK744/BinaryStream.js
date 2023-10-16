import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { Type } from '../Type'

export class UInt32 extends Type {
  public static read(stream: BinaryStream, endian: Endianness): number {
    return stream.readUInt32(endian)
  }

  public static write(stream: BinaryStream, value: number, endian: Endianness): void {
    stream.writeUInt32(value, endian)
  }
}
