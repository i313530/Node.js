import { Entity, Column, PrimaryColumn } from 'typeorm'
@Entity()
export class ScopeitemT {
  @PrimaryColumn({ type: 'character', length: 40 })
  public SI_ID: string
  @PrimaryColumn({ type: 'character', length: 2 })
  public VERSION: string
  @PrimaryColumn({ type: 'character', length: 2 })
    public LANGU: string
  @Column({ nullable: true })
  public SI_NAME: string
  public SI_DESC: string
}
