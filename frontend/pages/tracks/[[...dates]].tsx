import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { format, isAfter, parseISO } from "date-fns";
import { SWRConfig } from "swr";

import { TODAY_ISO } from "../../constants/dates";
import { ITrackResponse } from "../../constants/tracks";
import TracksScreen from "../../components/TracksScreen/TracksScreen";
import { ActiveDate } from "../../contexts/activeDate";

interface ITracksPageProps {
  dateISO: string;
  fallback: {
    [key: string]: ITrackResponse;
  };
}

const TracksPage: NextPage<ITracksPageProps> = ({ dateISO, fallback }) => {
  const date = parseISO(dateISO);
  return (
    <ActiveDate.Provider value={date}>
      <SWRConfig value={{ fallback }}>
        <TracksScreen />
      </SWRConfig>
    </ActiveDate.Provider>
  );
};

export default TracksPage;

// Dates in past of build date handled by pages/tracks/[date].tsx
// Only dates with dynamic data (today and future) handled here
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { dates: [TODAY_ISO] } }, { params: { dates: [] } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ITracksPageProps> = async ({
  params,
}) => {
  const todayDate = parseISO(format(new Date(), "yyyy-LL-dd"));

  // If no date params '/' use TODAY_ISO
  const dateParams = params?.dates ? (params?.dates as string[]) : [TODAY_ISO];

  // Will be 'Invalid Date' if malformed ISO provided
  const date = parseISO(dateParams[0]) as string | Date;

  // Return 404 if not tracks/:date
  // Return 404 if ISO string malformed
  // No revalidation as always want to return 404
  if (
    dateParams.length !== 1 ||
    date == "Invalid Date" ||
    typeof date === "string"
  ) {
    return {
      notFound: true,
      revalidate: false,
    };
  }

  // Future dates should return 404
  // But soon future dates will be 'today' / 'past'
  // so should revalidate
  if (isAfter(date, todayDate)) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  const apiDateQuery = format(date, "dd/LL/yyyy");
  const apiRoute = `${process.env.NEXT_PUBLIC_API_SERVICE_URL}/archive/${apiDateQuery}`;
  const res = await fetch(apiRoute);
  const data = (await res.json()) as ITrackResponse;

  return {
    props: {
      fallback: {
        [apiRoute]: data,
      },
      dateISO: dateParams[0],
    },
    revalidate: 60,
  };
};
