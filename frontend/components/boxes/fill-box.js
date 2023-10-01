import styles from './box.module.css';

export default function FillBox({ color, utilization }) {

    const dynamicStyle = {
        'border-color': color,
        'background': `linear-gradient(to top, ${color} ${utilization * 100}%, transparent 0%)`
    };

    return (
        <div className={[styles.box].join(' ')} style={dynamicStyle}>
            <p className={styles.text}> {utilization} </p>
        </div>
    )
}
