
const prefix = 'rxshell'

export const log = ( format:string, ...args:any[] ) => {
  if ( process.env.NODE_ENV && process.env.NODE_ENV === 'debug' )
  {
    console.log(`%s ${format}`, prefix, ...args)
  }
}