import type { BinaryStream } from '../BinaryStream'
import { Type } from './Type'

/**
 * Still a string, didnt want to extend the String proto
 */
export class LitString extends Type {
  public static read(stream: BinaryStream): string {
    return stream.readString()
  }

  public static write(stream: BinaryStream, value: string): void {
    stream.writeString(value)
  }
}
