import type { BinaryStream } from '../BinaryStream'
import { Type } from './Type'

export class Float extends Type {
  public static read(stream: BinaryStream): number {
    return stream.readFloat()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeFloat(value)
  }
}
