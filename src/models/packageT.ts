import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'
// import { Package } from './package'
@Entity()
export class PackageT {
  @PrimaryColumn({ type: 'character', length: 40 })
  public PKG_ID: string
  @PrimaryColumn({ type: 'character', length: 2 })
  public VERSION: string
  public LANGU: string
  @Column({ nullable: true })
  public PKG_NAME: string
  public PKG_DESC: string

  // @ManyToOne(type => Package, pkg => pkg.packageTs)
  // public pkg: Package

  // public packageTs: PackageT[]
}
