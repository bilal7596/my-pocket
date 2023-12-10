import ButtonWithImg from '../../Common/ButtonWithImg';
import ButtonWithSvg from '../../Common/ButtonWithSvg';
import Logo from './Logo';
import '../../Styles/Header.css';
import Links from './Links';
import Actions from './Actions';
import Account from './Account';
import Search from './Search';
import Add from './Add';
import Edit from './Edit';
import { Fragment, useState } from 'react';
import { add, edit, search } from '../../Utilities/Constants';
import { Outlet } from 'react-router';

const Header = () => {

    const [actionType, setActionType] = useState(null)
    
    return <header className='header'>
        <div className='global-nav-container'>
            <nav>
                <Logo />
                { !actionType  && <Fragment>
                    <Links />
                    <Actions onOpen={ (type) => setActionType(type) } />
                    <Account />
                </Fragment> }

                { actionType === search && <Search onClose={ () => setActionType(null) } /> }
                { actionType === add && <Add onClose={ () => setActionType(null) }/> }
                { actionType === edit && <Edit onClose={ () => setActionType(null) } /> }
            </nav>
        </div>
    </header>
}

export default Header;