import React from 'react'

function AuthImagePattern({title,subtitle}) {
  return (
    <div className='hidden mt-6 lg:flex items-center rounded-xl justify-center bg-base-200 p-12'>
        <div className='max-w-md text-center'>
            <div className='grid grid-cols-3 gap-3 mb-8'>
                {[...Array(9)].map((_,i)=>(
                    <div key={i} className={`aspect-square rounded-2xl hover:bg-primary/60 hover:animate-pulse bg-primary/10 ${i%2===0?"animate-pulse":""}`}>

                    </div>
                ))}
            </div>
            <h1 className='text-2xl font-bold mb-4'>{title}</h1>
            <p className='text-base-content/60'>{subtitle}</p>
        </div>
    </div>
  )
}

export default AuthImagePattern