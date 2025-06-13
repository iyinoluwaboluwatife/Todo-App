import { Link } from "react-router-dom";
import {FaExclamationTriangle} from 'react-icons/fa';

function TestErrorPage() {
    
    return(
        <>
        <section className="errorpage">
            <section className="error">
                <FaExclamationTriangle className="errortriangle"></FaExclamationTriangle>
                <h2>Oops!</h2>
                <p>Page not found</p>
                <Link to='/'>Go back</Link>
            </section>
        </section>
        
        </>
    )
}



export default TestErrorPage()