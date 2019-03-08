import { Entity, Column, PrimaryColumn } from 'typeorm'
@Entity()
export class Table2 {
  @PrimaryColumn()
  public id2: number
  @Column()
  public text: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: number
}
