import type { SVGProps } from "react";

/**
 * Inline SVG icons for the Manovruti home page.
 * All use `fill="currentColor"`, so colour comes from CSS `color`.
 * Pass className / width / height / style via props.
 */
export type IconProps = SVGProps<SVGSVGElement>;


/** viewBox 0 0 51 39 — intrinsic 51x39 */
export function HamburgerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 51 39" aria-hidden="true" focusable="false" {...props}>
      <rect className="hamburger__top" x="0" y="4" width="51" height="5" fill="currentColor" />
      <rect className="hamburger__mid" x="0" y="17" width="51" height="5" fill="currentColor" />
      <rect className="hamburger__bottom" x="0" y="30" width="51" height="5" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 12 12 — intrinsic 12x12 */
export function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false" {...props}>
      <path transform="translate(0 1.5)" d="M7.13729 8.93401L5.93662 8.73008C5.93662 8.73008 5.9631 8.56161 6.04256 8.32221C6.05139 8.28675 6.06904 8.24241 6.0867 8.19808C6.11319 8.10942 6.1485 8.02075 6.19264 7.92322C6.21913 7.87002 6.23678 7.81682 6.26327 7.76362C6.28976 7.71042 6.31624 7.65722 6.34273 7.59515C6.36921 7.53309 6.3957 7.47989 6.43101 7.41782C6.4575 7.35575 6.49281 7.29369 6.52812 7.23162C6.56344 7.16956 6.59875 7.10749 6.63407 7.03656C6.63407 7.03656 6.66938 6.97449 6.69586 6.93902C6.69586 6.93902 6.74001 6.86809 6.75766 6.84149C6.75766 6.84149 6.80181 6.77056 6.81946 6.74396C6.81946 6.74396 6.86361 6.67303 6.89009 6.64643C6.89009 6.64643 6.94306 6.57549 6.96072 6.54003C6.96072 6.54003 7.01369 6.4691 7.04017 6.43363C7.11963 6.32723 7.20792 6.22083 7.2962 6.10556C7.50808 5.84843 7.75528 5.5913 8.03779 5.33417H0.445312V4.11058H8.05545C6.75766 2.92246 6.23678 1.73433 6.04256 1.12254C5.97193 0.892006 5.94544 0.75014 5.93662 0.714674L7.13729 0.510742C7.13729 0.510742 7.13729 0.546209 7.16377 0.617141C7.16377 0.634875 7.16377 0.652608 7.18143 0.670341C7.18143 0.696941 7.19909 0.723541 7.20791 0.759007C7.22557 0.821073 7.25206 0.892006 7.28737 0.980672C7.30503 1.025 7.32269 1.06934 7.34034 1.11367C7.36683 1.17574 7.39331 1.2378 7.42863 1.29987C7.44628 1.33534 7.46394 1.37967 7.49043 1.424C7.51691 1.46833 7.53457 1.5038 7.56105 1.54813C7.58754 1.59247 7.6052 1.6368 7.64051 1.68113C7.667 1.72547 7.69348 1.7698 7.71997 1.823C8.18787 2.57666 9.02658 3.52539 10.5009 4.36771L11.0836 4.73124L10.5009 5.08591C9.01775 5.92823 8.17905 6.87696 7.71997 7.63062C7.69348 7.67495 7.65817 7.72815 7.64051 7.77248C7.61402 7.81682 7.58754 7.86115 7.56105 7.90548C7.53457 7.94982 7.50808 7.99415 7.49043 8.02962C7.46394 8.07395 7.44628 8.10942 7.42863 8.15375C7.39331 8.21581 7.36683 8.27788 7.34034 8.33995C7.32269 8.38428 7.30503 8.42861 7.28737 8.47295C7.25206 8.55274 7.2344 8.63254 7.20791 8.69461C7.19909 8.73008 7.19026 8.75668 7.18143 8.78328C7.18143 8.80101 7.1726 8.81874 7.16377 8.83648C7.14612 8.88968 7.13729 8.93401 7.13729 8.94288V8.93401Z" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 14 14 — intrinsic 14x14 */
