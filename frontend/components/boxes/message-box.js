import styles from './box.module.css';

export default function MessageBox({ text }) {
    return (
        <div className={[styles.box, styles.msgbox].join(' ')}>
            <p className={styles.text}> {text} </p>
        </div>
    )
}
