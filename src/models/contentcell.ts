import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class RecCell {
  @PrimaryColumn({ type: 'character', length: 40 })
  public REC_ID: string
  @PrimaryColumn({ type: 'character', length: 40 })
  public FLD_ID: string

  @PrimaryColumn({ type: 'character', length: 2 })
  public VERSION: string
  @Column({ nullable: true })
  public VALUE: string
}
