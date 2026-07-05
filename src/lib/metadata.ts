import { Metadata } from "next";

type MetadataInput = {
  title: string;
  description: string;
};

export function buildMetadata({ title, description }: MetadataInput): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}
