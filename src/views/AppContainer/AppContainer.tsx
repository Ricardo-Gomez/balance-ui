import React, { useMemo, useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  StackDivider,
} from "@chakra-ui/layout";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  FormControl,
  Skeleton,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import DatePicker from "react-date-picker";
import { ColorModeSwitcher } from "../Common/ColorModeSwitcher";
import { LangSwitcher } from "../Common/LangSwitcher";
import { Modal } from "../Common/Modal";
import { useFetchUserData } from "../../context/hooks/useFetchUserData";
import { TransactionForm } from "../Forms/TransactionForm";
import { transactionsDateRangeState } from "../../recoil/transactions";
import { isAuth } from "../../recoil/profile";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useAppContext } from "../../context/AppContext";
import { Loader } from "../Common/Loader";
// import { AddIncome } from "../Forms";

type AppContainerProps = {
  children: React.ReactNode;
};
enum Screens {
  Expenses = "Expense",
  Incomes = "Income",
  None = "None",
}

export const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const { t, i18n } = useTranslation(["appContainer", "forms"]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentModal, setCurrentModal] = useState(Screens.None);
  const [dateValue, setDateValue] = useRecoilState(transactionsDateRangeState);

  useFetchUserData();

  const renderExpenseModal = useMemo(
    () => <TransactionForm formType='Expense' t={t} />,
    [t]
  );
  //   const renderExpenseModal = useMemo(
  //   () => <AddIncome t={t} />,
  //   [t]
  // );
  const renderIncomeModal = useMemo(
    () => <TransactionForm formType='Income' t={t} />,
    [t]
  );
  const renderModal = useMemo(() => {
    switch (currentModal) {
      case Screens.Expenses:
        return renderExpenseModal;
      case Screens.Incomes:
        return renderIncomeModal;
      case Screens.None:
      default:
        return false;
    }
  }, [currentModal, renderExpenseModal, renderIncomeModal]);

  const openModalFor = (modal: Screens) => {
    onOpen();
    setCurrentModal(modal);
  };

  console.log("rendering");
  return (
    <Box width='100%'>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={t(`add${currentModal}`)}
        t={t}
      >
        {renderModal}
      </Modal>
      <Flex
        pr='1em'
        pl='1em'
        pb='20px'
        justify='space-between'
        mt='0.5em'
        height='80px'
      >
        <HStack
          justifyContent='center'
          flexGrow={1}
          w='960px'
          spacing='10px'
          divider={
            <StackDivider alignSelf='center' h='20px' borderColor='gray.200' />
          }
        >
          <Menu>
            <MenuButton as={Button} rightIcon={<FiChevronDown />}>
              {t("profile")}
            </MenuButton>
            <MenuList>
              <MenuItem as={LinkRouter} to='/expenses'>
                {t("settings")}
              </MenuItem>
            </MenuList>
          </Menu>
          <Button onClick={() => openModalFor(Screens.Expenses)}>
            {t("addExpense")}
          </Button>
          <Button onClick={() => openModalFor(Screens.Incomes)}>
            {t("addIncome")}
          </Button>
        </HStack>
        <FormControl
          width='unset'
          justifySelf='flex-end'
          alignSelf='center'
          display='flex'
        >
          <DatePicker
            locale={i18n.resolvedLanguage}
            format='MMMM/y'
            returnValue='range'
            value={dateValue}
            disableCalendar
            clearIcon={null}
            maxDetail='year'
            onChange={(value: Date[]) => {
              console.log(value);
              setDateValue(value);
            }}
          />
        </FormControl>
        <LangSwitcher justifySelf='flex-end' alignSelf='center' />
        <ColorModeSwitcher justifySelf='flex-end' alignSelf='center' />
      </Flex>

      <Container maxW='container.lg' centerContent>
        {children}
      </Container>
    </Box>
  );
};

export const AppContainerWithLoader: React.FC = () => {
  const auth = useRecoilValue(isAuth);
  return auth ? (
    <AppContainer>
      <SimpleGrid columns={[1, 2, 4]} spacingX='15px' spacingY='20px'>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} isLoaded={false}>
            <Box minW='205px' minH='350px'></Box>
          </Skeleton>
        ))}
      </SimpleGrid>
    </AppContainer>
  ) : (
    <Box w='100%'>
      <Container maxW='container.lg' centerContent>
        <Loader fullWidth />
      </Container>
    </Box>
  );
};
