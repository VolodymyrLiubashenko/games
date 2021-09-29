import React, {useEffect,useState,useRef} from "react";
import Header from "../../components/Header/Header";
import style from './Checkers.module.scss'
import Cell from "./Cell/Cell";
import Checker from "./Checker/Checker";
const Checkers = ()=>{
   
   let currentChecker = useRef()
   let currentParrent = useRef()
   let startPosition = useRef()
   let finishPosition = useRef()
   let deletePosition = useRef()
   let field = useRef()
   let checkers = useRef()

   useEffect(() => {
      checkers.current = field.current.querySelectorAll('div[data-type="checker"]')
      field.current.addEventListener('click', getChekerState)
      field.current.addEventListener('click', function (e) {
         moveChecker(e)
      })
   }, [])

   let getDifference = (a,b) => {
      let result = Math.abs(Number(a)-Number(b))
      return result
   }

   let checkCheckerPresence = (deletePosition) =>{
      let cellWithBeatedCheacer = Array.from(field.current.children).find(el => el.dataset.number === String(deletePosition))
      if (cellWithBeatedCheacer){
         return cellWithBeatedCheacer.children.length!=0 ? true: false
      }
      return false
   }

   function removechecker(e){
         let cellWithBeatedCheacer = Array.from(field.current.children).find(el => el.dataset.number === String(deletePosition))
         cellWithBeatedCheacer ? cellWithBeatedCheacer.innerHTML = '' : cellWithBeatedCheacer=undefined
   }

   function getChekerState(e){
      if (e.target.closest('div[data-type="checker"]')){
         currentChecker.current=(addConditionToChecker(getChecker(e)))
         currentParrent.current=(getParrentNode(addConditionToChecker(getChecker(e))))
         startPosition = Number(currentParrent.current.dataset.number)
         console.log('currentParrent.current', currentParrent.current)
         
      }
   }

   function moveChecker(e){
      finishPosition = Number(e.target.dataset.number)
      deletePosition = (startPosition + finishPosition) / 2
      console.log('deletePosition', deletePosition)
      console.log('getDifference(startPosition, finishPosition)', getDifference(startPosition, finishPosition))
      console.log('finishPosition', finishPosition)
      console.log('startPosition', startPosition)
      console.log('currentParrent.current', currentParrent.current)
      if (
         e.target.children.length === 0 &&
         e.target.dataset.type === 'black' &&
          currentParrent.current &&
         checkCheckerPresence(deletePosition) &&
         getDifference(startPosition, finishPosition) >= 14 &&
         getDifference(startPosition, finishPosition) != 16 &&
         getDifference(startPosition,finishPosition) <= 18){
            currentParrent.current.removeChild(currentChecker.current)
            e.target.appendChild(currentChecker.current)
            removechecker(e)
            currentParrent.current = e.target
            startPosition = Number(currentParrent.current.dataset.number)
       }else if (
         e.target.children.length === 0 &&
         e.target.dataset.type === 'black' && 
         currentParrent.current && 
         getDifference(startPosition, finishPosition) >= 7 &&
         getDifference(startPosition, finishPosition) <= 9) {
            currentParrent.current.removeChild(currentChecker.current)
            currentParrent.current = e.target
            e.target.appendChild(currentChecker.current)
            startPosition = Number(currentParrent.current.dataset.number)  
      }
   }
   
   function getParrentNode(el){
      let parrent = el.parentNode
      return parrent
   }
  
   function getChecker(e){
      let checker = e.target.closest('div[data-type="checker"]')
      return checker
   }
   function addConditionToChecker (elem){
      if(elem){
         checkers.current.forEach(el=>el.removeAttribute('data-condition'))
         elem.dataset.condition = true
         return elem
      }   
   }

   

   let renderCell = () =>{
      let cells = []
      for(let i = 1, k=1; i <=64; i++){
         if ((i % 2 === 0 && k % 2 ===0 )|| (i % 2 !== 0 && k % 2 !==0)){
            cells.push(<Cell key = {i} number = {i}  type = 'white'/>)
            }
         if ((i % 2 === 0 && k % 2 !== 0) || (i % 2 !== 0 && k % 2 === 0)){
            if(i<=24){
               cells.push(<Cell key={i} children={<Checker number = {i} color="black"/>} number = {i} type='black' />)
            }
             if(i>=41){
                cells.push(<Cell key={i} children={<Checker number={i} color="white" />} number={i} type='black' />)
            }
             if(i>24 && i<41){
                cells.push(<Cell key={i} number={i} type='black' />)
            } 
         }  
         i%8 === 0? k++:k=k           
      }
      return cells
   }
   return (
      <div className = {style.game_container}>
         <Header/>
         <h1 className = {style.game_title}>Checkers</h1>
         <div ref = {field} className={style.checkers_field}>
            {renderCell()}
         </div>
      </div>
   )
}

export default Checkers;