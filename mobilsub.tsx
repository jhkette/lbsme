// /* eslint-disable react/jsx-curly-brace-presence */
// /* eslint-disable no-nested-ternary */
// import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
// import { Appearance, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";

// import Icon from "react-native-vector-icons/Feather";
// import Crashlytics from "@react-native-firebase/crashlytics";

// import { useForm } from "react-hook-form";

// import { yupResolver } from "@hookform/resolvers/yup";

// import { ActivityIndicator, Modal, Portal, Switch } from "react-native-paper";

// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// import { RouteProp, useFocusEffect } from "@react-navigation/native";

// import DatePicker from "react-native-date-picker";

// import moment from "moment";

// import { useTranslation } from "react-i18next";

// import ScreenLayout from "@layouts/ScreenLayout";
// import { addSubscriptionForm } from "@e2e/selectors/subscriptions/addSubscriptionForm";

// import Typography from "@components/Typography";
// import Button from "@components/Button";
// import StyledController from "@components/StyledController";
// import DropDownButton from "@components/DropDownButton";
// import ValidationError from "@components/ValidationError";
// import NavigationHeader from "@components/NavigationHeader";
// import StyledModal from "@components/StyledModal";

// import ModalVariants from "@enums/ModalVariants";

// import defaultTheme from "@themes/defaultTheme";

// import {
//   SaveSubscriptionInput,
//   SubCategoryResult,
//   SubscriptionPriceTypeEnum,
// } from "@graphql-types/generated/types";

// import { maxNameLength, pound } from "@consts/consts";

// import { NAMESPACE_ADD_SUBSCRIPTION_FORM } from "@i18n/namespaces";
// import { languageTag } from "@i18n/instance";

// import useMerchantContext from "@contexts/MerchantContext/useMerchantContext";

// import useMixpanelContext from "@contexts/MixpanelContext/useMixPanelContext";
// import { SubscriptionsStackNavigatorParams } from "../SubscriptionsNavigatorParams";

// import {
//   NewSubscriptionCategoryRoute,
//   NewSubscriptionFormRoute,
//   NewSubscriptionProvidersRoute,
//   SubscriptionDetailsScreenRoute,
// } from "../routes";

// import { useSaveSubscriptionMutation } from "./graphql/mutation/mutation.generated";

// import { costSchema } from "./costSchema";

// import styles from "./styles";
// import { useGetSubCategoryLazyQuery } from "./graphql/queries/queries.generated";

// type NewSubscriptionFormProp = NativeStackNavigationProp<
//   SubscriptionsStackNavigatorParams,
//   typeof NewSubscriptionFormRoute
// >;

// type NewSubscriptionFormRouteProp = RouteProp<
//   SubscriptionsStackNavigatorParams,
//   typeof NewSubscriptionFormRoute
// >;

// interface NewSubscriptionFormProps {
//   navigation: NewSubscriptionFormProp;
//   route: NewSubscriptionFormRouteProp;
// }

// const NewSubscriptionForm = ({ navigation, route }: NewSubscriptionFormProps) => {
//   const { item, subscriptionDetailsData } = route.params;
//   const { contextMerchant, setContextMerchant } = useMerchantContext();
//   const { t } = useTranslation(NAMESPACE_ADD_SUBSCRIPTION_FORM);

//   const minDate = useMemo(() => moment(new Date()).add(1, "day"), []);

//   const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryResult | undefined>(
//     item
//   );
//   const [isSelectedSubCategoryOpen, setIsSelectedSubCategoryOpen] = useState<boolean>(false);
//   const [selectedFrequency, setSelectedFrequency] = useState<SubscriptionPriceTypeEnum>(
//     SubscriptionPriceTypeEnum.Monthly
//   );
//   const [isFrequencyOpen, setIsFrequencyOpen] = useState<boolean>(false);
//   const [saveResultId, setSaveResultId] = useState<string>("");

//   const [contractEndDate, setContractEndDate] = useState<Date>(minDate.toDate());
//   const [renewalDate, setRenewalDate] = useState<Date>(minDate.toDate());

