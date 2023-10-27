import type { BinaryStream } from '../BinaryStream'
import { DataType } from './DataType'

/**
 * Reads or writes a raw buffer
 */
export class RawBuffer extends DataType {
  public static read(stream: BinaryStream, length: number): Buffer {
    return stream.read(length)
  }

  public static write(stream: BinaryStream, value: Buffer): void {
    stream.write(value)
  }
}
