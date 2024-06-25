import styles from './Footer.module.css';
import React from 'react';
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa';


const Footer = () => {
    return (
        <footer>
            <div className={styles.footer}>
                <ul className={styles.socialLinks}>
                    <li><a href="https://facebook.com"><FaFacebook className={styles.icon}/></a></li>
                    <li><a href="https://instagram.com"><FaInstagram className={styles.icon}/></a></li>
                    <li><a href="https://twitter.com"><FaTwitter className={styles.icon}/></a></li>
                </ul>
                <div className={styles.disclaimer}>
                    <h3>Copyright B. Schoonens - May 2024</h3>
                </div>
                <ul className={styles.contactInfo}>
                    <li className={styles.contact}>The ArtRoom</li>
                    <li className={styles.contact}>035-12345678</li>
                    <li className={styles.contact}>theartroomfake@fake-email.com</li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;