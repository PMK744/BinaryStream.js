import type { BinaryStream } from '../BinaryStream'
import { Endianness } from '../Endianness'

export abstract class Type {
  public static read(stream: BinaryStream, endian: Endianness = Endianness.Big): any {
    throw new Error('Not implemented')
  }
  public static write(stream: BinaryStream, value: any, endian: Endianness = Endianness.Big): void {
    throw new Error('Not implemented')
  }
}
