import type { BinaryStream } from '../BinaryStream'
import { DataType } from './DataType'

/**
 * Reads or writes a 32 bit float
 */
export class LF32 extends DataType {
  public static read(stream: BinaryStream): number {
    return stream.readLF32()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeLF32(value)
  }
}
