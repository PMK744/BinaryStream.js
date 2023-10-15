import type { BinaryStream } from '../../BinaryStream'
import { Type } from '../Type'

export class Short extends Type {
  public static read(stream: BinaryStream): number {
    return stream.readShort()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeShort(value)
  }
}
