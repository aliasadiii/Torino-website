async function getTourDetails(tourId) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const res = await fetch(`${BASE_URL}tour/${tourId}`, {
      next: { revalidate: 300 },
    });

    if (res.status === 404) return { data: null, error: 404 };
    if (!res.ok) return { data: null, error: 500 };

    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: "CONNECTION_ERROR" };
  }
}

export { getTourDetails };