//   const [isCalendarOpenForContractEnd, setIsCalendarOpenForContractEnd] = useState<boolean>(false);
//   const [isCalendarOpenForNextPayment, setIsCalendarOpenForNextPayment] = useState<boolean>(false);

//   const [contractEndDateSelected, setContractendDateSelected] = useState<boolean>(false);
//   const [nextPaymentDateSelected, setNextPaymentDateSelected] = useState<boolean>(false);

//   const [isSwitchOn, setIsSwitchOn] = useState<boolean>(route.params.isFreeTrial || false);
//   const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
//   const [isAddAnotherVisible, setIsAddAnotherVisible] = useState<boolean>(false);
//   const [isHighCostWarningVisible, setIsHighCostWarningVisible] = useState<boolean>(false);
//   const [isSubscriptionManual, setIsSubscriptionManual] = useState<boolean>(true);
//   const [isSavingSubscription, setIsSavingSubscription] = useState<boolean>(false);
//   const { mixpanel } = useMixpanelContext();
//   const isEditSubscription = !!route.params.subscriptionDetailsData;
//   const [infoModalVisible, setIsInfoModalVisible] = useState(false);
//   const [nextPaymentErrorModalVisible, setNextPaymentErrorModalVisible] = useState<boolean>(false);

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     formState,
//     getValues,
//     setValue,
//   } = useForm({
//     defaultValues: {
//       cost: "",
//       name: "",
//     },
//     resolver: yupResolver(costSchema),
//     mode: "onChange",
//   });

//   const [getSubCategory, { data: subCategoryData, loading: subCategoryLoading }] =
//     useGetSubCategoryLazyQuery({
//       fetchPolicy: "cache-and-network",
//     });

//   const [saveSubscription] = useSaveSubscriptionMutation();

//   const setForm = useCallback((): void => {
//     if (subscriptionDetailsData) {
//       const { isManual, costs, displayName, merchant, type, freeTrial, dates, category } =
//         subscriptionDetailsData;

//       setSelectedSubCategory({
//         SK: category.SK,
//         PK: category.PK,
//         name: category.subCategory,
//         searchName: category.searchSubCategory,
//       });

//       setContextMerchant({
//         category: {
//           icon: "",
//           name: category.category,
//           PK: category.PK,
//           SK: category.SK,
//           searchName: category.searchCategory,
//         },
//         name: merchant.name,
//         SK: category.SK,
//         subCategory: item,
//         id: merchant.id,
//       });

//       setIsSubscriptionManual(isManual);
//       setValue("name", displayName ?? merchant.name);
//       setValue("cost", `${pound}${costs.amount}`, { shouldValidate: true });

//       setSelectedFrequency(type);
//       setIsSwitchOn(freeTrial);
//       setRenewalDate(new Date(dates.renewalDate));
//       if (dates.contractEndDate) {
//         setContractendDateSelected(true);
//         setContractEndDate(new Date(dates.contractEndDate));
//       }
//     }
//   }, [setContextMerchant, item, subscriptionDetailsData, setValue]);

//   const invertState = (setState: Dispatch<SetStateAction<boolean>>) =>
//     setState((prevState) => !prevState);

//   const warnBeforeSave = () => {
//     setIsHighCostWarningVisible(true);
//   };

//   const isAHighValue = () => {
//     const value = Number(getValues().cost.slice(1, getValues().cost.length));

//     return value > 9999.99;
//   };

//   const onModal = () => {
//     setIsInfoModalVisible((prevState) => {
//       return !prevState;
//     });
//   };

//   useFocusEffect(() => {
//     if (route.params.item) {
//       setSelectedSubCategory(route.params.item);
//     }
//   });

//   const onSave = async (data: { cost: string; name: string }): Promise<void> => {
//     if (moment(renewalDate).isBefore(moment(new Date()))) {
//       setNextPaymentErrorModalVisible(true);
//       return;
//     }

//     setIsSavingSubscription(true);
//     setIsHighCostWarningVisible(false);

