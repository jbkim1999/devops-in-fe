import styles from './box.module.css';

export default function MessageBox({ text }) {
    return (
        <div className={[styles.box].join(' ')}>
            <p className={styles.text}> {text} </p>
        </div>
    )
}
