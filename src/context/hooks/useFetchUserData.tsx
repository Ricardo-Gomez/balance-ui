import React, { useCallback, useEffect } from "react";
import {useSetRecoilState} from 'recoil';
import {categories, paymentTypes} from '../../recoil/userData';
import { useAppContext } from "../AppContext";
import { api } from "../../api";

export function useFetchUserData() {
  const setUserCategoriess = useSetRecoilState(categories);
  const setUserPaymentTypes = useSetRecoilState(paymentTypes);

  const cat = useCallback(() => {
    (async () => {
      try {
        const categories = await api.getCategories();
        const paymentTypes = await api.getPaymentTypes();
        setUserCategoriess(categories);
        setUserPaymentTypes(paymentTypes);

      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    cat();
  }, [cat]);
}

export function useDataManager() {
    const { setIsLoading, userDataManager } = useAppContext();
    const [result, setResult] = React.useState<{type: string | null, value: string} | null>(null);
    enum DataType {
        Category = 'category',
        PaymentType = 'PaymentType',
    }
    const cat = useCallback(() => {
        (async () => {
          setIsLoading(true);
          try {
           if(DataType.Category === result?.type) {
            const category = await api.addCategory(result?.value || '');
            userDataManager({type: "AddCategory", payload: category});
           }
           if(DataType.PaymentType === result?.type) {
            const paymentType = await api.addPaymentType(result?.value || '');
            userDataManager({type: "AddPaymentType", payload: paymentType});
           }
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
        })();
      }, [result, setIsLoading, userDataManager]);
      useEffect(() => {
        if (result !== null) {
            cat();
          }
      }, [cat, result]);

      const addCategory = (
        category: string
      ) => {
        setResult({type: DataType.Category, value: category});
      };
      const addPaymentType = (
        paymentType: string
      ) => {
          console.log(paymentType)
        setResult({type: DataType.PaymentType, value: paymentType});
      };
      return {addCategory, addPaymentType}
}