//     if (data.cost && selectedSubCategory) {
//       const amount = Number(data.cost.replace(pound, "").replace(",", "."));
//       const saveSubscriptionData: SaveSubscriptionInput = {
//         subscriptionId: subscriptionDetailsData?.subscriptionId,
//         category: { PK: selectedSubCategory.PK, SK: selectedSubCategory.SK },
//         merchant: {
//           id: contextMerchant?.id || (route.params.customValue?.id as string),
//           name: contextMerchant?.name || (route.params.customValue?.name as string),
//         },
//         displayName: data.name ?? "",
//         amount,
//         type: selectedFrequency,
//         freeTrial: isSwitchOn,
//         renewalDate: moment(renewalDate).format("YYYY-MM-DD"),
//         contractEndDate: contractEndDateSelected
//           ? moment(contractEndDate).format("YYYY-MM-DD")
//           : null,
//       };

//       try {
//         await saveSubscription({
//           variables: { subscription: saveSubscriptionData },
//           onCompleted: (res) => {
//             setSaveResultId(res.saveSubscription.id);

//             // If editing, navigate away
//             if (isEditSubscription) {
//               navigation.navigate(SubscriptionDetailsScreenRoute, {
//                 subscriptionId: saveResultId,
//                 isActive: true,
//               });
//             } else {
//               setIsAddAnotherVisible(true);
//               mixpanel?.track("ManualSubAdd", { ...saveSubscriptionData });
//               setIsSavingSubscription(false);
//             }
//           },
//           onError: (error) => {
//             setIsSavingSubscription(false);
//             Crashlytics().recordError(error as Error);
//           },
//         });
//       } catch (e) {
//         setIsSavingSubscription(false);
//         Crashlytics().recordError(e as Error);
//         invertState(setIsErrorVisible);
//       }
//     }
//   };

//   const onTypePress = (type: SubCategoryResult): void => {
//     setContextMerchant(undefined);
//     setSelectedSubCategory(type);
//   };

//   const onAddManual = () => {
//     invertState(setIsAddAnotherVisible);
//     navigation.navigate(SubscriptionDetailsScreenRoute, {
//       subscriptionId: saveResultId,
//       isActive: true,
//     });
//   };

//   const onAddAnotherManual = () => {
//     invertState(setIsAddAnotherVisible);

//     navigation.navigate(NewSubscriptionProvidersRoute, {});
//   };

//   const onFrequencyPress = (frequency: SubscriptionPriceTypeEnum): void =>
//     setSelectedFrequency(frequency);

//   const isFormInvalid = (): boolean =>
//     isEditSubscription
//       ? !formState.isValid || !selectedSubCategory
//       : !formState.isValid || !selectedSubCategory || !nextPaymentDateSelected;

//   const takeUserToCategoryPage = useCallback(() => {
//     navigation.navigate(
//       NewSubscriptionCategoryRoute as any,
//       {
//         provider: route.params.customValue,
//         isEditSubscription,
//       } as never
//     );
//   }, [navigation, route.params.customValue, isEditSubscription]);

//   useEffect(() => {
//     (async () => {
//       try {
//         if (item) {
//           await getSubCategory({ variables: { SK: item.PK } });
//         }
//         if (subscriptionDetailsData) {
//           await getSubCategory({
//             variables: { SK: subscriptionDetailsData.category.PK },
//           });
//           setForm();
//         }
//       } catch (e) {
//         setIsErrorVisible(true);
//         Crashlytics().recordError(e as Error);
//       }
//     })();
//   }, [setForm, getSubCategory, subscriptionDetailsData, item]);

