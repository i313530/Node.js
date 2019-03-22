import { Entity, Column, PrimaryColumn, Timestamp } from 'typeorm'
// import { PackageT } from './packageT'
@Entity()
export class Record {
  @PrimaryColumn({ type: 'character', length: 40 })
  public REC_ID: string

  @PrimaryColumn({ type: 'character', length: 2 })
  public VERSION: string
  @Column({ type: 'character', length: 32})
  public TABLE: string
  @Column({ type: 'character', length: 40, nullable: true })
  public KEY_HASH: string
  @Column({ nullable: true })
  public PRIMKEY: string
  @Column({ type: 'character', length: 20, nullable: true })
  public OWNER: string
  @Column({ type: 'character', length: 20, nullable: true })
  public CREATED_BY: string

  @Column({ type: 'timestamp' })
  public CREATED_AT: string

  @Column({ type: 'character', length: 20, nullable: true })
  public CHANGED_BY: string

  @Column({ type: 'timestamp', nullable: true })
  public CHANGED_AT: string
}
