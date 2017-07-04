import 'mocha'
import expect from 'ceylon'
import * as path from 'path'
import { Observable, Scheduler } from 'rxjs'
import { 
  ChildProcessOptions, ExecCallback  
} from './interfaces'
import { 
  StreamData
} from '../data'
import { parseCommand  } from '../command'
import { ChildProcess } from './ChildProcess.class'

const PROJECT_ROOT = path.resolve(__dirname,'../../')

let colorCnt = 0

const colors = [ 32,32,33,34,35]

const logStream = ( name:string, small=false ) => ( stream:Observable<Buffer> , callback?:any ) => {

  const c = colorCnt++%colors.length
  const color = ['\x1b['+colors[c]+'m','\x1b[0m']
  const t = process.hrtime()

  const __log = ( f:string, ...args:any[] ) => {
    console.log( color[0] + f + color[1], ...args )
  }
  
  const logT = () => {
    const d = process.hrtime(t)
    __log('%s::%s',name,d)
  }
  __log('stream %s', name)

  const sub = stream.subscribe(
      buffer => {
        logT()
        __log('buffer size: %s',buffer.length)
        !small && __log('-'.repeat(64))
        !small && __log('%s',buffer)
        !small && __log('-'.repeat(64))        
      },
      error => {
        logT()
        !small && __log('Error on "%s"', stream)
        console.error(error)
        callback && callback(error)
      },
      ()=>{
        logT()
        __log('stream "%s" finished', name)
        sub && sub.unsubscribe()
        callback && callback()
      }
    )
}

const logStreamData = ( name:string, small=false ) => ( stream:Observable<StreamData<Buffer>> , callback?:any ) => {
  return logStream ( name, small ) ( stream.map ( item => new Buffer(JSON.stringify({
    stdout: item.stdout ? item.stdout.toString() : false,
    stderr: item.stderr ? item.stderr.toString() : false
  })) ), callback)
}


const spawnChild = ( options ) => {
  const child = new ChildProcess(options)
  return child.spawn()
  //return spawn(options)
}

describe('testing child process',()=>{

  describe('exec find at ' + PROJECT_ROOT,function(){

    this.timeout(10 * 1000)

    it('finds all files',(done)=>{

      spawnChild({
        //command: 'ts-node ./src/sim.proc.ts --exitCode 0',
        command: 'find ./node_modules -type file',
        cwd: path.resolve(PROJECT_ROOT)
      })
      .bufferCount(20).toArray().toPromise().then ( data => {
          //console.log('result',data)
          done()        
        })
        .catch ( error => {
          done(error)
          console.log('failed with error')
          console.error(error)
        })
          

    })

  })

})
