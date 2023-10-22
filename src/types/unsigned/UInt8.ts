import type { BinaryStream } from '../../BinaryStream'
import { DataType } from '../DataType'

/**
 * Reads or writes a 8 bit ( 1 byte ) unsigned integer ( 0 to 255 )
 */
export class UInt8 extends DataType {
  public static read(stream: BinaryStream): number {
    return stream.readUInt8()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeUInt8(value)
  }
}
