import type { BinaryStream } from '../../BinaryStream'
import { Type } from '../Type'

export class Int16 extends Type {
  public static read(stream: BinaryStream): number {
    return stream.readInt16()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeInt16(value)
  }
}
