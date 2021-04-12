import classes from './Button.module.css';

const Button = props => {
    let className = classes.Button;
    if (props.big) {
        className = [classes.Button, classes.big].join(' ');
    }

    return (
        <button className={className} onClick={props.onClick}>{props.title}</button>
    )
}

export default Button;