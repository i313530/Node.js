import { Entity, Column, PrimaryColumn } from 'typeorm'
@Entity()
export class Scopeitem {
  @PrimaryColumn({ type: 'character', length: 40 })
  public SI_ID: string
  @PrimaryColumn({ type: 'character', length: 2 })
  public VERSION: string
  @Column({ type: 'character', length: 20, nullable: true })
  public CREATED_BY: string
  @Column({ type: 'timestamp' })
  public CREATED_AT: string
  @Column({ type: 'character', length: 20, nullable: true })
  public CHANGED_BY: string
  @Column({ type: 'timestamp', nullable: true })
  public CHANGED_AT: string
  public currentName:string
}
