import type { BinaryStream } from '../../BinaryStream'
import { Type } from '../Type'

export class UInt16 extends Type {
  public static read(stream: BinaryStream): number {
    return stream.readUInt16()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeUInt16(value)
  }
}
