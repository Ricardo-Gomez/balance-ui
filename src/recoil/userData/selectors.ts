import { selector } from "recoil";
import { frequencyState } from "./atoms";
import i18n from "i18next";

export const queryFrequenciesValue = selector({
  key: "queryFrequenciesValue",
  get: ({get}) => {
      const frequencies = get(frequencyState);
      return {
        frequencies: frequencies.map((f) => ({id: f._id, name: f.name[i18n.resolvedLanguage]}))
      }
  },
});
