import React from 'react'
import {NavLink} from 'react-router-dom'
import style from './Home.module.scss'
let Home = () => {
   return(
      <div className={style.container}>
         <ul className={style.list}>
            <li className={style.list_item}>
               <NavLink to='/checkers' className={style.link}>
                  Checkers
               </NavLink>
            </li>
            <li className={style.list_item} >
               <NavLink to='/second-game' className={style.link}>
                  Second-game
               </NavLink>
            </li>
            <li className={style.list_item}>
               <NavLink to='/third-game' className={style.link}>
                  Third-game
               </NavLink>
            </li>
         </ul>
      </div>
   )
}
export default Home