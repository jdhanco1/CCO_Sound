import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';
import { HiPlay } from 'react-icons/hi';

export default function SermonCard({ title, speaker, date, videoUrl, audioUrl, thumbnail, series }) {
  const { t } = useTranslation();
  const thumbSrc = thumbnail?.url || null;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl">
      <div className="relative aspect-video overflow-hidden bg-brand-dark">
        {videoUrl ? (
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            light={thumbSrc || true}
            playIcon={
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/90 text-white shadow-lg">
                <HiPlay size={32} />
              </div>
            }
            controls
          />
        ) : thumbSrc ? (
          <img src={thumbSrc} alt={title} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-white/30">
            <HiPlay size={48} />
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs font-medium text-gray-400">{formattedDate}</p>
        <h3 className="mt-1 font-serif text-lg font-bold text-brand-dark">{title}</h3>
        {speaker && <p className="text-sm text-accent">{speaker}</p>}
        {series && <p className="mt-1 text-xs text-gray-500">Series: {series}</p>}
        {audioUrl && (
          <audio controls className="mt-3 w-full" preload="none">
            <source src={audioUrl} />
          </audio>
        )}
      </div>
    </div>
  );
}
