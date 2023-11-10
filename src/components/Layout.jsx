import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col mx-auto items-center justify-items-center my-24 gap-8'>
      {children}
    </div>
  )
}

export default Layout