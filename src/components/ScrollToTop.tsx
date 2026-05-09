import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      data-visible={visible}
      className="
        fixed bottom-6 right-6 z-40
        flex h-10 w-10 items-center justify-center
        rounded-full
        bg-white text-slate-900
        shadow-lg
        transition-all duration-300
        opacity-0 translate-y-2 pointer-events-none
        data-[visible=true]:opacity-100
        data-[visible=true]:translate-y-0
        data-[visible=true]:pointer-events-auto
        focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:outline-none
      "
      style={{ animation: 'bounce-25 2s infinite' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
