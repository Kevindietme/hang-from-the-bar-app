import {Link} from 'react-router-dom'

export default function NavMenu (){
    return(
    <div className="nav-menu">
        <nav>
            <ul>
                <li> <Link to ="/">Home link Go BACK</Link></li>
                
            </ul>
        </nav>
    </div>
        )
    }