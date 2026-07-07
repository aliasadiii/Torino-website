import { notFound } from "next/navigation";

import TourDetailPage from "@/components/templates/TourDetailPage";
import ServerError from "@/components/modules/ServerError";

import { getTourDetails } from "@/services/tour";

async function page({ params }) {
  const { tourId } = await params;
  const { data: tour, error } = await getTourDetails(tourId);

  if (error === 404 || (tour === null && error === null)) {
    return notFound();
  }

  if (error === "CONNECTION_ERROR" || error === 500) {
    return <ServerError />;
  }

  return <TourDetailPage tour={tour} />;
}

export default page;
