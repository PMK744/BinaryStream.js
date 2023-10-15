import type { BinaryStream } from '../BinaryStream'
import { Type } from './Type'

export class Bool extends Type {
  public static read(stream: BinaryStream): boolean {
    return stream.readBool()
  }

  public static write(stream: BinaryStream, value: boolean): void {
    stream.writeBool(value)
  }
}
