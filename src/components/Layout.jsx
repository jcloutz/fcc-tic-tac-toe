import React from 'react'
const { element } = React.PropTypes

const Layout = ({children}) => (
  <div className='layout__container'>
    <div className='layout__content'>
      {children}
    </div>
    <div className='layout__footer'>
      Footer Content
    </div>
  </div>
)

Layout.propTypes = {
  children: element
}

export default Layout
