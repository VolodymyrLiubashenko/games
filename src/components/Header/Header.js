import React from 'react'
import style from './Header.module.scss'
import { NavLink } from 'react-router-dom'

const Header = () => {
   return(
      <header className = {style.header}>
         <ul className = {style.list}>
            <li>
               <NavLink to='/Checkers' >
                  Checkers
               </NavLink>
            </li>
            <li>
               <NavLink to='/second-game' >
                  Second-game
               </NavLink>
            </li>
            <li>
               <NavLink to='/third-game' >
                  Third-game
               </NavLink>
            </li>
            <li>
               <NavLink to='/' >
                  Home
               </NavLink>
            </li>
         </ul>
      </header>
   )
}
export default Header