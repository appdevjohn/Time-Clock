import classes from './Table.module.css';

const Table = props => {
    if (props.hideIfNoRecords && props.records.length === 0) {
        return null;
    }

    const rows = props.records.map(r => {
        return (
            <tr key={ r.id || Math.random() }>
                <td className={classes.left}>{r.key}</td>
                <td className={classes.right}>{r.value}</td>
            </tr>
        )
    });

    return (
        <table className={classes.Table}>
            <tbody>
                <tr>
                    <th className={classes.title}>{props.title}</th>
                </tr>
                {rows}
            </tbody>
        </table>
    );
}

export default Table;