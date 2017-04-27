import { Observable, Observer, Subscription, Scheduler } from 'rxjs'
import { Readable } from 'stream'

const sep = new Buffer("\n")

const join = ( leftBuffer:Buffer, rightBuffer:Buffer ):Buffer => {
  const leftSize = (leftBuffer||'').length
  const rightSize = (rightBuffer||'').length
  const out = new Buffer(leftSize+rightSize)
  leftSize && leftBuffer.copy(out)
  rightSize && rightBuffer.copy(out,leftSize)
  return out
}

const total = ( buffers:Buffer[] ) => {
  let size = 0
  buffers.forEach ( b => size += b.length )
  return size
}

const concatBuffers = ( ...sources:Buffer[] ) => {
  return sources.reduce(join)
}

const splitBuffer = ( source:Buffer, separator:string|number|Buffer ) => {
  const chunks:Buffer[] = []
  let offset = 0
  do {
    const pos = source.slice(offset).indexOf(separator) + offset
    if ( pos > offset )
    {
      chunks.push(source.slice(offset,pos))
      offset = pos+1
    }
    else 
    {
      chunks.push(source.slice(offset))
      offset = source.length + 1
    }
  }while(offset<source.length)
  
  return chunks
}

export const fromReadable = function(readable:Readable) {
    return Observable.create(function(observer:Observer<Buffer>) {
        function nop() {};

        let tmp:Buffer = new Buffer('')

        const emit = ( ...buffers:Buffer[] ) => {
          Observable.from(buffers).subscribe(
            nextFn,
            throwFn
          )
        }

        const onData = ( data:Buffer ) => {
          const chunks = splitBuffer(data,sep)
          const first = concatBuffers(tmp,chunks.shift())
          tmp = chunks.pop()
          emit(first,...chunks)
          //chunks.forEach( chunk => nextFn(chunk) )
        }

        var nextFn = observer.next ? observer.next.bind(observer) : nop;
        var returnFnCallback = observer.complete ? observer.complete.bind(observer) : nop;
        const returnFn = () => {
          if ( tmp && tmp.length > 0 )
          {
            nextFn(tmp)
          }
          returnFnCallback()
        }
        var throwFn = observer.error ? observer.error.bind(observer) : nop;
        
        readable.on('data', (data:Buffer)=>{
          onData(data)  
        })
        readable.on('close',returnFn)
        readable.on('end', returnFn);
        readable.on('error', throwFn);

        return new Subscription(function() {
            readable.removeListener('data', nextFn);
            readable.removeListener('end', returnFn);
            readable.removeListener('close', returnFn);
            readable.removeListener('error', throwFn);
        });
    }, Scheduler.asap)
}