//   return (
//     <SafeAreaView>
//       <ScrollView style={styles().scrollViewBG}>
//         <NavigationHeader
//           title={!subscriptionDetailsData ? t("Add Subscription") : t("Edit Subscription")}
//           navigateBack={navigation.goBack}
//         />
//         <ScreenLayout safeAreaStyle={styles().screenLayout} withoutTopSafeArea>
//           {subCategoryLoading ? (
//             <View style={styles().activityIndicator}>
//               <ActivityIndicator />
//             </View>
//           ) : (
//             <View>
//               <View style={styles().inputGap}>
//                 <Typography fontWeight="bold1" marginBottom={12}>
//                   {t("Provider")}
//                 </Typography>
//                 {!subscriptionDetailsData?.subscriptionId ? (
//                   <TouchableOpacity
//                     testID={addSubscriptionForm.providerButtonId}
//                     style={styles().calendarButton}
//                     onPress={() =>
//                       navigation.navigate(NewSubscriptionProvidersRoute, {
//                         subscriptionDetailsData,
//                       })
//                     }
//                   >
//                     <Typography color={defaultTheme.palette.primary900}>
//                       {route.params.customValue?.name || contextMerchant?.name}
//                     </Typography>
//                   </TouchableOpacity>
//                 ) : (
//                   <StyledController
//                     control={control}
//                     name="name"
//                     isDisabled={!subscriptionDetailsData.subscriptionId}
//                     maxLength={24}
//                     placeholder="Subscription Name"
//                   />
//                 )}
//                 <Portal>
//                   <Modal
//                     visible={isSelectedSubCategoryOpen}
//                     contentContainerStyle={styles().modalContent}
//                     onDismiss={() => invertState(setIsSelectedSubCategoryOpen)}
//                   >
//                     <ScrollView testID={addSubscriptionForm.typeModalScrollId}>
//                       {subCategoryData?.getSubCategory.map((subCategory) => (
//                         <View key={subCategory.SK}>
//                           <TouchableOpacity
//                             style={
//                               styles({ isSelected: selectedSubCategory?.name === subCategory.name })
//                                 .listItem
//                             }
//                             onPress={() => {
//                               onTypePress(subCategory);
//                               invertState(setIsSelectedSubCategoryOpen);
//                             }}
//                           >
//                             <Typography fontWeight="medium1" textTransform="capitalize">
//                               {subCategory.name}
//                             </Typography>
//                           </TouchableOpacity>
//                         </View>
//                       ))}
//                     </ScrollView>
//                   </Modal>
//                 </Portal>
//               </View>
//               <Typography fontWeight="bold1" marginBottom={12}>
//                 {t("Type")}
//               </Typography>
//               <DropDownButton
//                 onPress={takeUserToCategoryPage}
//                 selectedOption={selectedSubCategory?.name}
//                 isDisabled={
//                   !isSubscriptionManual ||
//                   (route.params.subscriptionDetailsData?.merchant.id !== "CUSTOM" &&
//                     !route.params.customValue)
//                 }
//                 testID={addSubscriptionForm.typeButtonId}
//                 accessibilityLabel="Select a category"
//               />
//               <View style={styles().costAndFrequencyText}>
//                 <View style={styles().costFlex}>
//                   <Typography fontWeight="bold1" marginBottom={6}>
//                     {t("Cost (GBP)")}
//                   </Typography>
//                 </View>
//                 <View style={styles().frequencyFlex}>
//                   <Typography fontWeight="bold1" marginBottom={10}>
//                     {t("Payments frequency")}
//                   </Typography>
//                 </View>
//               </View>
//               <View style={styles().costAndFrequencyFields}>
//                 <View style={styles().costFlex}>
//                   <StyledController
//                     control={control}
//                     name="cost"
//                     placeholder="Cost"
//                     costInput
//                     applyCostValidationRule
//                     maxLength={getValues().cost.includes(".") ? 9 : 6}
//                     style={styles().costControllerText}
//                     isDisabled={!isSubscriptionManual}
//                     testID={addSubscriptionForm.costInputId}
//                   />
//                   <ValidationError error={errors.cost} dynamicValue={{ maxNameLength }} />
//                 </View>
//                 <View style={[styles().frequencyFlex, styles().frequencyField]}>
//                   <DropDownButton
//                     selectedOption={selectedFrequency}
//                     isOpen={isFrequencyOpen}
//                     onPress={() => invertState(setIsFrequencyOpen)}
//                     isDisabled={!isSubscriptionManual}
//                     testID={addSubscriptionForm.paymentsFrequencyButtonId}
//                     accessibilityLabel="Pick a renewal frequency"
//                   />
//                   <Portal>
//                     <Modal
//                       visible={isFrequencyOpen}
//                       contentContainerStyle={styles().modalContent}
//                       onDismiss={() => invertState(setIsFrequencyOpen)}
//                       // style={styles().modalSize}
//                     >
//                       <ScrollView testID={addSubscriptionForm.frequencyModalScrollId}>
//                         {Object.values(SubscriptionPriceTypeEnum).map((value) => (
//                           <View key={value}>
//                             <TouchableOpacity
//                               style={styles({ isSelected: selectedFrequency === value }).listItem}
//                               onPress={() => {
//                                 onFrequencyPress(value);
//                                 invertState(setIsFrequencyOpen);
//                               }}
//                             >
//                               <Typography fontWeight="medium1" textTransform="capitalize">
//                                 {value}
//                               </Typography>
//                             </TouchableOpacity>
//                           </View>
//                         ))}
//                       </ScrollView>
//                     </Modal>
//                   </Portal>
//                 </View>
//               </View>
//               <View style={[styles().calendarInput]}>
//                 <Typography fontWeight="bold1" marginBottom={12}>
//                   {t("Next payment date")}
//                 </Typography>
//                 <TouchableOpacity
//                   onPress={() => invertState(setIsCalendarOpenForNextPayment)}
//                   style={styles().calendarButton}
//                   testID={addSubscriptionForm.renewalDateButtonId}
//                   accessibilityLabel="Pick a renewal date"
//                 >
//                   <Icon
//                     name="calendar"
//                     size={24}
//                     color={defaultTheme.palette.grey400}
//                     style={styles().calendarIcon}
//                   />
//                   <Typography color={defaultTheme.palette.primary900}>
//                     {nextPaymentDateSelected || isEditSubscription
//                       ? moment(renewalDate).format("DD MMMM YYYY")
//                       : "Select next payment date"}
//                   </Typography>
//                 </TouchableOpacity>
//                 <DatePicker
//                   date={renewalDate}
//                   locale={languageTag}
//                   maximumDate={new Date("2050-01-01")}
//                   minimumDate={new Date(minDate.format())}
//                   modal
//                   mode="date"
//                   open={isCalendarOpenForNextPayment}
//                   theme={
//                     Appearance.getColorScheme() === "dark"
//                       ? "dark"
//                       : Appearance.getColorScheme() === "light"
//                         ? "light"
//                         : "auto"
//                   }
//                   textColor={
//                     Appearance.getColorScheme() === "dark"
//                       ? "#FFFFFF"
//                       : Appearance.getColorScheme() === "light"
//                         ? defaultTheme.colors.text
//                         : "#888888"
//                   }
//                   title={t("Select renewal/ end date")}
//                   testID={addSubscriptionForm.datePickerId}
//                   onConfirm={(date) => {
//                     setNextPaymentDateSelected(true);
//                     invertState(setIsCalendarOpenForNextPayment);
//                     setRenewalDate(date);
//                   }}
//                   cancelText="Clear"
//                   onCancel={() => {
//                     setNextPaymentDateSelected(false);
//                     invertState(setIsCalendarOpenForNextPayment);
//                   }}
//                 />
//               </View>

