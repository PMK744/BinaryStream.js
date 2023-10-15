import type { BinaryStream } from '../../BinaryStream'
import { Type } from '../Type'

export class UInt24LE extends Type {
  public static read(stream: BinaryStream): number {
    return stream.readUInt24LE()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeUInt24LE(value)
  }
}
