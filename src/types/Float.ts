import type { BinaryStream } from '../BinaryStream'
import { DataType } from './DataType'

export class Float extends DataType {
  public static read(stream: BinaryStream): number {
    return stream.readFloat()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeFloat(value)
  }
}
