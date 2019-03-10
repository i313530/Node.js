import { Entity, Column, PrimaryColumn } from 'typeorm'
@Entity()
export class PackageT {
  @PrimaryColumn({type: "character", length:40})
  public PKG_ID: string
  @PrimaryColumn({type: "character", length:2})
  public VERSION: string
  public LANGU: string  
  @Column()
  public PKG_NAME: string
  public PKG_DESC: string
}