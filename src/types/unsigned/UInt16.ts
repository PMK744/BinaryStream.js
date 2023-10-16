import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { Type } from '../Type'

export class UInt16 extends Type {
  public static read(stream: BinaryStream, endian: Endianness): number {
    return stream.readUInt16(endian)
  }

  public static write(stream: BinaryStream, value: number, endian: Endianness): void {
    stream.writeUInt16(value, endian)
  }
}
