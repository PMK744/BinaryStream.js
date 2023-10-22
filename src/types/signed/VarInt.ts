import type { BinaryStream } from '../../BinaryStream'
import { Type } from '../Type'

/**
 * Reads or writes a 32 bit ( 4 bytes ) signed zigzag encoded variable length integer ( -2147483648 to 2147483647 )
 */
export class VarInt extends Type {
  public static read(stream: BinaryStream): number {
    return stream.readVarInt()
  }

  public static write(stream: BinaryStream, value: number): void {
    stream.writeVarInt(value)
  }
}
