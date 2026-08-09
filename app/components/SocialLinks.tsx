import { social } from "../data";

/**
 * Row of 24px social icons (LinkedIn, X, Email) for the page footer. Icons use
 * `currentColor`, so the link colour (muted → foreground on hover) drives them.
 */
export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href={social.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="text-muted transition-colors duration-200 hover:text-foreground"
      >
        <LinkedInIcon />
      </a>
      <a
        href={social.x}
        target="_blank"
        rel="noreferrer"
        aria-label="X"
        className="text-muted transition-colors duration-200 hover:text-foreground"
      >
        <XIcon />
      </a>
      <a
        href={social.email}
        aria-label="Email"
        className="text-muted transition-colors duration-200 hover:text-foreground"
      >
        <EmailIcon />
      </a>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="currentColor"
      className="block"
      aria-hidden="true"
    >
      <path d="M44.4469 0H3.54375C1.58437 0 0 1.54688 0 3.45938V44.5312C0 46.4437 1.58437 48 3.54375 48H44.4469C46.4063 48 48 46.4438 48 44.5406V3.45938C48 1.54688 46.4063 0 44.4469 0ZM14.2406 40.9031H7.11563V17.9906H14.2406V40.9031ZM10.6781 14.8688C8.39063 14.8688 6.54375 13.0219 6.54375 10.7437C6.54375 8.46562 8.39063 6.61875 10.6781 6.61875C12.9563 6.61875 14.8031 8.46562 14.8031 10.7437C14.8031 13.0125 12.9563 14.8688 10.6781 14.8688ZM40.9031 40.9031H33.7875V29.7656C33.7875 27.1125 33.7406 23.6906 30.0844 23.6906C26.3812 23.6906 25.8187 26.5875 25.8187 29.5781V40.9031H18.7125V17.9906H25.5375V21.1219H25.6312C26.5781 19.3219 28.9031 17.4188 32.3625 17.4188C39.5719 17.4188 40.9031 22.1625 40.9031 28.3313V40.9031V40.9031Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="currentColor"
      className="block"
      aria-hidden="true"
    >
      <path d="M36.6526 3.80859H43.3995L28.6594 20.6556L46 43.5805H32.4225L21.7881 29.6767L9.61989 43.5805H2.86886L18.6349 25.5608L2 3.80859H15.9222L25.5348 16.5173L36.6526 3.80859ZM34.2846 39.5422H38.0232L13.8908 7.63486H9.87892L34.2846 39.5422Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="currentColor"
      className="block"
      aria-hidden="true"
    >
      <path d="M47.5391 19.5474H24.5113V28.7747H37.7431C37.5304 30.0805 37.0528 31.3652 36.3534 32.5366C35.552 33.8786 34.5613 34.9004 33.5459 35.6785C30.5042 38.0093 26.958 38.4859 24.4952 38.4859C18.2738 38.4859 12.9581 34.4649 10.9002 29.0011C10.8172 28.8029 10.762 28.5981 10.6949 28.3956C10.2401 27.005 9.99169 25.5323 9.99169 24.0015C9.99169 22.4084 10.2607 20.8835 10.7513 19.4432C12.6864 13.7628 18.122 9.52012 24.4997 9.52012C25.7824 9.52012 27.0178 9.67282 28.1892 9.97738C30.8665 10.6734 32.7603 12.0442 33.9207 13.1286L40.9225 6.27151C36.6634 2.36633 31.1111 0 24.488 0C19.1933 -0.000113959 14.305 1.64956 10.2992 4.43757C7.05062 6.69857 4.38633 9.72576 2.58825 13.2415C0.915782 16.5013 0 20.1138 0 23.9979C0 27.8822 0.917181 31.5322 2.58966 34.7619V34.7837C4.3562 38.2124 6.93949 41.1646 10.0792 43.4152C12.8221 45.3814 17.7403 48 24.488 48C28.3684 48 31.8075 47.3004 34.8405 45.9893C37.0285 45.0435 38.9671 43.8098 40.7222 42.2244C43.0413 40.1294 44.8575 37.5382 46.0972 34.557C47.3369 31.5757 48 28.2044 48 24.5493C48 22.8471 47.829 21.1184 47.5391 19.5473V19.5474Z" />
    </svg>
  );
}
