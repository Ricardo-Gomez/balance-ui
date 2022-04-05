import { atom } from "recoil";
import { LocalStorageService } from "../../services/storage/LocalStorage";

const frequenciesJson = LocalStorageService.getFrequencies();
let defaultFrequencies = [];

if (null !== frequenciesJson) {
  defaultFrequencies = JSON.parse(frequenciesJson);
}
export const categories = atom<Record<string, any>[]>({
  key: "categoryState",
  default: [],
});
export const paymentTypes = atom({
  key: "paymentTypesState",
  default: [],
});
export const frequencyState = atom({
  key: "frequencyyState",
  default: defaultFrequencies,
});
