import type { BinaryStream } from '../../BinaryStream'
import { Type } from '../Type'

export class UShort extends Type {
  public static read(stream: BinaryStream): number {
    return stream.readUShort()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeUShort(value)
  }
}
