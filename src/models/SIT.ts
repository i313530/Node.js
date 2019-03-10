import { Entity, Column, PrimaryColumn } from 'typeorm'
@Entity()
export class ScopeitemT {
  @PrimaryColumn({type: "character", length:40})
  public SI_ID: string
  @PrimaryColumn({type: "character", length:2})
  public VERSION: string
  public LANGU: string  
  @Column()
  public SI_NAME: string
  public SI_DESC: string
}