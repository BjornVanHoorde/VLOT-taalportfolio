import { Link } from 'react-router-dom';

const SidebarNav = ({ items = [], children}) => {
    return (
        <nav>
            {
            items &&
                items.map((item) => {
                    <li>
                        <Link 
                        to={item.href}
                        >
                        {item.label}
                        </Link>
                    </li>
                })
            }
            {children}
        </nav>
    )
}

export default SidebarNav;