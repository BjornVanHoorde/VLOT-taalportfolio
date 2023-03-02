import { TaalgroeiRoutes, TaalprofielRoutes } from "../routes";

const MainNav = [
  {
    href: TaalprofielRoutes.Index,
    label: "Taalprofiel",
  },
  {
    href: "",
    label: "Taaldossier",
  },
  {
    href: "",
    label: "Taalgroei",
  },
];

const SubNav = [
  {
    href: TaalgroeiRoutes.Vaardigheden,
    label: "Vaardigheden",
  },
  {
    href: "",
    label: "Foutanalyse",
  },
  {
    href: "",
    label: "Woordenschat",
  },
  {
    href: "",
    label: "Taaltips",
  },
];

export { MainNav, SubNav };
