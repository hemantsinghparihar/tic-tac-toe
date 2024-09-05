import React,{useState,useEffect} from 'react'
import '../css/home.css'
import Square from '../component/Square'
import gameState from '../services/gameStateService'

function Home() {
// const[state,setState]=useState(Array(9).fill(null))
const[state,setState]=useState([])
console.log('✌️state --->', state);
const [won,setWon]=useState(false)
console.log('✌️won --->', won);

const [tie,setTie]=useState(false)
const [isPlayerX,setIsPlayerX]=useState(true)

const value='x';

useEffect(()=>{
    gameState.stateData().then((res) => {
        // Check if res.state is an array and has the expected length
        if (res ) {
            setState(res.state);
        } else {
            console.error("Unexpected data format:", res);
            // Optionally handle incorrect data format
        }
    })
    console.log('✌️state --->', state);

        
},[])
// useEffect(()=>{

// },[state])


const checkWinner=(board=state)=>{ //if nothisng is passed as an parameter the default value of board will be state

    const winningCombinations=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for(const winnie of winningCombinations){
        const [a,b,c]=winnie;
        if(board[a]!=null && board[a]===board[b] && board[a]===board[c]){
            console.log('found winner hurrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrreeeeeeeeeeeeeeeeeeeeeeee!!!!!!!!!!!!!!!!!!')
            return board[a];
        }
        
    }
    return null; //no winners yet
}

const handleClick=(index)=>{
    //the index is the index number of the box which we are clicking

    if (state[index] || checkWinner()) return; // state[index]-checks if the value at this index is already or not if it existes then handler end here . we also check for the winner if it returns true then code ends here

    console.log(`you have clicked on ${state[index]}`)
    // e.preventDefault()
    const newState=[...state]; //created copy of real state
    // newState[index]=isPlayerX?'X':'O';
    newState[index]='X' //placing x at the index we have clicked
    setState(newState);
    gameState.updateGameData(newState)
   
    
    // setIsPlayerX(!isPlayerX)
    const winner = checkWinner(newState);
    if(winner){
        setWon(true)
        return
    }; //checking if anyone have won

    const tieArray=newState.filter((value)=>{

        return value===null;
    })
    console.log('✌️tieArray --->', tieArray);
    if(tieArray.length===0){
        setTie(true)
    }

    console.log('cecking after the winner check in click handler')
    computerMove(newState)
    // if(!checkWinner()){
    //     setTimeout(()=>{
    //         computerMove(newState)
    //     },1000)
    // }
//how can i resolve the issue of - so the problem is , when i am playing my turn , then the computer is supposed to play its turn but it is not doing it , maybe i have to first know what the code i have written is doing okk , that is the first, ok for tht i will make comments on each line
}

const computerMove=(currentState)=>{
    //filter state is an array that will store the index of null positions
    const filterState=currentState.map((value,index)=>{

        return(
            value===null?index:null
        )
    }).filter((value)=>value!==null);

    console.log('✌️filterState --->', filterState);

    //2 Function to check potential winning move for a given player ('O' or 'X')
    const findWinningMove=(board,player)=>{
        for(let i=0;i<filterState.length;i++){
            const newBoard=[...board];
            newBoard[filterState[i]]=player;
           if( checkWinner(newBoard)===player){
            return filterState[i]
           }

        }
        return null;
    }

    //1 Check if the computer can win in the next move
    const winningMove = findWinningMove(currentState, 'O');
    if (winningMove !== null) {
        currentState[winningMove] = 'O';
        setState([...currentState]);
        gameState.updateGameData(currentState)
        setTimeout(()=>{
            setWon(true) //so there is something hppening when my computer playing after that x is playing it again well it seems like it is delaying you have won not playing of o
        },1000)
        return;
    }

    //block the users winning move
    const blockWinning=findWinningMove(currentState,'X');
    if(blockWinning!=null){
        currentState[blockWinning]='O';
        setState([...currentState]);
        gameState.updateGameData(currentState)
        return;
    }

    //take the center if availible
    if(currentState[4]===null){
        currentState[4]='O'
        setState([...currentState]);
        gameState.updateGameData(currentState)
        return;
    }
   
    if(filterState.length>0){
      
        const random=Math.floor(Math.random()*filterState.length)
        console.log('✌️random --->', random);
        const update=filterState[random]
        console.log('✌️update --->', update);
        currentState[update]='O'
        setState([...currentState])
        gameState.updateGameData(currentState)
    }



}


const handlePlayAgain=()=>{
    const initialGameState=Array(9).fill(null)
    gameState.updateGameData(initialGameState).then(res=>{
        setState(res.state)
    })
    setTie(false)
    setWon(false)
}

  return (

    
    <div className='main-container'>
    
    <>
    {won?
        <>
        <h1>someone won the game</h1>
        <button onClick={handlePlayAgain}>play again</button>
        </>
          :
               
        

   
        <div className="board-container">
            
            {state && (
                <>
                     <div className="board-row">
                <Square value={state[0]} handler={()=>handleClick(0)}  />
                <Square value={state[1]} handler={(e)=>handleClick(1)}/>
                <Square value={state[2]} handler={()=>handleClick(2)}/>
            </div>
            <div className="board-row mid">
                <Square value={state[3]} handler={()=>handleClick(3)}/>
                <Square value={state[4]} handler={()=>handleClick(4)}/>
                <Square value={state[5]} handler={()=>handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={state[6]} handler={()=>handleClick(6)}/>
                <Square value={state[7]} handler={()=>handleClick(7)}/>
                <Square value={state[8]} handler={()=>handleClick(8)}/>
            </div>
                </>
            )}

            {tie && (
                <>
                <h1>game ends with a tie</h1>
                <button onClick={handlePlayAgain}>play again</button>
                </>
            )}
           
        </div>

    
    
           
}
    </>   
    </div>
  )
}

export default Home
