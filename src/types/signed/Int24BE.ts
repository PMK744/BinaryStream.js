import type { BinaryStream } from '../../BinaryStream'
import { Type } from '../Type'

export class Int24BE extends Type {
  public static read(stream: BinaryStream): number {
    return stream.readInt24BE()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeInt24BE(value)
  }
}
