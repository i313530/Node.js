import { Entity, Column, PrimaryColumn, Timestamp } from 'typeorm'

@Entity()
export class SIRec {
  @PrimaryColumn({ type: 'character', length: 40 })
  public SI_ID: string
  @PrimaryColumn({ type: 'character', length: 40 })
  public REC_ID: string

  @PrimaryColumn({ type: 'character', length: 2 })
  public VERSION: string
  @Column({ type: 'character', length: 1, nullable: true })
  public AVAILABILITY: string
  @Column({ type: 'character', length: 1, nullable: true })
  public LIFECYCLE: string

  @Column({ type: 'character', length: 20, nullable: true })
  public CREATED_BY: string

  @Column({ type: 'timestamp' })
  public CREATED_AT: string

  @Column({ type: 'character', length: 20, nullable: true })
  public CHANGED_BY: string

  @Column({ type: 'timestamp', nullable: true })
  public CHANGED_AT: string
}
