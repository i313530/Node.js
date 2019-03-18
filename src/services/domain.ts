import _ from 'lodash'

const getallFixVal = function dd07() {
  const domainvalueList: DomainValue[] = [
    { Name: 'Completion', Key: 'R', Value: 'To be reviewed' },
    { Name: 'Completion', Key: 'P', Value: 'In preparation' },
    { Name: 'Completion', Key: 'C', Value: 'Ready for production' }
  ]
  return domainvalueList
}

class DomainValue {
  public Name: string
  public Key: string
  public Value: string
}

export default {
  getallFixVal
}
