import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.contactSocials}>
                    <h3>Socials</h3>
                    <ul>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>Twitter</li>
                    </ul>
                </div>
                <div className={styles.disclaimer}>
                    <h2>Copyright B. Schoonens - May 2024</h2>
                </div>
                <div className={styles.contactAdress}>
                    <h3>Contact</h3>
                    <ul>
                        <li>NAW Gegevens</li>
                        <li>Telefoon</li>
                        <li>Mail</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}