import React from 'react'
import propTypes from 'prop-types'
import { Accounts } from 'meteor/accounts-base'
import { createContainer }  from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'

export const PrivateHeader = (props) => {
  const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg'

  return (
    <div className="header">
      <div className="header__content">
        <img className="header__nav-toggle" src={navImageSrc} onClick={props.handleImgClick} />
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => props.handleLogout()}>Logout</button>
      </div>
    </div>
  )
}

PrivateHeader.propTypes = {
  title: propTypes.string.isRequired,
  handleLogout: propTypes.func.isRequired,
  handleImgClick: propTypes.func.isRequired,
  isNavOpen: propTypes.bool.isRequired
}

export default createContainer(() => {
  return  {
    handleImgClick: () => {
      const isOpen = Session.get('isNavOpen')
      Session.set('isNavOpen', !isOpen)
    } ,
    handleLogout: () => Accounts.logout(),
    isNavOpen: Session.get('isNavOpen')
  }
}, PrivateHeader)
// export default PrivateHeader
