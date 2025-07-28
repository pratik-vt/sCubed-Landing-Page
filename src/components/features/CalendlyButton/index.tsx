import React, { FC, useState, useEffect } from 'react';
import { PopupModal } from 'react-calendly';

type Props = {
  buttonText?: string;
  className?: string;
};

const CalendlyButton: FC<Props> = ({
  buttonText = 'Schedule Free Demo →',
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  // Fix for Gatsby SSR
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Lazy load Calendly only when button is clicked
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCalendlyLoaded(true);
  };

  // Get the Calendly URL from env vars
  const calendlyUrl = process.env.GATSBY_CALENDLY_URL;

  // Ensure we have a valid URL
  if (!calendlyUrl) {
    console.warn('Calendly URL is not set in environment variables');
  }

  // Get the root element safely
  const getRootElement = () => {
    if (typeof document !== 'undefined') {
      return document.getElementById('___gatsby') || document.body;
    }
    return null;
  };

  return (
    <>
      <button className={className} onClick={handleOpenModal}>
        {buttonText}
      </button>

      {/* Only render the PopupModal if we're on the client and the button has been clicked */}
      {isClient && calendlyLoaded && (
        <PopupModal
          url={calendlyUrl!}
          rootElement={getRootElement() as HTMLElement}
          onModalClose={() => setIsModalOpen(false)}
          open={isModalOpen}
          prefill={{}}
        />
      )}
    </>
  );
};

export default CalendlyButton;
