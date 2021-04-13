import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import cogImage from '../../assets/cogs.svg';
import closeImage from '../../assets/close.svg';
import classes from './Header.module.css';

const Header = props => {

    const settingsLink = (
        <Link to="/settings" className={classes.link}>
            <img src={cogImage} alt="Settings" className={classes.linkImage} />
        </Link>
    );

    const closeLink = (
        <Link to="/" className={classes.link}>
            <img src={closeImage} alt="Time Clock" className={classes.linkImage} />
        </Link>
    );

    return (
        <Fragment>
            <header className={classes.Header}>
                <div className={classes.headerName}>{props.name}</div>
                <div className={classes.headerSettings}>
                    {props.settings ? settingsLink : closeLink}
                </div>
            </header>
            <div className={classes.headerHeight}></div>
        </Fragment>
    )
}

export default Header;