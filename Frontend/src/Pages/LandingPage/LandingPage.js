import React from "react";
import styles from "./LandingPage.module.css";
import "../../Styles/Global.module.css";
import logo from "../../Assets/Png/RedDragon.png";

const LandingPage = () => {
  return (
    <main className={styles.landingPage}>
      <div className={styles.heroSection}>
        <div className={styles.heroText}>
          <h3 className={styles.text}>Hey It's Me</h3>
          <h1 className={styles.text}>
            {" "}
            Rohit
            <span> /@rohitsalooria</span>
          </h1>
        </div>
        <img src={logo} alt="logo" className={styles.logo} />
      </div>
      <section className={styles.aboutSection}>
        <p className={styles.text}>
          Yup! I'm a Design Engineer. Big deal, right? But wait — there's more!
          I'm not just any developer, I'm a Full Stack Developer. And if that
          wasn't enough, guess what? maybe Freelancer? Oh yeah, I've got that
          badge too!
        </p>
        <p className={styles.text}>
          I love both Design & Development. so, That means I can create
          beautiful and functional websites. I'm always looking for new
          opportunities to learn and grow.
        </p>
      </section>
    </main>
  );
};

export default LandingPage;
