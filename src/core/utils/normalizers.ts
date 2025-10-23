import { EpisodeProps } from "@/features/catalog/domain/entities/Episode";
import { PodcastProps } from "@/features/catalog/domain/entities/Podcast";

export function toCatalogDTO(p: any) {
  if (p && typeof p.toJSON === "function") return p.toJSON();
  if (p && p.id && p.title && p.author && p.image) {
    return {
      id: String(p.id),
      title: String(p.title),
      author: String(p.author),
      image: String(p.image),
    };
  }
  return null;
}

export function toPodcastDTO(p: any) {
  if (p && typeof p.toJSON === "function") return p.toJSON();
  if (p && p.id && p.title && p.author && p.image) return p as PodcastProps;
  return null;
}
export function toEpisodeDTO(e: any) {
  if (e && typeof e.toJSON === "function") return e.toJSON();
  if (e && e.id && e.podcastId && e.title && e.publishDateISO)
    return e as EpisodeProps;
  return null;
}
