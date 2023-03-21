import {
  BasisgeletterdheidRoutes,
  TaaldossierRoutes,
  TaalgroeiRoutes,
  TaalprofielRoutes,
} from "../routes";

const MainNav = [
  {
    href: TaalprofielRoutes.Index,
    label: "Taalprofiel",
  },
  {
    href: TaaldossierRoutes.Index,
    label: "Taaldossier",
  },
  {
    href: BasisgeletterdheidRoutes.Index,
    label: "Basisgeletterdheid",
  },
  {
    href: TaalgroeiRoutes.Index,
    label: "Taalgroei",
  },
];

const SubNav = [
  {
    href: TaalgroeiRoutes.Vaardigheden,
    label: "Vaardigheden",
  },
  {
    href: TaalgroeiRoutes.Foutanalyse,
    label: "Foutanalyse",
  },
  {
    href: TaalgroeiRoutes.Woordenschat,
    label: "Woordenschat",
  },
  {
    href: TaalgroeiRoutes.Taaltips,
    label: "Taaltips",
  },
];

export { MainNav, SubNav };
