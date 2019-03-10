import { Entity, Column, PrimaryColumn } from 'typeorm'
@Entity()
export class PkgSiAssign {
  @PrimaryColumn({ type: 'character', length: 40 })
  public PKG_ID: string
  public SI_ID: string
  @PrimaryColumn({ type: 'character', length: 2 })
  public VERSION: string
  @Column()
  public PARENT: string
  public SI_ORDER: number
}
