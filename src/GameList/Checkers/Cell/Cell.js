import React from "react";
import style from './Cell.module.scss'

const Cell = ({type,number,children}) => {
   return(
      <div 
      data-number = {number}
      data-type = {type} 
      className = {style.cell}>
         {children}
      </div>
   )
}
export default Cell