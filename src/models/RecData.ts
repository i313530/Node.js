export class RecordOutput {
  public REC_ID: string
  public VERSION: string
  public KEY_HASH: string
  public PRIMKEY: string
  public OWNER: string
  public CREATED_BY: string
  public CREATED_AT: string
  public CHANGED_BY: string
  public CHANGED_AT: string
  public cells: ICell[]

}
interface ICell {
  FLD_ID: string
  VALUE: string
}
