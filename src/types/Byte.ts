import type { BinaryStream } from '../BinaryStream'
import { DataType } from './DataType'

export class Byte extends DataType {
  public static read(stream: BinaryStream): number {
    return stream.readByte()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeByte(value)
  }
}
