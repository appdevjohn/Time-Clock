import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import cogImage from '../../assets/cogs.svg';
import cogWhiteImage from '../../assets/cogs-white.svg';
import closeImage from '../../assets/close.svg';
import closeWhiteImage from '../../assets/close-white.svg';
import classes from './Header.module.css';

const Header = props => {

    const settingsLink = (
        <Link to="/settings">
            <picture>
                <source srcSet={cogWhiteImage} media="(prefers-color-scheme: dark)" />
                <img src={cogImage} alt="Settings" />
            </picture>
        </Link>
    );

    const closeLink = (
        <Link to="/">
            <picture>
                <source srcSet={closeWhiteImage} media="(prefers-color-scheme: dark)" />
                <img src={closeImage} alt="Time Clock" />
            </picture>
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