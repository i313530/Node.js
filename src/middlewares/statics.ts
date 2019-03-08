import path from 'path'
import compress from 'compression'
import * as express from 'express'
export default (app: express.Application) => {
  // Should be placed before express.static
  app.use(compress())
  app.use(
    '/ui',
    express.static(path.resolve('./ui'), {
      // maxAge: 1000*60*60 //*24*365
    })
  )
}
