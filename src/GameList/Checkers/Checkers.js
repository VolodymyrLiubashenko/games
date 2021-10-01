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
   let checkersPosition = { 2: '2', 4: '4', 6: '6', 8: '8', 9: '9', 11: '11', 13: '13', 15: '15', 18: '18', 20: '20', 22: '22', 24: '24', 41: '41', 43: '43', 45: '45', 47: '47', 50: '50', 52: '52', 54: '54', 56: '56', 57: '57', 59: '59', 61: '61', 63: '63' }

   useEffect(() => {
      checkers.current = field.current.querySelectorAll('div[data-type="checker"]')
      field.current.addEventListener('click', getChekerState)
      field.current.addEventListener('click', function (e) {
         moveChecker(e)
      })
   }, [])

   useEffect(()=>{
      for (let el of field.current.children){
         if(el.children.length!==0){
            checkersPosition[el.firstElementChild.dataset.number]=el.dataset.number
         }
      }
   },[])

   let getDifference = (a,b) => {
      let result = Math.abs(Number(a)-Number(b))
      return result
   }

   let checkBeatPosibility = (currentChecker) =>{
      let beatNumber
      let cellWithBeatedCheacer = Array.from(field.current.children).find(el => el.dataset.number === String(deletePosition))
      if (cellWithBeatedCheacer && cellWithBeatedCheacer.firstElementChild){
         beatNumber = Number(cellWithBeatedCheacer.firstElementChild.dataset.number)
      }else return false
      if ((Number(currentChecker) <= 24 && beatNumber > 40) || (Number(currentChecker) >= 40 && beatNumber <= 24)) return true
       return false
   }

   function removechecker(e){
         let cellWithBeatedCheacer = Array.from(field.current.children).find(el => el.dataset.number === String(deletePosition))
      if (cellWithBeatedCheacer){
            delete checkersPosition[cellWithBeatedCheacer.firstElementChild.dataset.number]
            cellWithBeatedCheacer.innerHTML = ''
      }
        
   }

   function getChekerState(e){
      if (e.target.closest('div[data-type="checker"]')){
         currentChecker.current=(addConditionToChecker(getChecker(e)))
         currentParrent.current=(getParrentNode(addConditionToChecker(getChecker(e))))
         startPosition = Number(currentParrent.current.dataset.number)  
      }
   }

   function moveChecker(e){
      finishPosition = Number(e.target.dataset.number)
      deletePosition = (startPosition + finishPosition) / 2
      if (
         e.target.children.length === 0 &&
         e.target.dataset.type === 'black' &&
          currentParrent.current &&
         checkBeatPosibility(currentChecker.current.dataset.number) &&
         getDifference(startPosition, finishPosition) >= 14 &&
         getDifference(startPosition, finishPosition) !== 16 &&
         getDifference(startPosition,finishPosition) <= 18){
            currentParrent.current.removeChild(currentChecker.current)
            e.target.appendChild(currentChecker.current)
            removechecker(e)
            currentParrent.current = e.target
            startPosition = Number(currentParrent.current.dataset.number)
            checkersPosition[currentChecker.current.dataset.number] = e.target.dataset.number
            getQueenChecker()
            console.log('checkersPosition', checkersPosition)
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
            checkersPosition[currentChecker.current.dataset.number] = e.target.dataset.number
            getQueenChecker()
            console.log('checkersPosition', checkersPosition)
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

   let renderCell = (obj) =>{
      let cells = []
      for(let i = 1, k=1; i <=64; i++){
         if ((i % 2 === 0 && k % 2 ===0 )|| (i % 2 !== 0 && k % 2 !==0)){
            cells.push(<Cell key = {i} number = {i}  type = 'white'/>)
            }
         if ((i % 2 === 0 && k % 2 !== 0) || (i % 2 !== 0 && k % 2 === 0)){
            let flag = 0
             for(let key in obj){
               let color=key>24?'white':'black'
               if(Number(obj[key]) === i){
                  cells.push(<Cell key={i} children={<Checker number={key} color={color} />} number = {i} type="black"/>)
                  flag++
               }  
            }
            if(flag === 0){
               cells.push(<Cell key={i} number={i} type='black' />)
            }
         }  
         i%8 === 0? k++:k=k           
      }
       console.log('cells', cells[1])
      return cells
     
   }

   let getQueenChecker = ()=>{
      if (currentChecker.current.dataset.color === 'white'
          && Number(currentParrent.current.dataset.number) >= 2 
         && Number(currentParrent.current.dataset.number) <= 8){
         currentChecker.current.dataset.queen = 'true'
      }
      if (currentChecker.current.dataset.color === 'black'
         && Number(currentParrent.current.dataset.number) >= 51
         && Number(currentParrent.current.dataset.number) <= 64) {
         currentChecker.current.dataset.queen = 'true'
      }
   }
   
   return (
      <div className = {style.game_container}>
         <Header/>
         <h1 className = {style.game_title}>Checkers</h1>
         <div ref = {field} className={style.checkers_field}>
            {renderCell(checkersPosition)}
         </div>
      </div>
   )
}

export default Checkers;