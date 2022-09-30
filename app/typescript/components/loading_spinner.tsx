import React from 'react'
import { Circles } from 'react-loader-spinner'

export default function LoadingSpinner() {
  return (
    <div className='d-flex justify-content-center'>
      <Circles
        height='80'
        width='80'
        color='#4fa94d'
        ariaLabel='circles-loading'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
    </div>
  )
}