export function BedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true" focusable="false" {...props}>
      <path transform="translate(0 2)" d="M12.6 3.5V1.4c0-.77-.63-1.4-1.4-1.4H2.8c-.77 0-1.4.63-1.4 1.4v2.1C.63 3.5 0 4.13 0 4.9v3.5h.931L1.4 9.8h.7l.469-1.4h8.869l.462 1.4h.7l.469-1.4H14V4.9c0-.77-.63-1.4-1.4-1.4Zm-6.3 0H2.8V1.4h3.5v2.1Zm4.9 0H7.7V1.4h3.5v2.1Z" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 14 14 — intrinsic 14x14 */
export function BathIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true" focusable="false" {...props}>
      <path d="M13.3 4.9H3.5V2.879c0-.698.475-1.346 1.163-1.46A1.402 1.402 0 0 1 6.3 2.8h1.4A2.802 2.802 0 0 0 4.621.015C3.166.155 2.1 1.462 2.1 2.924V4.9H.7a.7.7 0 0 0-.7.7V7a4.205 4.205 0 0 0 2.8 3.955V13.3h1.4v-2.1h5.6v2.1h1.4v-2.345A4.205 4.205 0 0 0 14 7V5.6a.7.7 0 0 0-.7-.7Z" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 599 592 — intrinsic 599x592 */
export function CardShapeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 599 592" aria-hidden="true" focusable="false" {...props}>
      <path d="M599 592H0C0 265.03 266.794 0 595.888 0c1.047 0 2.065.085 3.112.085V592Z" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 590 500 — intrinsic 590x500 */
export function HouseShapeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 590 500" aria-hidden="true" focusable="false" {...props}>
      <path d="M0 500V128.933L180.805 0 590 157.231V500H0Z" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 9 14 — intrinsic 9x14 */
export function ChevronIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 9 14" aria-hidden="true" focusable="false" {...props}>
      <path d="M9 7c-1.5.809-2.965 1.708-4.202 2.85C3.553 10.996 2.54 12.407 2.103 14c-.212-.028-.42-.06-.629-.091-.212-.032-.42-.068-.629-.103a3.104 3.104 0 0 0-.1-.012H.737l-.52-.083H.212L0 13.675c.008-.044.02-.087.033-.127.084-.337.192-.67.321-.99.004-.009.004-.013.008-.02.125-.29.263-.58.408-.86.25-.469.53-.924.842-1.356.054-.072.104-.143.162-.214.941-1.213 2.15-2.26 3.461-3.108h.004c-1.312-.844-2.515-1.89-3.456-3.1a11.44 11.44 0 0 1-1.42-2.442c-.005-.003-.005-.011-.009-.02a7.47 7.47 0 0 1-.32-.99A1.14 1.14 0 0 1 0 .32L.212.285h.005l.52-.083h.008a3.42 3.42 0 0 0 .1-.012C1.262.123 1.683.06 2.103 0c.437 1.59 1.45 3.005 2.695 4.15C6.035 5.288 7.5 6.187 9 7Z" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 15 14 — intrinsic 15x14 */
export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 15 14" aria-hidden="true" focusable="false" {...props}>
      <path transform="translate(0 2)" d="M7.5 9.5C6.691 8 5.792 6.535 4.65 5.298 3.504 4.053 2.093 3.04.5 2.603l.091-.629.11-.679.005-.058L.825.5c.044.008.087.02.127.033.225.056.448.123.666.2l.344.129c.29.125.58.263.86.408.469.25.924.53 1.356.842.072.054.143.104.214.162 1.213.941 2.26 2.15 3.108 3.461v.004c.844-1.312 1.89-2.515 3.1-3.456a11.44 11.44 0 0 1 2.072-1.255l.39-.174a7.47 7.47 0 0 1 .655-.229l.335-.091A1.14 1.14 0 0 1 14.18.5l.118.745.012.1c.067.417.13.838.19 1.258-1.59.437-3.005 1.45-4.15 2.695C9.212 6.535 8.313 8 7.5 9.5Z" fill="currentColor" fillRule="nonzero" />
    </svg>
  );
}

