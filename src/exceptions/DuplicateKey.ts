import {ORMError} from './ORMerror'
export class DuplicateKey extends ORMError {
  public code: number
  constructor(public message: string) {
    super(message)
    this.code = 400
  }
}
 

// packageRepo.save(pkg).catch(error => {
// console.log(error)
// throw new DuplicateError(400, error.detail)
// }) 
 
