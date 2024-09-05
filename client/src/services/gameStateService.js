import axios from 'axios'

const baseUrl='http://localhost:3001/'

const stateData=async()=>{
    const response=await axios.get(`${baseUrl}gameState`)
    console.log('✌️response.data --->', response.data);
    return response.data

}


const updateGameData=async(newState)=>{
console.log('✌️newState --->', newState);
    const response=await axios.put(`${baseUrl}gameState`,{ state: newState })
    console.log('✌️response.data of updateGameData--->', response.data);
    return response.data

}

const gameData={
    stateData,
    updateGameData
}


export default gameData