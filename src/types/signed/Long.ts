import type { BinaryStream } from '../../BinaryStream'
import { Type } from '../Type'

export class Long extends Type {
  public static read(stream: BinaryStream): bigint {
    return stream.readLong()
  }

  public static write(stream: BinaryStream, value: bigint): void {
    stream.writeLong(value)
  }
}
