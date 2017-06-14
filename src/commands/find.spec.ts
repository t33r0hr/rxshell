import 'mocha'
import expect from 'ceylon'
import * as assert from 'assert'

import * as path from 'path'
import * as fs from 'fs'
import { Observable, Scheduler } from 'rx'


const PROJECT_ROOT = path.resolve(__dirname,'../../')

import { find } from './find'


const fsStat = ( filename:string ) => {
  let failed = true
  let stats:fs.Stats
  try{
    stats = fs.statSync(filename)
    failed=false
  }catch(e)
  {}
  return stats
}

const assertFileExists = ( filename ) => {
  assert(fsStat(filename),`"${filename}" is not a file.`)
}

describe('test find',function(){

  let testFiles:string[]

  before(()=>{
    return find(['-type','file'],PROJECT_ROOT).toArray().toPromise().then ( files => {
      testFiles = files
    })
  })

  it('finds only files',function(done){

    find(['-type','file'],PROJECT_ROOT).subscribe ( filepath => {
      assertFileExists(filepath)
      expect(filepath).toExist()
    }, 
    (error)=>{
      console.error(error)
      done(error)
    }, 
    done )

  })

})