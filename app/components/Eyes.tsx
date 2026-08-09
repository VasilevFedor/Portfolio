/**
 * Little pair of eyes next to the local time. The pupils glance left/right and
 * the eyes blink now and then — pure CSS animation (see globals.css `.eyes-*`),
 * paused for reduced-motion. Colour comes from the parent via `currentColor`.
 */
export default function Eyes() {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-5 shrink-0 text-muted"
    >
      <svg viewBox="0 0 20 20" fill="none" className="size-full">
        {/* Clip each eye's pupils to its own outline so they never poke out as
            they glance. Clips sit above the pupil transform, so the pupils
            slide under a fixed eye-shaped mask. */}
        <defs>
          <clipPath id="eyeClipL">
            <path d="M6.25 3.125C7.21551 3.125 8.19127 3.76784 8.95801 5.02246C9.7182 6.2664 10.209 8.02477 10.209 10C10.209 11.9752 9.7182 13.7336 8.95801 14.9775C8.19127 16.2322 7.21551 16.875 6.25 16.875C5.28463 16.8749 4.30961 16.2319 3.54297 14.9775C2.78278 13.7336 2.29199 11.9752 2.29199 10C2.29199 8.02477 2.78278 6.2664 3.54297 5.02246C4.30961 3.76807 5.28463 3.12514 6.25 3.125Z" />
          </clipPath>
          <clipPath id="eyeClipR">
            <path d="M13.75 3.125C14.7155 3.125 15.6913 3.76784 16.458 5.02246C17.2182 6.2664 17.709 8.02477 17.709 10C17.709 11.9752 17.2182 13.7336 16.458 14.9775C15.6913 16.2322 14.7155 16.875 13.75 16.875C12.7846 16.8749 11.8096 16.2319 11.043 14.9775C10.2828 13.7336 9.79199 11.9752 9.79199 10C9.79199 8.02477 10.2828 6.2664 11.043 5.02246C11.8096 3.76807 12.7846 3.12514 13.75 3.125Z" />
          </clipPath>
        </defs>
        {/* scaleY on this group squashes the whole pair → reads as a blink */}
        <g className="eyes-blink">
          {/* eye outlines */}
          <path
            d="M6.25 3.125C7.21551 3.125 8.19127 3.76784 8.95801 5.02246C9.7182 6.2664 10.209 8.02477 10.209 10C10.209 11.9752 9.7182 13.7336 8.95801 14.9775C8.19127 16.2322 7.21551 16.875 6.25 16.875C5.28463 16.8749 4.30961 16.2319 3.54297 14.9775C2.78278 13.7336 2.29199 11.9752 2.29199 10C2.29199 8.02477 2.78278 6.2664 3.54297 5.02246C4.30961 3.76807 5.28463 3.12514 6.25 3.125Z"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <path
            d="M13.75 3.125C14.7155 3.125 15.6913 3.76784 16.458 5.02246C17.2182 6.2664 17.709 8.02477 17.709 10C17.709 11.9752 17.2182 13.7336 16.458 14.9775C15.6913 16.2322 14.7155 16.875 13.75 16.875C12.7846 16.8749 11.8096 16.2319 11.043 14.9775C10.2828 13.7336 9.79199 11.9752 9.79199 10C9.79199 8.02477 10.2828 6.2664 11.043 5.02246C11.8096 3.76807 12.7846 3.12514 13.75 3.125Z"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          {/* pupils — translateX (see .eyes-pupils) makes the eyes glance;
              each eye's pupils live under its own clip */}
          <g clipPath="url(#eyeClipL)">
            <g className="eyes-pupils">
              <path
                d="M10.417 11.2507C10.417 12.8615 9.90092 14.1673 8.75033 14.1673C7.59973 14.1673 6.66699 12.8615 6.66699 11.2507C6.66699 9.63982 7.59973 8.33398 8.75033 8.33398C9.90092 8.33398 10.417 9.63982 10.417 11.2507Z"
                fill="currentColor"
              />
              <circle cx="8.75" cy="7.91602" r="1.25" fill="currentColor" />
            </g>
          </g>
          <g clipPath="url(#eyeClipR)">
            <g className="eyes-pupils">
              <path
                d="M17.917 11.2507C17.917 12.8615 17.4009 14.1673 16.2503 14.1673C15.0997 14.1673 14.167 12.8615 14.167 11.2507C14.167 9.63982 15.0997 8.33398 16.2503 8.33398C17.4009 8.33398 17.917 9.63982 17.917 11.2507Z"
                fill="currentColor"
              />
              <path
                d="M17.9168 7.91602C17.9168 8.60637 17.7739 9.16602 17.0835 9.16602C16.3931 9.16602 15.8335 8.60637 15.8335 7.91602C15.8335 7.22566 16.3931 6.66602 17.0835 6.66602C17.7739 6.66602 17.9168 7.22566 17.9168 7.91602Z"
                fill="currentColor"
              />
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
}
