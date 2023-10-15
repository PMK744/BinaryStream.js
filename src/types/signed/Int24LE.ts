import type { BinaryStream } from '../../BinaryStream'
import { Type } from '../Type'

export class Int24LE extends Type {
  public static read(stream: BinaryStream): number {
    return stream.readInt24LE()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeInt24LE(value)
  }
}
