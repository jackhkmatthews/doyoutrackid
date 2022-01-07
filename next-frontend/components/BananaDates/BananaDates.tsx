import { format } from "date-fns";
import Link from "next/link";

import DateBanana from "../DateBanana/DateBanana";
import { ROUTE, ROUTES } from "../../constants/routes";

import styles from "./BananaDates.module.scss";

const ROTATION_DEGS = [285, 315, 360, 15];

interface IBananaDatesProps {
  dates: Date[];
  className?: string;
}

const BananaDates = ({ dates, className }: IBananaDatesProps) => {
  const rootStyles = [styles.root];
  if (className) rootStyles.push(className);
  if (!dates.length) rootStyles.push(styles.empty);

  return (
    <ul className={rootStyles.join(" ")}>
      {!dates.length && (
        <li className={styles.listItem}>
          <p className={styles.empty}>
            :(
            <br />
            There&apos;s nothing here
          </p>
        </li>
      )}
      {!!dates.length &&
        dates.map((date) => (
          <li
            key={format(date, "dd-LL-yyyy")}
            className={styles.listItem}
            style={
              {
                "--rotation":
                  ROTATION_DEGS[
                    Math.floor(Math.random() * ROTATION_DEGS.length)
                  ] + "deg",
              } as React.CSSProperties
            }
          >
            <Link
              href={{
                ...ROUTES.get(ROUTE.tracks)?.url,
                query: { date: format(date, "yyyy-LL-dd") },
              }}
              passHref
            >
              <a className={styles.link}>
                <DateBanana
                  date={format(date, "dd/LL/yyyy")}
                  day={format(date, "EEE")}
                />
              </a>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default BananaDates;
