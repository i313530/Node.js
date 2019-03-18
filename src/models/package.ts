import { Entity, Column, PrimaryColumn, Timestamp, OneToMany, JoinTable } from 'typeorm'
// import { PackageT } from './packageT'
@Entity()
export class Package {
  @PrimaryColumn({ type: 'character', length: 40 })
  public PKG_ID: string

  // @OneToMany(type => PackageT, packageT => packageT.pkg)
  // public packageTs: PackageT[]

  @PrimaryColumn({ type: 'character', length: 2 })
  public VERSION: string
  @Column({ type: 'character', length: 1, nullable: true })
  public COMPLETION: string
  @Column({ type: 'boolean'})
  public OutOfScope: boolean
  @Column({ type: 'character', length: 20, nullable: true })
  public CREATED_BY: string

  @Column({ type: 'timestamp' })
  public CREATED_AT: string

  @Column({ type: 'character', length: 20, nullable: true })
  public CHANGED_BY: string

  @Column({ type: 'timestamp', nullable: true })
  public CHANGED_AT: string
}
