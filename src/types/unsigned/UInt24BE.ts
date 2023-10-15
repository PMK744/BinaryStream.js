import type { BinaryStream } from '../../BinaryStream'
import { Type } from '../Type'

export class UInt24BE extends Type {
  public static read(stream: BinaryStream): number {
    return stream.readUInt24BE()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeUInt24BE(value)
  }
}
