import styles from './About.module.css';
import Button from "../../components/button/Button.jsx";
import welcome from '../../assets/about-page/welcome-image.jpg';
import user from '../../assets/about-page/user-image.jpg';
import artist from '../../assets/about-page/artist-image.jpg';

export default function About() {
    return (
        <div className={styles.pageContainer}>
            <section className={styles.galleryInfoContainer}>
                {/*TODO add notations like STRONG etc in this and/or other pages*/}
                <h1>About Us</h1>
                <div className={styles.welcomeContainer}>
                    <h2>Welcome to The Art Room</h2>
                    <div className={styles.welcomeContainerContents}>
                        <p>
                            Step into The Art Room, a haven for art enthusiasts nestled in the cultural heart of
                            Hilversum,
                            The Netherlands. Our online platform serves as a gateway to the rich tapestry of artistic
                            expression found within our physical gallery walls. Whether you are a seasoned collector or
                            a budding aficionado, prepare to embark on a journey of discovery and inspiration.
                        </p>
                        <span><img src={welcome} alt="welcome-image"/></span>
                    </div>
                </div>
                <div className={styles.userContainer}>
                    <h2>Discover and Engage</h2>
                    <div className={styles.userContainerContents}>
                        <span>
                            <img src={user} alt="user-image"/>
                        </span>
                        <p>
                            Embark on a visual odyssey through our carefully curated collection of artworks, each one
                            a testament to the boundless creativity of the human spirit. From bold abstracts to
                            intricate portraits, our gallery showcases a diverse array of styles and techniques,
                            ensuring there's something to captivate every eye. Dive deeper into the world of art by
                            registering on our platform, where you can engage with fellow art lovers, share your
                            insights, and embark on meaningful discussions that celebrate the power of artistic
                            expression.
                        </p>
                    </div>
                </div>
                <div className={styles.artistContainer}>
                    <h2>Showcase Your Talent</h2>
                    <div className={styles.artistContainerContents}>
                        <p>
                            Calling all artists! The Art Room invites you to shine a spotlight on your talent and
                            share your vision with the world. Our platform offers a dynamic space for artists of all
                            backgrounds to showcase their work, connect with a global audience, and take their
                            careers to new heights. Upload your latest masterpieces, craft a compelling profile, and
                            unlock opportunities for collaboration and recognition. Need guidance on navigating the
                            art world? Reach out to our dedicated curator, Mr. John Doe, who stands ready to offer
                            personalized support and guidance tailored to your unique artistic journey.

                            Feel free to embellish each section with imagery that reflects the essence of The Art
                            Room and complements the text, creating an immersive experience for visitors to your
                            gallery's website.
                        </p>
                        <span>
                            <img src={artist} alt="artist-image"/>
                        </span>
                    </div>
                </div>
            </section>
            <section className={styles.galleryContactContainer}>
                <div className={styles.contactContainerContents}>
                    <h2>Get in Touch</h2>
                    <p>
                        Have a question about our gallery or looking for assistance with your artistic endeavors?
                        Don't hesitate to get in touch with our dedicated curator, Mr. John Doe. Whether you're an
                        artist seeking guidance on showcasing your work or an art enthusiast eager to learn more
                        about our exhibitions, Mr. Doe is here to help.

                        To reach out to Mr. John Doe, please fill out the form below with your name, email address,
                        and message. He'll get back to you as soon as possible to provide the assistance you need.
                        Thank you for your interest in The Art Room!
                    </p>
                    <a href="mailto:">Contact the gallery</a>
                </div>
            </section>
        </div>
    )
}