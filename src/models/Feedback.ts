import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  public id: number
  @Column()
  public text: string
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: number
}
