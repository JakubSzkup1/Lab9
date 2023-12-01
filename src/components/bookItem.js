import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function BookItem(props) {

    return (
        <div>
            <Card>
                <Card.Header>{props.myBook.title}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <img src={props.myBook.cover}></img>
                        <footer>
                            {props.myBook.author
                            }
                        </footer>
                    </blockquote>
                </Card.Body>
                <Link to={'/edit/' + props.myBook._id} className='btn btn-primary'>Edit</Link>
                <Button variant='danger' onClick={
                    (e) => {
                        axios.delete('http://localhost:4000/api/book/' + props.myBook._id) //use axios to delete
                            .then((res)=>{
                                let reload = props.reload();

                            }) //when response comes back refresh the page
                            .catch();
                    } 
                }>Delete</Button>

            </Card>
            {/* <h3>{props.myBook.title}</h3>
            <img src={props.myBook.thumbnailUrl}></img>
            <p>{props.myBook.authors[0]}</p> */}
        </div>
    );

}

export default BookItem;