//               <View style={[styles().calendarInput, { marginBottom: 20 }]}>
//                 <Typography fontWeight="bold1" marginBottom={12}>
//                   {`${t("Contract end date")} (optional)`}
//                 </Typography>
//                 <TouchableOpacity
//                   onPress={() => invertState(setIsCalendarOpenForContractEnd)}
//                   style={styles().calendarButton}
//                   testID={addSubscriptionForm.renewalDateButtonId}
//                   accessibilityLabel="Pick a renewal date"
//                 >
//                   <Icon
//                     name="calendar"
//                     size={24}
//                     color={defaultTheme.palette.grey400}
//                     style={styles().calendarIcon}
//                   />
//                   <Typography color={defaultTheme.palette.primary900}>
//                     {contractEndDateSelected
//                       ? moment(contractEndDate).format("DD MMMM YYYY")
//                       : "Select contract end date"}
//                   </Typography>
//                 </TouchableOpacity>
//                 <DatePicker
//                   date={contractEndDate}
//                   locale={languageTag}
//                   maximumDate={new Date("2050-01-01")}
//                   minimumDate={new Date(minDate.format())}
//                   modal
//                   mode="date"
//                   theme={
//                     Appearance.getColorScheme() === "dark"
//                       ? "dark"
//                       : Appearance.getColorScheme() === "light"
//                         ? "light"
//                         : "auto"
//                   }
//                   textColor={
//                     Appearance.getColorScheme() === "dark"
//                       ? "#FFFFFF"
//                       : Appearance.getColorScheme() === "light"
//                         ? defaultTheme.colors.text
//                         : "#888888"
//                   }
//                   open={isCalendarOpenForContractEnd}
//                   title={t("Select renewal/ end date")}
//                   testID={addSubscriptionForm.datePickerId}
//                   onConfirm={(date) => {
//                     setContractendDateSelected(true);
//                     invertState(setIsCalendarOpenForContractEnd);
//                     setContractEndDate(date);
//                   }}
//                   cancelText="Clear"
//                   onCancel={() => {
//                     setContractendDateSelected(false);
//                     invertState(setIsCalendarOpenForContractEnd);
//                   }}
//                 />
//               </View>