/** viewBox 0 0 20 21 — intrinsic 20x21 */
export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 21" aria-hidden="true" focusable="false" {...props}>
      <path d="M20 10.284C20 4.604 15.523 0 10 0S0 4.604 0 10.284c0 5.134 3.656 9.389 8.437 10.16v-7.186H5.9v-2.974h2.538V8.018c0-2.577 1.493-4.001 3.778-4.001 1.093 0 2.238.2 2.238.2V6.75h-1.262c-1.242 0-1.628.793-1.628 1.607v1.928h2.773l-.443 2.973h-2.33v7.187C16.344 19.673 20 15.42 20 10.284Z" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 20 21 — intrinsic 20x21 */
export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 21" aria-hidden="true" focusable="false" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M10 .222c-2.716 0-3.056.012-4.123.06C4.813.331 4.085.5 3.45.748A4.898 4.898 0 0 0 1.678 1.9 4.905 4.905 0 0 0 .525 3.67C.279 4.309.109 5.037.06 6.101.012 7.165 0 7.504 0 10.221c0 2.717.011 3.056.06 4.123.049 1.064.218 1.792.465 2.428.251.666.644 1.271 1.154 1.771.5.509 1.103.902 1.77 1.154.636.246 1.364.415 2.428.464 1.067.049 1.407.06 4.123.06s3.056-.011 4.123-.06c1.064-.049 1.792-.218 2.428-.465a4.897 4.897 0 0 0 1.771-1.153c.509-.5.902-1.104 1.153-1.771.247-.636.416-1.364.465-2.428.049-1.067.06-1.407.06-4.123s-.011-3.056-.06-4.122c-.049-1.065-.218-1.792-.465-2.428A4.903 4.903 0 0 0 18.32 1.9a4.905 4.905 0 0 0-1.77-1.153C15.915.5 15.187.33 14.122.282 13.056.234 12.717.222 10 .222Zm0 1.802c2.67 0 2.987.01 4.041.058.975.045 1.504.207 1.857.345.467.18.8.398 1.15.747.35.35.567.683.747 1.15.138.353.3.882.345 1.857.048 1.054.058 1.371.058 4.041 0 2.67-.01 2.987-.058 4.042-.045.974-.207 1.504-.345 1.856-.16.434-.415.828-.747 1.15a3.095 3.095 0 0 1-1.15.747c-.353.138-.882.3-1.857.345-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.041-.058-.975-.044-1.504-.206-1.857-.345a3.097 3.097 0 0 1-1.15-.747 3.099 3.099 0 0 1-.747-1.15c-.138-.353-.3-.882-.345-1.857-.048-1.054-.058-1.37-.058-4.04s.01-2.988.058-4.042c.045-.975.207-1.504.345-1.857.18-.466.398-.8.747-1.15a3.095 3.095 0 0 1 1.15-.747c.353-.138.882-.3 1.857-.345C7.013 2.034 7.33 2.024 10 2.024Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M9.998 13.559a3.336 3.336 0 1 1 0-6.673 3.336 3.336 0 0 1 0 6.673Zm0-8.477a5.14 5.14 0 1 0 0 10.28 5.14 5.14 0 0 0 0-10.28Zm6.635-.093a1.215 1.215 0 1 1-2.43 0 1.215 1.215 0 0 1 2.43 0" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 20 21 — intrinsic 20x21 */
export function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 21" aria-hidden="true" focusable="false" {...props}>
      <path d="M20 2.564V18.88c0 .373-.155.73-.43.995-.276.264-.65.412-1.04.412H1.47c-.39 0-.763-.148-1.04-.412A1.376 1.376 0 0 1 0 18.88V2.564c0-.373.155-.731.43-.995.277-.264.65-.412 1.04-.412h17.06c.39 0 .764.148 1.04.412.275.264.43.622.43.995ZM5.882 8.472h-2.94v9.002h2.94V8.472Zm.265-3.095a1.559 1.559 0 0 0-.124-.62 1.616 1.616 0 0 0-.364-.529 1.7 1.7 0 0 0-.547-.355 1.76 1.76 0 0 0-.647-.128h-.053c-.453 0-.887.172-1.206.478-.32.306-.5.721-.5 1.154 0 .433.18.848.5 1.154.32.306.753.478 1.206.478.222.005.444-.032.651-.108.208-.077.398-.192.559-.339.161-.147.29-.322.38-.517.09-.195.14-.404.145-.617v-.05Zm10.912 6.628c0-2.706-1.8-3.758-3.588-3.758a3.48 3.48 0 0 0-1.691.346 3.307 3.307 0 0 0-1.286 1.105h-.082V8.472H7.647v9.002h2.941v-4.788c-.042-.49.12-.977.45-1.354.33-.377.803-.615 1.315-.66h.112c.935 0 1.63.563 1.63 1.98v4.822h2.94l.024-5.469Z" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 15 16 — intrinsic 15x16 */
