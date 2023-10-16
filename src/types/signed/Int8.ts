import type { BinaryStream } from '../../BinaryStream'
import { Endianness } from '../../Endianness'
import { Type } from '../Type'

export class Int8 extends Type {
  public static read(stream: BinaryStream): number {
    return stream.readInt8()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeInt8(value)
  }
}
