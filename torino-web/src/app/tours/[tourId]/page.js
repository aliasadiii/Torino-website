import { notFound } from "next/navigation";

import TourDetailPage from "@/components/templates/TourDetailPage";
import ServerError from "@/components/modules/ServerError";

import { getTourDetails } from "@/services/tour";

export async function generateMetadata({ params }) {
  const { tourId } = await params;
  const { data: tour } = await getTourDetails(tourId);

  if (!tour) {
    return {
      title: "تور یافت نشد | Torino",
    };
  }

  return {
    title: tour.title ,
    description:
      tour.description?.slice(0, 160) || `جزئیات و رزرو ${tour.title}`,
    openGraph: {
      title: tour.title,
      description: tour.description?.slice(0, 160),
      images: tour.image ? [tour.image] : [],
    },
  };
}

async function page({ params }) {
  const { tourId } = await params;
  const { data: tour, error } = await getTourDetails(tourId);

  if (error === 404 || (tour === null && error === null)) {
    notFound();
  }

  if (error === "CONNECTION_ERROR" || error === 500) {
    return <ServerError />;
  }

  return <TourDetailPage tour={tour} />;
}

export default page;
