import { Entity, Column, PrimaryColumn } from 'typeorm'
@Entity()
export class Scopeitem {
  @PrimaryColumn({type: "character", length:40})
  public SI_ID: string
  @PrimaryColumn({type: "character", length:2})
  public VERSION: string
  @Column()
  public CREATED_BY: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public CREATED_AT: number
  @Column()
  public CHANGED_BY: string
  @Column({ type: 'timestamp'})
  public CHANGED_AT: number  
}