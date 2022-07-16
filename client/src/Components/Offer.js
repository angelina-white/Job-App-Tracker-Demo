import OfferItem from "./OfferItem";
import { useEffect } from 'react'
import { gsap } from "gsap";

function Offer({ offerList })
{
    //shows offer cards
    const displayList = offerList.map((item) =>
    {
        return (
            <OfferItem item={ item }/>
        )
    })

    //fades page in
    useEffect(() =>
    {
        gsap.from(".cardUl", {delay: .3, duration: 1, opacity: 0, y: 10});
    }, [])

    return (
        <div className="offer">
            <ul className="cardUl">
                { displayList }
            </ul>
        </div>
    )
}
export default Offer