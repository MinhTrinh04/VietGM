import React from 'react'

const SectionTitle = ({title, path} : {title: string; path: string}) => {
  return (
    <div className='h-[250px] bg-blue-500 max-sm:h-[200px] flex flex-col justify-center items-center login-head'> 
      <h1 className='section-title-title text-7xl text-center mb-7 max-md:text-7xl max-sm:text-5xl text-white max-sm:mb-2 login-head-word'>{ title }</h1>
      <p className='section-title-path text-xl text-center max-sm:text-xl text-white login-head-word '>{ path }</p>
    </div>
  )
}

export default SectionTitle