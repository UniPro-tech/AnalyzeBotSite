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
    common: `w-full py-6 bg-(--hero-background) text-(--hero-headline) p-4 flex items-center`,
    header: `justify-between flex-row`,
    footer: `text-center flex-col justify-center space-y-8`,
  },
  link: `font-bold hover:underline no-underline hover:text-(--hero-button)`,
  paragraph: `text-left text-(--hero-paragraph)`,
};
