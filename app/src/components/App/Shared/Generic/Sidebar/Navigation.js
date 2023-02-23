import { MainNav, SubNav } from "../../../../../core/constants/SidebarNav";
import SidebarNav from "../../../../Design/Nav/SidebarNav";

const Navigation = () => {
    return (
    <div id='sidebar-components'>
        <SidebarNav items={MainNav} >
            <SidebarNav items={SubNav} />
        </SidebarNav>
    </div>
    )
}

export default Navigation;