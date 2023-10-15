import type { BinaryStream } from '../BinaryStream'
import { Type } from './Type'

export class Byte extends Type {
  public static read(stream: BinaryStream): number {
    return stream.readByte()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeByte(value)
  }
}
