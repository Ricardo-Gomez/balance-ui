import * as React from "react";
import {
  Button,
  ButtonProps
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type LangObject = {
    [x:string]: {name: string}
}

export const LangSwitcher: React.FC<ButtonProps> = (props) => {
  const { i18n } = useTranslation();
  const [lang, setLang] = React.useState(i18n.resolvedLanguage)
  const langs: LangObject = {
    en: { name: "En-US" },
    es: { name: "Es-MX" },
  };

  return (
    <>
      <Button
          size='xs'
          fontSize='smaller'
          variant='ghost'
          color='current'
          marginLeft='2'
        //   isActive={() => i18n.resolvedLanguage === lng}
          onClick={() => {
            i18n.changeLanguage(lang === 'en' ? 'es' : 'en', () => setLang(i18n.resolvedLanguage));
          }}
          {...props}
        >
          {lang === 'en' ? langs.es.name : langs.en.name }
        </Button>
    </>
  );
};
