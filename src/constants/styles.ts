type ColorConstant = {
  background: string;
  headline: string;
  subHeadline?: string;
  cardBackground?: string;
  cardParagraph?: string;
  paragraph: string;
  button: string;
  buttonText: string;
};

type ColorConfigs = {
  hero: ColorConstant;
  primary: ColorConstant;
};

export const colors: ColorConfigs = {
  hero: {
    background: "#faeee7",
    headline: "#33272a",
    paragraph: "#594a4e",
    button: "#ff8ba7",
    buttonText: "#33272a",
  },
  primary: {
    background: "#fffffe",
    headline: "#33272a",
    subHeadline: "#594a4e",
    cardBackground: "#faeee7",
    cardParagraph: "#33272a",
    paragraph: "#594a4e",
    button: "#ff8ba7",
    buttonText: "#33272a",
  },
};

export const HeaderFooterStyles = {
  base: {
    // Use Tailwind arbitrary value classes that reference CSS variables.
    // Keep the classes literal so Tailwind JIT can detect them.
    wrapper: `w-full py-6 bg-(--hero-background) text-(--hero-headline) p-4 flex items-center`,
    common: `w-full max-w-6xl mx-auto flex items-center`,
    header: `justify-between flex-row`,
    footer: `text-center flex-col justify-center space-y-8`,
  },
  link: `font-bold hover:underline no-underline hover:text-(--hero-button)`,
  paragraph: `text-left text-(--hero-paragraph)`,
};

export const HeroStyles = {
  wrapper: `w-full py-20 bg-(--hero-background) text-(--hero-headline) p-4`,
  layouts: {
    imageSide: `max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8`,
  },
  content: `max-w-6xl mx-auto flex flex-col items-center text-center space-y-8`,
  headline: `text-4xl font-bold`,
  paragraph: `text-lg text-(--hero-paragraph)`,
  button: `px-6 py-3 bg-(--hero-button) text-(--hero-button-text) rounded-lg hover:bg-(--hero-button-hover) transition-colors cursor-pointer`,
};

export const HomeStyles = {
  news: {
    section: `w-full max-w-6xl px-4 py-12`,
    heading: `text-3xl font-bold mb-6 text-(--primary-headline)`,
    list: `space-y-3 text-(--primary-paragraph)`,
    item: `rounded-xl bg-(--primary-card-background) px-5 py-4`,
    title: `font-semibold text-lg text-(--primary-card-foreground) no-underline hover:text-(--primary-button) hover:underline transition-colors`,
    meta: `mt-1 text-sm text-(--primary-sub-headline)`,
    description: `mt-3 leading-relaxed text-(--primary-card-paragraph)`,
    actionRow: `mt-4`,
    detailButton: `inline-block rounded-lg bg-(--primary-button) px-4 py-2 text-sm font-semibold text-(--primary-button-text) no-underline transition-opacity hover:opacity-85`,
    pagination: `mt-8 flex flex-wrap items-center justify-center gap-2`,
    pageButton: `inline-block rounded-lg border border-(--primary-button) px-3 py-2 text-sm font-semibold text-(--primary-headline) no-underline transition-colors hover:bg-(--primary-card-background)`,
    pageButtonActive: `bg-(--primary-button) text-(--primary-button-text)`,
    emptyText: `rounded-xl bg-(--primary-card-background) px-5 py-6 text-(--primary-paragraph)`,
  },
};

export const PrimaryStyles = {
  wrapper: `w-full py-20 bg-(--primary-background) text-(--primary-headline) p-4`,
  layouts: {
    imageSide: `max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8`,
  },
  headline: `text-4xl font-bold`,
  subHeadline: `text-2xl text-(--primary-sub-headline)`,
  paragraph: `text-lg text-(--primary-paragraph)`,
  button: `px-6 py-3 bg-(--primary-button) text-(--primary-button-text) rounded-lg hover:bg-(--primary-button-hover) transition-colors cursor-pointer`,
};
