import NotFound from "../not-found";

export function generateStaticParams() {
	return [{ locale: "en" }, { locale: "id" }];
}

export default function CatchAllPage() {
	return <NotFound />;
}
