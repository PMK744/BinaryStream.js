import type { BinaryStream } from '../../BinaryStream'
import { Type } from '../Type'

export class UInt8 extends Type {
  public static read(stream: BinaryStream): number {
    return stream.readUInt8()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeUInt8(value)
  }
}
