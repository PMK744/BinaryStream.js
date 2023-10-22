import type { BinaryStream } from '../BinaryStream'
import { DataType } from './DataType'

export class Bool extends DataType {
  public static read(stream: BinaryStream): boolean {
    return stream.readBool()
  }

  public static write(stream: BinaryStream, value: boolean): void {
    stream.writeBool(value)
  }
}
