import type { BinaryStream } from '../BinaryStream'
import { DataType } from './DataType'

export class Uuid extends DataType {
  public static read(stream: BinaryStream): string {
    return stream.readUuid()
  }

  public static write(stream: BinaryStream, value: string): void {
    stream.writeUuid(value)
  }
}
