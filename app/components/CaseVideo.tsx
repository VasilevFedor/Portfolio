import ViewportVideo from "./ViewportVideo";
import videos from "../case-videos.json";

export default function CaseVideo({ src, ...props }: { src: string; className?: string; eager?: boolean }) {
  const asset = (videos as Record<string, { src: string; poster: string }>)[src];
  return <ViewportVideo {...props} src={asset?.src ?? src} poster={asset?.poster} />;
}
