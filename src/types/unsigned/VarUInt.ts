import type { BinaryStream } from '../../BinaryStream'
import { DataType } from '../DataType'

/**
 * Reads or writes a 32 bit ( 4 bytes ) unsigned zigzag encoded variable length integer ( -2147483648 to 2147483647 )
 */
export class VarUInt extends DataType {
  public static read(stream: BinaryStream): number {
    return stream.readVarUInt()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeVarUInt(value)
  }
}
