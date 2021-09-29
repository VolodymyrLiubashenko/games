import React from "react";
import style from './Checker.module.scss'

const Checker = ({color,number}) =>{
   return(
      <div data-number={number} data-color = {color} data-type = 'checker' className = {style.container}>
         <span className = {style.inside}></span>
      </div>
   )
}

export default Checker