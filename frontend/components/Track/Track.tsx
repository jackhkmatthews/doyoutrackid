import Image from "next/image";

import styles from "./Track.module.scss";

interface ITrackProps {
  album: string;
  artist: string;
  className?: string;
  label: string;
  listenHref: string;
  releaseDate: string;
  time: string;
  title: string;
}

const Track = ({
  album,
  artist,
  className,
  label,
  listenHref,
  releaseDate,
  time,
  title,
}: ITrackProps) => {
  const rootStyles = [styles.root];
  if (className) rootStyles.push(className);
  return (
    <div className={rootStyles.join(" ")}>
      <p className={styles.time}>{time}</p>
      <h3 className={styles.title}>{title}</h3>
      <h4 className={styles.artist}>{artist}</h4>
      <p className={styles.album}>
        Album: <span className={styles.value}>{album}</span>
      </p>
      <p className={styles.label}>
        Label: <span className={styles.value}>{label}</span>
      </p>
      <p className={styles.releaseDate}>
        Release date: <span className={styles.value}>{releaseDate}</span>
      </p>
      <a
        href={listenHref}
        target="_blank"
        rel="noreferrer"
        className={styles.sticker}
      >
        <Image
          className={styles.stickerImg}
          src="v1640336995/doyoutrackid/sticker_listen_now_iqgl4g.png"
          height="81"
          width="100"
          alt="Banana sticker"
        />
        <span className={styles.linkText}>Listen</span>
      </a>
    </div>
  );
};

export default Track;