export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 15 16" aria-hidden="true" focusable="false" {...props}>
      <path d="M15 13.166c0 .27-.06.548-.188.818-.127.27-.293.525-.51.765a3.387 3.387 0 0 1-1.232.885c-.451.187-.94.285-1.465.285-.766 0-1.585-.18-2.449-.548a13.198 13.198 0 0 1-2.584-1.485 21.586 21.586 0 0 1-2.463-2.1 21.322 21.322 0 0 1-2.096-2.452C1.397 8.479.901 7.624.541 6.776.18 5.921 0 5.104 0 4.324c0-.51.09-.998.27-1.448.18-.457.466-.877.864-1.252.48-.473 1.007-.705 1.563-.705.21 0 .42.045.608.135.195.09.368.225.503.42l1.743 2.452c.135.188.233.36.3.525.068.158.105.315.105.458 0 .18-.052.36-.157.532-.098.173-.24.353-.42.533l-.572.592a.401.401 0 0 0-.12.3c0 .06.008.113.023.173.022.06.045.105.06.15.135.247.368.57.698.96.338.39.699.787 1.09 1.185.405.397.796.765 1.194 1.102.39.33.713.555.969.69.037.015.082.038.135.06.06.023.12.03.188.03a.414.414 0 0 0 .308-.127l.57-.563c.188-.187.368-.33.541-.42.173-.105.346-.157.534-.157.142 0 .292.03.458.097.165.068.338.165.525.293l2.487 1.762c.195.135.33.293.413.48.075.188.12.375.12.585Z" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 22 16 — intrinsic 22x16 */
export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 22 16" aria-hidden="true" focusable="false" {...props}>
      <path d="m.75 2.509 8.727 6.6.167.117a3 3 0 0 0 3.353-.046l.164-.122L21.25 2.58V15.5a.25.25 0 0 1-.25.25H1a.25.25 0 0 1-.25-.25V2.509ZM20.963.249 11.91 7.497l-.111.078a1 1 0 0 1-1.003.014l-.114-.075L1.077.25h19.886Z" fill="currentColor" fillRule="nonzero" />
    </svg>
  );
}


/** viewBox 0 0 16 15 — intrinsic 16x15 */
export function MenuActiveIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 15" aria-hidden="true" focusable="false" {...props}>
      <path transform="translate(0 3)" d="M15.447.552c0 4.36-3.357 7.895-7.5 7.895-4.141 0-7.5-3.533-7.5-7.894" fill="currentColor" fillRule="nonzero" />
    </svg>
  );
}

/** viewBox 0 0 14 14 — intrinsic 14x14 */
export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true" focusable="false" {...props}>
      <path d="M8.4 7C7 7.809 5.632 8.708 4.478 9.85 3.316 10.996 2.37 12.407 1.963 14c-.198-.028-.393-.06-.587-.091-.198-.032-.393-.068-.587-.103a2.713 2.713 0 0 0-.093-.012H.688l-.486-.083H.198L0 13.675a1.21 1.21 0 0 1 .031-.127c.078-.337.179-.67.3-.99.003-.009.003-.013.007-.02.117-.29.245-.58.381-.86.233-.469.494-.924.785-1.356.05-.072.097-.143.152-.214.878-1.213 2.006-2.26 3.23-3.108h.004c-1.224-.844-2.348-1.89-3.226-3.1A11.599 11.599 0 0 1 .339 1.458c-.005-.003-.005-.011-.009-.02a7.856 7.856 0 0 1-.299-.99A1.205 1.205 0 0 1 0 .32L.198.285h.004L.688.202h.008L.789.19C1.178.123 1.57.06 1.963 0c.408 1.59 1.353 3.005 2.515 4.15C5.632 5.288 7 6.187 8.4 7Z" fill="currentColor" /><path d="M5.6 7C7 6.191 8.368 5.292 9.522 4.15 10.684 3.005 11.63 1.593 12.037 0c.198.028.393.06.587.091.198.032.393.068.587.103l.093.012h.008l.486.083h.004L14 .325c-.008.044-.02.087-.031.127a7.85 7.85 0 0 1-.3.99c-.003.009-.003.013-.007.02-.117.29-.245.58-.381.86-.233.468-.494.924-.785 1.356-.05.072-.098.143-.152.214-.878 1.213-2.006 2.26-3.23 3.108H9.11c1.225.844 2.348 1.89 3.226 3.1.05.067.098.13.14.198a11.601 11.601 0 0 1 1.186 2.243c.004.004.004.012.008.02.12.321.221.654.299.991a1.2 1.2 0 0 1 .031.127l-.198.036h-.004l-.486.083h-.008a3.31 3.31 0 0 0-.093.012c-.389.067-.781.13-1.174.19-.408-1.59-1.353-3.005-2.515-4.15C8.368 8.712 7 7.813 5.6 7Z" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 483 242 — intrinsic 483x242 */
