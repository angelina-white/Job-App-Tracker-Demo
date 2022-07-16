import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function OfferItem({ item })
{
    //displays offer card 
    const {id, salary, medical, pto, sickLeave, bonus, positionType, job } = item

    return (
        <li className="cardLi">
            <Card style={{ width: '18rem' }} >
                <Card.Header id="cardHeader">
                    { job.company }
                </Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Salary: ${ salary }</ListGroup.Item>
                    <ListGroup.Item>Position type: { positionType }</ListGroup.Item>
                    <ListGroup.Item>Medical: { medical }</ListGroup.Item>
                    <ListGroup.Item>Vacation days: { pto }</ListGroup.Item>
                    <ListGroup.Item>Sick leave: { sickLeave }</ListGroup.Item>
                    <ListGroup.Item>Bonus: ${ bonus }</ListGroup.Item>
                </ListGroup>
            </Card>
        </li>
    )
}

export default OfferItem