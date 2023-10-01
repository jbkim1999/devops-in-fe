import styles from './box.module.css';

export default function ButtonBox({ text, onClick }) {
    return (
        <div className={[styles.box, styles.btnbox].join(' ')} onClick={onClick}>
            <p className={styles.text}> {text} </p>
        </div>
    )
}
