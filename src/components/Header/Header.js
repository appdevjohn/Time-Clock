import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import cogImage from '../../assets/cogs.svg';
import closeImage from '../../assets/close.svg';
import classes from './Header.module.css';

const Header = props => {
    return (
        <Fragment>
            <header className={classes.Header}>
                <div className={classes.headerName}>{props.name}</div>
                <div className={classes.headerSettings}>
                    {
                        props.settings ?
                            <Link to="/settings"><img src={cogImage} alt="Settings" /></Link> :
                            <Link to="/"><img src={closeImage} alt="Time Clock" /></Link>
                    }
                </div>
            </header>
            <div className={classes.headerHeight}></div>
        </Fragment>
    )
}

export default Header;