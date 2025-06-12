import {NavLink} from 'react-router-dom';

function NavSection() {
    let navClass = ({isActive}) => (
        isActive ? 'home-nav' : 'nav-links'
    )
    
    return(
        <nav>
            <section className="logo-container">
                <span>ToDo</span>
            </section>
            <section className="nav-links">
                <NavLink to="/" className={navClass}>Home</NavLink>
                <NavLink to="/add-task" className={navClass}>Add Tasks</NavLink>
            </section>
        </nav>
    )
}
export default NavSection