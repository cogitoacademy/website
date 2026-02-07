import { defineField, defineType } from "sanity";

export default defineType({
	name: "event",
	title: "Event (Kegiatan)",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "internationalizedArrayString",
			validation: (Rule: any) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: (doc: any) => {
					const titleArray = doc.title as
						| Array<{ _key: string; value: string }>
						| undefined;
					const idTitle = titleArray?.find((item) => item._key === "id");
					return idTitle?.value || titleArray?.[0]?.value || "";
				},
				maxLength: 96,
			},
			validation: (Rule: any) => Rule.required(),
		}),
		defineField({
			name: "category",
			title: "Category",
			type: "string",
			options: {
				list: [
					{ title: "Monthly Townhall", value: "monthly-townhall" },
					{
						title: "Cogito 101 Series",
						value: "cogito-101-series",
					},
				],
			},
			validation: (Rule: any) => Rule.required(),
		}),
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "description",
			title: "Description",
			description: "Short description for card previews",
			type: "internationalizedArrayString",
		}),
		defineField({
			name: "date",
			title: "Date",
			description: "Event date and time",
			type: "datetime",
			validation: (Rule: any) => Rule.required(),
		}),
		defineField({
			name: "time",
			title: "Time",
			description: 'Display time string, e.g. "19:00 - 21:00 WIB"',
			type: "string",
		}),
		defineField({
			name: "place",
			title: "Place",
			description: 'e.g. "Online via Zoom", "Aula Gedung A"',
			type: "internationalizedArrayString",
		}),
		defineField({
			name: "summary",
			title: "Summary",
			description: "Longer description / rangkuman of the event",
			type: "internationalizedArrayText",
		}),
		defineField({
			name: "registrationLink",
			title: "Registration Link",
			type: "url",
		}),
	],
	orderings: [
		{
			title: "Date (Newest First)",
			name: "dateDesc",
			by: [{ field: "date", direction: "desc" }],
		},
		{
			title: "Date (Oldest First)",
			name: "dateAsc",
			by: [{ field: "date", direction: "asc" }],
		},
	],
	preview: {
		select: {
			title: "title",
			category: "category",
			date: "date",
			media: "image",
		},
		prepare(selection: any) {
			const { title, category, date, media } = selection;
			const titleValue = title
				? title.find((item: any) => item._key === "id")?.value ||
					title[0]?.value
				: "Untitled";
			const dateStr = date
				? new Date(date).toLocaleDateString("id-ID", {
						year: "numeric",
						month: "short",
						day: "numeric",
					})
				: "";
			const categoryLabel =
				category === "monthly-townhall"
					? "Monthly Townhall"
					: category === "cogito-101-series"
						? "Cogito 101 Series"
						: category;

			return {
				title: titleValue,
				subtitle: `${categoryLabel} — ${dateStr}`,
				media,
			};
		},
	},
});
