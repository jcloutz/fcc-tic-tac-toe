import React from 'react'
const { element } = React.PropTypes

const Layout = ({children}) => (
  <div>
    <h1>Tic Tac Toe</h1>
    {children}
  </div>
)

Layout.propTypes = {
  children: element
}

export default Layout
