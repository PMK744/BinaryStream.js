import type { BinaryStream } from '../../BinaryStream'
import { DataType } from '../DataType'

/**
 * Reads or writes a 64 bit ( 8 bytes ) unsigned zigzag encoded variable length integer ( -9223372036854775808 to 9223372036854775807 )
 */
export class VarULong extends DataType {
  public static read(stream: BinaryStream): bigint {
    return stream.readVarULong()
  }

  public static write(stream: BinaryStream, value: bigint): void {
    stream.writeVarULong(value)
  }
}