export function CardImageShapeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 483 242" aria-hidden="true" focusable="false" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M482.888 8.44309e-05L241.08 4.21518e-05L241.08 107.756C234.437 47.2632 183.162 0.19148 120.904 0.19147C54.1362 0.191458 -9.49739e-06 54.3188 -2.1174e-05 121.101C-3.28507e-05 187.884 54.1247 242 120.904 242C183.162 242 234.437 194.938 241.08 134.446L241.08 239.8C241.291 239.8 241.5 239.809 241.708 239.817C241.917 239.826 242.125 239.834 242.336 239.834C375.187 239.834 482.888 132.464 482.888 8.44309e-05Z" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 8 15 — intrinsic 8x15 */
export function ContactChevronIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 8 15" aria-hidden="true" focusable="false" {...props}>
      <path d="M7.895 0C3.535 0 0 3.358 0 7.5 0 11.642 3.534 15 7.895 15" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 80 179 — intrinsic 80x179 */
export function HomeScrollShapeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 80 179" aria-hidden="true" focusable="false" {...props}>
      <path d="M-34 28.9828C-34 28.9828 -21.5297 34.1148 -6.06659 40.4991V160.846L37.5712 179L51.7521 144.62L80 76.129L52.4353 64.6616C62.1404 40.7741 50.8168 13.4698 27.0528 3.58424C3.21021 -6.33396 -24.1241 5.03808 -34 28.9828Z" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 25 27 — intrinsic 25x27 */
export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 25 27" aria-hidden="true" focusable="false" {...props}>
      <path d="M22.148 11.114a2.513 2.513 0 0 1 0 4.409l-13.229 7.44C7.177 23.943 5 22.718 5 20.758V5.878c0-1.96 2.177-3.184 3.92-2.204l13.228 7.44Z" fill="currentColor" fillRule="nonzero" />
    </svg>
  );
}

/** viewBox 0 0 25 27 — intrinsic 25x27 */
export function PauseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 25 27" aria-hidden="true" focusable="false" {...props}>
      <path d="M5.75 24.875a.627.627 0 0 1-.625.626h-3.75a.627.627 0 0 1-.625-.626V1.125C.75.781 1.03.5 1.375.5h3.75c.344 0 .625.282.625.626v23.75Zm17.5 0a.627.627 0 0 1-.625.626h-3.75a.627.627 0 0 1-.625-.626V1.125c0-.344.281-.626.625-.626h3.75c.344 0 .625.282.625.626v23.75Z" fill="currentColor" fillRule="nonzero" />
    </svg>
  );
}

/** viewBox 0 0 446 890 — intrinsic 446x890 */
export function Shape5050LeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 446 890" aria-hidden="true" focusable="false" {...props}>
      <path d="M0 444.751V0c243.637 0 441.12 198.092 441.12 442.44 0 .778-.063 1.534-.063 2.311H0ZM445.105 667.624c0-122.804-99.555-222.375-222.365-222.375S.354 544.82.354 667.624C.354 790.429 99.908 890 222.74 890c122.831 0 222.365-99.55 222.365-222.376Z" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 160 101 — intrinsic 160x101 */
