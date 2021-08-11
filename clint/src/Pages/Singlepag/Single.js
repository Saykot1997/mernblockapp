import Sidebar from '../../components/Sidebar/Sidebar'
import Singlepost from './Singlepost'
import { Singlecontainer,SidebarWraper,SinglePostWraper} from "./Single.style"

function Single() {
    return (
        <Singlecontainer> 
            <SinglePostWraper>
                <Singlepost />
            </SinglePostWraper>
            <SidebarWraper>
                <Sidebar />  
            </SidebarWraper> 
        </Singlecontainer>
    )
}

export default Single
