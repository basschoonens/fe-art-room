import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.contactSocials}>
                    <h4>Socials</h4>
                    <ul>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>Twitter</li>
                    </ul>
                </div>
                <div className={styles.disclaimer}>
                    <h3>Copyright B. Schoonens - May 2024</h3>
                </div>
                <div className={styles.contactAdress}>
                    <h4>Contact</h4>
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