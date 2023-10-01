import styles from './box-container.module.css';

export default function BoxContainer(props) {
    return (
        <div className={styles.container}>
            <h2> {props.title} </h2>
            {props.children}
        </div>
    )
}