//               <Typography color={defaultTheme.colors.accent} fontWeight="bold2">
//                 {t("Free Trial?")}
//               </Typography>

//               <View style={styles().freeTrialContainer}>
//                 <View style={styles().switchContainer}>
//                   <Switch
//                     value={isSwitchOn}
//                     onValueChange={() => invertState(setIsSwitchOn)}
//                     color={defaultTheme.colors.accent}
//                     testID={addSubscriptionForm.freeTrialSwitchId}
//                     accessibilityLabel="Change free trial state"
//                   />
//                 </View>
//                 <View style={styles().switchDescription}>
//                   <Typography
//                     fontWeight="medium2"
//                     color={defaultTheme.palette.black}
//                     lineHeight="medium"
//                   >
//                     {t("If this is a free trial\ncheck the button")}
//                   </Typography>
//                 </View>
//                 <View style={{ marginTop: 3 }}>
//                   <TouchableOpacity
//                     onPress={onModal}
//                     style={[styles().infoButton, { backgroundColor: "rgba(231,48,133,0.3)" }]}
//                   >
//                     <Typography
//                       fontWeight="bold2"
//                       fontSize="body3"
//                       color={defaultTheme.palette.white}
//                     >
//                       ?
//                     </Typography>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//               <Portal>
//                 <Modal
//                   visible={infoModalVisible}
//                   dismissable
//                   onDismiss={onModal}
//                   contentContainerStyle={styles().modalContainer}
//                 >
//                   <View style={styles().modalView}>
//                     <Typography textAlign="center">
//                       {
//                         "If you want Little Birdie to remind you when your free trial is coming to an end, add the date in the 'contract end date' field and we'll send you a reminder"
//                       }
//                     </Typography>
//                   </View>
//                 </Modal>
//               </Portal>
//             </View>
//           )}
//           <View style={styles().saveButton}>
//             <Button
//               title="Save"
//               onPress={isAHighValue() ? warnBeforeSave : handleSubmit(onSave)}
//               testID={addSubscriptionForm.saveButtonId}
//               disabled={isFormInvalid() || isSavingSubscription}
//               loading={isSavingSubscription}
//             />
//           </View>
//           <StyledModal
//             visible={isErrorVisible}
//             onButtonPress={() => {
//               invertState(setIsErrorVisible);
//             }}
//             variant={ModalVariants.Oops}
//           />
//           <StyledModal
//             visible={nextPaymentErrorModalVisible}
//             onButtonPress={() => {
//               invertState(setNextPaymentErrorModalVisible);
//             }}
//             variant={ModalVariants.NextPaymentDateErrorModal}
//           />
//           <StyledModal
//             visible={isAddAnotherVisible}
//             buttonsDisplay="block"
//             onButtonPress={onAddAnotherManual}
//             onButtonPressSecondary={onAddManual}
//             variant={ModalVariants.AddAnotherSubModal}
//           />
//           <StyledModal
//             visible={isHighCostWarningVisible}
//             onButtonPress={handleSubmit(onSave)}
//             buttonsDisplay="inline"
//             dynamicFont
//             onButtonPressSecondary={() => {
//               invertState(setIsHighCostWarningVisible);
//             }}
//             variant={ModalVariants.HighCostModal}
//           />
//         </ScreenLayout>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
// export default NewSubscriptionForm;
