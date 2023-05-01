import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { changeAmount } from '../features/herbs/herbSlice';

function HerbItem({herb, herbID}) {

    const [amount, setAmount] = useState(herb.amount)

    const dispatch = useDispatch();

    let expiryString;
    switch(herb.expiry.substr(5, 2)) {
        case '01':
            expiryString = `Jan ${herb.expiry.slice(0, 4)}`
            break;
        case '02':
            expiryString = `Feb ${herb.expiry.slice(0, 4)}`
            break;
        case '03':
            expiryString = `Mar ${herb.expiry.slice(0, 4)}`
            break;
        case '04':
            expiryString = `Apr ${herb.expiry.slice(0, 4)}`
            break;
        case '05':
            expiryString = `May ${herb.expiry.slice(0, 4)}`
            break;
        case '06':
            expiryString = `Jun ${herb.expiry.slice(0, 4)}`
            break;
        case '07':
            expiryString = `Jul ${herb.expiry.slice(0, 4)}`
            break;
        case '08':
            expiryString = `Aug ${herb.expiry.slice(0, 4)}`
            break;
        case '09':
            expiryString = `Sep ${herb.expiry.slice(0, 4)}`
            break;
        case '10':
            expiryString = `Oct ${herb.expiry.slice(0, 4)}`
            break;
        case '11':
            expiryString = `Nov ${herb.expiry.slice(0, 4)}`
            break;
        case '12':
            expiryString = `Dec ${herb.expiry.slice(0, 4)}`
            break;      
        default:
            expiryString = 'No expiry date?'
            break;
    }

    const expiryDate = new Date(herb.expiry)
    let todaysDate = new Date()
    todaysDate.setDate(15)
    const difference = expiryDate.getTime() - todaysDate.getTime()
    const daysBetween = Math.ceil(difference / (1000 * 3600 * 24))
    
    let herbColor = "rgb(183, 238, 177)"
    let textColor = "black"

    // 1m to expiry: rgb(245, 171, 167)
    // 12+m to expiry: rgb(183, 238, 177) 
    if(daysBetween < 15) {
        textColor = "rgb(240, 240, 240)"
        herbColor = "rgb(178, 34, 34)"
    } else if (daysBetween < 45 && daysBetween >=15) {
        herbColor = "rgb(236, 177, 168)"
    } else if (daysBetween < 75 && daysBetween >= 5) {
        herbColor = "rgb(233, 183, 169)"
    } else if (daysBetween < 105 && daysBetween >= 5) {
        herbColor = "rgb(228, 189, 170)"
    } else if (daysBetween < 135 && daysBetween >= 5) {
        herbColor = "rgb(222, 195, 171)"
    } else if (daysBetween < 165 && daysBetween >= 5) {
        herbColor = "rgb(216, 201, 172)"
    } else if (daysBetween < 195 && daysBetween >= 5) {
        herbColor = "rgb(210, 207, 173)"
    } else if (daysBetween < 225 && daysBetween >= 5) {
        herbColor = "rgb(204, 213, 174)"
    } else if (daysBetween < 255 && daysBetween >= 5) {
        herbColor = "rgb(199, 219, 174)"
    } else if (daysBetween < 285 && daysBetween >= 5) {
        herbColor = "rgb(193, 225, 175)"
    } else if (daysBetween < 315 && daysBetween >= 5) {
        herbColor = "rgb(183, 238, 177)"
    }   
    
    const commitAmount = () => {
        dispatch(changeAmount({herbID: herbID, newAmount: amount}))
    }

  return (
    <div className="herb" style={{background: herbColor, color: textColor}}>
        <div className="title"><p>{herb.name}</p></div>
        <p>Expiry: {expiryString}</p>
        <p className="amount">Amount:</p>
        <input type="range" className="slider" name="amount" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} onMouseUp={commitAmount} min='1' max='100' />
    </div>
  )
}

export default HerbItem