export function Shape5050LeftSmIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 160 101" aria-hidden="true" focusable="false" {...props}>
      <path d="M100.92 101L-2.28882e-05 101C-2.77213e-05 45.716 44.9497 0.90437 100.396 0.904366C100.572 0.904366 100.744 0.918678 100.92 0.918678L100.92 101Z" fill="#d2a468" /> <path d="M151.493 -2.61062e-05C123.627 -2.36701e-05 101.033 22.5903 101.033 50.4576C101.033 78.3248 123.627 100.92 151.493 100.92C179.359 100.92 201.953 78.3296 201.953 50.4576C201.953 22.5855 179.364 -2.85428e-05 151.493 -2.61062e-05Z" fill="#d2a468" />
    </svg>
  );
}

/** viewBox 0 0 30 30 — intrinsic 30x30 */
export function SupplyOnlyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true" focusable="false" {...props}>
      <path d="M25 25L5 25C5 13.9547 13.9085 5 24.8966 5C24.9308 5 24.9649 5.00272 25 5.00272L25 25Z" fill="#ED9B53" />
    </svg>
  );
}

/** viewBox 0 0 30 30 — intrinsic 30x30 */
export function OwnerBuilderIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true" focusable="false" {...props}>
      <path d="M5 25L5 5C16.0453 5 25 13.9085 25 24.8966C25 24.9308 24.9973 24.9649 24.9973 25L5 25Z" fill="#ED9B53" />
    </svg>
  );
}

/** viewBox 0 0 30 30 — intrinsic 30x30 */
export function BuildInstallIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true" focusable="false" {...props}>
      <path d="M25 5V25C13.9547 25 5 16.0915 5 5.10336C5 5.0692 5.00272 5.03505 5.00272 5L25 5Z" fill="#ED9B53" />
    </svg>
  );
}

/** viewBox 0 0 287 858 — intrinsic 287x858 */
export function ShapeDiscoverLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 287 858" aria-hidden="true" focusable="false" {...props}>
      <path d="M-258 138.923C-258 138.923 -198.383 163.522 -124.459 194.124V770.983L84.1608 858L151.955 693.206L287 364.909L155.221 309.942C201.619 195.442 147.484 64.5646 33.8754 17.1803C-80.1091 -30.3605 -210.786 24.149 -258 138.923Z" fill="currentColor" />
    </svg>
  );
}

/** viewBox 0 0 28 19 — intrinsic 28x19 */
export function QuoteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 28 19" aria-hidden="true" focusable="false" {...props}>
      <path d="M5.975 9.24c-.53 0-.927 0-1.324.12 0-3.72 2.384-6.48 5.564-9.24L10.082 0C4.783 1.92.81 6.36.81 13.44c0 2.88 2.12 4.8 5.166 4.8 3.047 0 5.167-1.92 5.167-4.44 0-2.64-2.12-4.56-5.167-4.56Zm16.03 0c-.53 0-.927 0-1.324.12 0-3.72 2.384-6.48 5.564-9.24L26.112 0c-5.299 1.92-9.273 6.36-9.273 13.44 0 2.88 2.12 4.8 5.166 4.8 3.047 0 5.167-1.92 5.167-4.44 0-2.64-2.12-4.56-5.167-4.56Z" fill="currentColor" />
    </svg>
  );
}

/**
 * Manovruti accent shapes. The source used a house gable and an arch, which read as housing;
 * these are drawn from the building type Manovruti actually delivers.
 */

/** Portal frame: two columns and a haunched beam, the structural unit of an industrial shed. */
export function PortalFrameIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 600 420" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M18 420V18h564v402h-36V54H54v366H18Z"
        fill="currentColor"
      />
      <path d="M54 126h492v36H54v-36Z" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

/** Stacked plates, echoing the angular planes of the logo mark. viewBox 0 0 600 420. */
export function PlatesShapeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 600 420" aria-hidden="true" focusable="false" {...props}>
      <path d="M0 420 0 150 210 30v270L0 420Z" fill="currentColor" />
      <path d="M255 300V30l165 96v270l-165-96Z" fill="currentColor" opacity="0.55" />
      <path d="M465 420V126l135 78v216h-135Z" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
