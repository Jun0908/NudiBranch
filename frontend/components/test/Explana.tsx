import React from "react";
import Link from 'next/link';

const Explana: React.FC = () => {

  const styles = {
    content: {
      backgroundColor: '#ffffff',
      color: '#333',
      fontFamily: 'Arial, sans-serif',
    },
    section: {
      marginBottom: '20px',
      padding: '15px',
    },
    sectionHeader: {
      fontSize: '1.5em',
      color: '#0056b3',
      marginBottom: '10px',
    },
    paragraph: {
      fontSize: '1em',
      lineHeight: '1.6',
    },
    link: {
      color: '#007bff',
      textDecoration: 'underline',
      fontWeight: 'bold',
    }
  };

  return (
    <div style={styles.content}>
      <section style={styles.section} id="garalley">
        <h2 style={styles.sectionHeader}>Garalley</h2>
        <p style={styles.paragraph}>You can view the sets of images and music you have created so far in 3D.</p>
        <a href="https://3d-image-to-music.vercel.app/" style={styles.link}>Go to Garalley</a>
      </section>

      <section style={styles.section} id="uploadipfs">
        <h2 style={styles.sectionHeader}>UploadIpfs</h2>
        <p style={styles.paragraph}>You can upload images and music to IPFS and obtain a CID (Content Identifier).</p>
        <Link href="UploadIpfs" legacyBehavior>
          <a style={styles.link}>Upload to IPFS</a>
        </Link>
      </section>

      <section style={styles.section} id="musicgen">
        <h2 style={styles.sectionHeader}>MusicGen</h2>
        <p style={styles.paragraph}>Conversion from text to image and from image to music is possible.</p>
        <Link href="MusicGen" legacyBehavior>
          <a style={styles.link}>MusicGen</a>
        </Link>
      </section>

      <section style={styles.section} id="musicmint">
        <h2 style={styles.sectionHeader}>MusicMint</h2>
        <p style={styles.paragraph}>You can use the Music Converter API to convert music into a string format, which can then be minted on-chain.</p>
        <Link href="Mint" legacyBehavior>
          <a style={styles.link}>MusicMint</a>
        </Link>
      </section>
    </div>
  );
}

export default Explana;
