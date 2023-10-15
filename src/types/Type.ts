import type { BinaryStream } from '../BinaryStream'

export abstract class Type {
  public static read(stream: BinaryStream): any {
    throw new Error('Not implemented')
  }
  public static write(stream: BinaryStream, value: any): void {
    throw new Error('Not implemented')
  }
}
