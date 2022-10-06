import {useState, useEffect} from "react";

import './App.css';
import pathIconInsta from './icon/insta.png'
import pathIconLogo from './icon/logo.png'
import pathIconMan from './icon/man.png'
import pathIconVk from './icon/vk.png'
import pathIconTorii from './icon/torii.png'
import pathIconHelmet from './icon/helmet.png'
import pathIconOdnok from './icon/odnok.png'
import pathIconPosylka from './icon/posylka.png'
import pathIconSound from './icon/sound.png'
import pathIconTransparent from './icon/transparent.png'

import pathIconUnicorn from './icon/unicorn.png'

const initialArrayCards = [
    {id: 1, img: pathIconInsta},
    {id: 2, img: pathIconLogo},
    {id: 3, img: pathIconMan},
    {id: 4, img: pathIconVk},
    {id: 5, img: pathIconTorii},
    {id: 6, img: pathIconHelmet},
    {id: 7, img: pathIconOdnok},
    {id: 8, img: pathIconPosylka},
    {id: 9, img: pathIconSound},
    {id: 10, img: pathIconTransparent},
]

const pairOfArrayCards = [...initialArrayCards, ...initialArrayCards]

const App = () => {

    const [arrayCards, setArrayCards] = useState([])
    const [openedCards, setOpenedCards] = useState([])
    const [matched, setMatched] = useState([])
    const [moves, setMoves] = useState(0)



    const shuffle = (array) => {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }
        return array
    }

    useEffect(()=>{
        setArrayCards(shuffle(pairOfArrayCards))
    }, [])

    const flipCard = (index) => () => {
        setOpenedCards(opened => [...opened, index])
        setMoves(prevMove => prevMove + 1)
    }

    useEffect(() => {
        if (openedCards < 2) return
        const  firstMatched = arrayCards[openedCards[0]];
        const secondMatched = arrayCards[openedCards[1]];

        if (secondMatched && firstMatched.id === secondMatched.id) {
            setMatched(([...matched, firstMatched.id]))
        }
        if (openedCards.length === 2) setTimeout(() => setOpenedCards([]), 1000)
    }, [openedCards])

    const handleGameRestart = () => {

        setOpenedCards([]);
        setMatched([])
        setMoves(0)
        setArrayCards(shuffle(pairOfArrayCards))

    }

    return (
    <div className="container">
        <p className="number-of-strokes">Сделано ходов: {moves}</p>
        <div className="cards">
            {arrayCards.map((item, index) => {
             let isFlipped = false;

             if (openedCards.includes(index)) isFlipped = true
             if (matched.includes(item.id)) isFlipped = true

                return (
                    <div key={index}
                         className={`card ${isFlipped ? 'flipped' : ''}`}
                         onClick={flipCard(index)}>
                        <div className='inner'>
                            <div className='front'>
                            <img src={item.img} width="100" alt='front-card'/>
                            </div>
                        <div className='back'>
                            <img src={pathIconUnicorn} alt='question mark'/>
                        </div>
                        </div>
                    </div>
                )
            })}
        </div>
        <button className='button-restart' onClick={handleGameRestart}>Начать заново</button>
    </div>
  );
}

export default App;
