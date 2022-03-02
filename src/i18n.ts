import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { DateTime } from "luxon";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
      format: (value, format, lng = "en") => {
        if (value instanceof Date) {
          return DateTime.fromJSDate(value)
            .setLocale(lng)
            .toLocaleString(DateTime[format]);
        }
        return value;
      },
    },
    resources: {
      en: {
        appContainer: {
          profile: "Profile",
          addExpense: "Add Expense",
          addIncome: "Add Income",
          settings: "Settings",
          add: "Add",
          close: "Close",
        },
        forms: {
          category: "Category",
          paymentType: "Payment Type",
          amount: "Amount",
          date: "Date",
          isRecurrent: "Is Recurrent",
          frequency: "Frequency",
          details: "Details",
          submitFailed:
            "There was an error trying to create {{formType}}, please try again.",
          submitSuccess:
            "{{formType}} Successfully added for $ {{amountValue}}.",
          select: "Select",
          income: "Income",
          expense: "Expense",
          validation: {
            isRequired: "This field is required",
            amountMissing: "Please Add an Amount",
          },
        },
        dashboard: {
          incomes: "Incomes",
          expenses: "Expenses",
          date: "{{date, DATE_SHORT}}",
          dateMedWeekday: "{{date, DATE_MED_WITH_WEEKDAY}}",
          latestTransaction: "Latest {{type}}",
          noTransactions: "{{type}} not found for the curren month",
          budget: 'Budget',
          budgetAvailable: 'Budget Available',
        },
      },
      es: {
        appContainer: {
          profile: "Perfil",
          addExpense: "Agregar Gasto",
          addIncome: "Agregar Ingreso",
          settings: "Configuracion",
          add: "Agregar",
          close: "Cerrar",
        },
        forms: {
          category: "Categoria",
          paymentType: "Tipo de pago",
          amount: "Cantidad",
          date: "Fecha",
          isRecurrent: "Es Recurrente",
          frequency: "Frequencia",
          details: "Detalles",
          submitFailed:
            "Ocurrio un problema al agregar {{formType}}, por favor intente de nuevo.",
          submitSuccess:
            "{{formType}} agregado correctamente por $ {{amountValue}}.",
          select: "Seleccione",
          income: "Ingreso",
          expense: "Gasto",
          validation: {
            isRequired: "Este campo es requerido",
            amountMissing: "Agregue una cantidad",
          },
        },
        dashboard: {
          incomes: "Ingresos",
          expenses: "Gastos",
          date: "{{date, DATE_SHORT}}",
          date_med: "{{date, DATE_MED_WITH_WEEKDAY}}",
          latestTransaction: "Ultimos {{type}}",
          noTransactions: "No hay {{type}} en este mes",
          budget: 'Presupuesto',
          budgetAvailable: 'Presupuesto Disponible',
        },
      },
    },
  });

export default i18n;
