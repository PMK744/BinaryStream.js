import type { BinaryStream } from '../../BinaryStream'
import { Type } from '../Type'

export class Int32 extends Type {
  public static read(stream: BinaryStream): number {
    return stream.readInt32()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeInt32(value)
  }
}
