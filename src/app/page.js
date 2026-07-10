import HomePage from "@/components/templates/HomePage";

export const metadata = {
  title: "صفحه اصلی",
  description: "مشاهده تورها و شروع رزرو سفر در Torino",
};

export default function Home({ searchParams }) {
  return <HomePage searchParams={searchParams} />;
}
