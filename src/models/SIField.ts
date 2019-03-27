import { Entity, Column, PrimaryColumn, Timestamp } from 'typeorm'

@Entity()
export class SIField {
  @PrimaryColumn({ type: 'character', length: 40 })
  public SI_ID: string
  @PrimaryColumn({ type: 'character', length: 30 })
  public FIELD: string
  @PrimaryColumn({ type: 'character', length: 2 })
  public VERSION: string
  @Column({ type: 'int', nullable: true })
  public DISPLAY_ORDER: number
  @Column({ type: 'boolean' })
  public VISIBILITY: boolean
  @Column({ type: 'character', length: 2, nullable: true })
  public TYPE: string
  @Column({ type: 'character', length: 4, nullable: true })
  public DDTYPE: string

  @Column({ type: 'int', nullable: true })
  public DDLENG: string

  @Column({ type: 'character', length: 30, nullable: true })
  public ALIAS: string
}
