import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { Api } from '../../skds/api';


const AccountPage: React.FC = () => {


    const api = new Api('closed')
    api.getLoggedUser().then((user: any) =>  {
        if (!user) {
            document.location.href = '/login'
        }
    })
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default AccountPage;
