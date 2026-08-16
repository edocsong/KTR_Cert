export default function CaseStudyModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute -top-10 right-0 text-2xl text-white"
        >
          ✕
        </button>
        <video
          src="/examples.mp4"
          autoPlay
          muted
          playsInline
          controls
          onEnded={onClose}
          className="w-full rounded-lg"
        />
      </div>
    </div>
  );
}
