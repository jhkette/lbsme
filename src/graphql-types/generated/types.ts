export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AccountDetailsType = {
  __typename?: 'AccountDetailsType';
  identification: Scalars['String']['output'];
  name: Scalars['String']['output'];
  schemeName: Scalars['String']['output'];
  secondaryIdentification?: Maybe<Scalars['String']['output']>;
};

export type AccountType = {
  __typename?: 'AccountType';
  details: Array<AccountDetailsType>;
  nickName: Scalars['String']['output'];
  subType: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type Administrator = {
  __typename?: 'Administrator';
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  enabled?: Maybe<Scalars['Boolean']['output']>;
  familyName?: Maybe<Scalars['String']['output']>;
  givenName?: Maybe<Scalars['String']['output']>;
  groupName: Scalars['String']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
};

export type AssignedCategory = {
  __typename?: 'AssignedCategory';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  category: Scalars['String']['output'];
  searchCategory: Scalars['String']['output'];
  searchSubCategory: Scalars['String']['output'];
  subCategory: Scalars['String']['output'];
};

export type AssignedCategoryV2 = {
  __typename?: 'AssignedCategoryV2';
  l1: Scalars['String']['output'];
  l2: Scalars['String']['output'];
};

export type BankAccountLinkDetails = {
  __typename?: 'BankAccountLinkDetails';
  daysLeft: Scalars['Int']['output'];
  linkedForDays: Scalars['Int']['output'];
};

export type BankAccountResultType = {
  __typename?: 'BankAccountResultType';
  account: AccountType;
  accountId: Scalars['String']['output'];
  currency: Scalars['String']['output'];
  lastSynced: Scalars['String']['output'];
  linkDetails: BankAccountLinkDetails;
  provider: ProviderResult;
  status: BankAccountStatusEnum;
  subAccount: Array<SubAccountType>;
};

export enum BankAccountStatusEnum {
  Active = 'Active',
  Expired = 'Expired'
}

export type BarChartData = {
  __typename?: 'BarChartData';
  averageCost: Scalars['Float']['output'];
  data: Array<ChartData>;
  maxCost: Scalars['Float']['output'];
  middleCost: Scalars['Float']['output'];
};

export enum CancellationStatusEnum {
  CancellationFailed = 'CANCELLATION_FAILED',
  Completed = 'COMPLETED',
  Initiated = 'INITIATED',
  InProgress = 'IN_PROGRESS'
}

export type CategoryInput = {
  PK: Scalars['String']['input'];
  SK: Scalars['String']['input'];
};

export type CategoryResult = {
  __typename?: 'CategoryResult';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  name: Scalars['String']['output'];
  searchName: Scalars['String']['output'];
};

export type ChartData = {
  __typename?: 'ChartData';
  period: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export enum ConnectedEnum {
  Completed = 'Completed',
  Failed = 'Failed',
  InProgress = 'inProgress'
}

export type Cost = {
  __typename?: 'Cost';
  monthly: Scalars['Float']['output'];
  weekly: Scalars['Float']['output'];
  yearly: Scalars['Float']['output'];
};

export type CreateAdministratorInput = {
  email: Scalars['String']['input'];
  familyName: Scalars['String']['input'];
  givenName: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export enum CreditDebitIndicator {
  Credit = 'Credit',
  Debit = 'Debit'
}

export type CustomerDataResult = {
  __typename?: 'CustomerDataResult';
  earliestTransactionDate?: Maybe<Scalars['String']['output']>;
  notificationPreferences: Array<NotificationChannelTypeEnum>;
};

export type Dates = {
  __typename?: 'Dates';
  lastPayment?: Maybe<Scalars['String']['output']>;
  renewal: Scalars['String']['output'];
  renewalTimestamp: Scalars['Float']['output'];
};

export type DealCategory = {
  __typename?: 'DealCategory';
  category: Scalars['String']['output'];
  deals: Array<GetAllDealsResult>;
};

export type DeleteAdministratorDeal = {
  __typename?: 'DeleteAdministratorDeal';
  delete: Scalars['Boolean']['output'];
};

export type DeleteManualSubscriptionResult = {
  __typename?: 'DeleteManualSubscriptionResult';
  success: Scalars['Boolean']['output'];
};

export type DynamoDbPaginationAdminResult = {
  __typename?: 'DynamoDBPaginationAdminResult';
  items: Array<GetAdministratorDealsResult>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type DynamoDbPaginationResult = {
  __typename?: 'DynamoDBPaginationResult';
  items: Array<GetDealsResult>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export enum EventType {
  Error = 'ERROR',
  Info = 'INFO'
}

export type FeaturedDealsResult = {
  __typename?: 'FeaturedDealsResult';
  category: Array<SubCategoryResult>;
  icon: Scalars['String']['output'];
  name: Scalars['String']['output'];
  saveUp?: Maybe<Scalars['Float']['output']>;
};

export type FreeTrialsResult = {
  __typename?: 'FreeTrialsResult';
  items: Array<GetFreeTrialsResult>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type GetAdministratorDealsResult = {
  __typename?: 'GetAdministratorDealsResult';
  SK: Scalars['String']['output'];
  currency: Scalars['String']['output'];
  description: Scalars['String']['output'];
  isManual: Scalars['Boolean']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  url: Scalars['String']['output'];
};

export type GetAllDealsResult = {
  __typename?: 'GetAllDealsResult';
  assignedCategory: AssignedCategory;
  currency: Scalars['String']['output'];
  description: Scalars['String']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  provider: Scalars['String']['output'];
  summary: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GetDealsResult = {
  __typename?: 'GetDealsResult';
  currency: Scalars['String']['output'];
  description: Scalars['String']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  url: Scalars['String']['output'];
};

export type GetFreeTrialsResult = {
  __typename?: 'GetFreeTrialsResult';
  assignedCategory: SubCategoryResult;
  description: Scalars['String']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GetNotificationsResult = {
  __typename?: 'GetNotificationsResult';
  SK: Scalars['String']['output'];
  content: Scalars['String']['output'];
  date: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type GetSubscriptionsResult = {
  __typename?: 'GetSubscriptionsResult';
  nextToken?: Maybe<Scalars['Int']['output']>;
  subscriptions?: Maybe<Array<Subscription>>;
};

export type ListUsersResult = {
  __typename?: 'ListUsersResult';
  nextToken?: Maybe<Scalars['String']['output']>;
  users: Array<User>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  id: Scalars['String']['output'];
};

export type Merchant = {
  __typename?: 'Merchant';
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type MerchantInput = {
  icon?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type MerchantResultV2 = {
  __typename?: 'MerchantResultV2';
  SK: Scalars['String']['output'];
  category?: Maybe<CategoryResult>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  subCategory: Scalars['String']['output'];
};

export type MerchantV2 = {
  __typename?: 'MerchantV2';
  id: Scalars['String']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAdministratorAccount?: Maybe<Administrator>;
  createMinnaUser?: Maybe<CreateMinnaUserResult>;
  deleteAdministratorDeal: DeleteAdministratorDeal;
  deleteManualSubscriptions?: Maybe<DeleteManualSubscriptionResult>;
  fetchCancellationStatus?: Maybe<FetchCancellationStatusResult>;
  fetchMinnaWebUI?: Maybe<FetchMinnaWebUiResult>;
  login?: Maybe<LoginResponse>;
  markNotificationsAsRead?: Maybe<Scalars['Boolean']['output']>;
  saveAdministratorDeal: SaveAdministratorDeal;
  saveDeal: Scalars['Boolean']['output'];
  saveNotificationPreferences?: Maybe<Scalars['Boolean']['output']>;
  savePushToken?: Maybe<Scalars['Boolean']['output']>;
  saveSubscription: SaveSubscriptionResult;
  sendEvent: Scalars['Boolean']['output'];
  updateNotificationSetting: Scalars['Boolean']['output'];
  updateUserDetails?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreateAdministratorAccountArgs = {
  data: CreateAdministratorInput;
};


export type MutationCreateMinnaUserArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteAdministratorDealArgs = {
  SK?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteManualSubscriptionsArgs = {
  status: SubscriptionStatusEnum;
  subscriptionId: Scalars['String']['input'];
};


export type MutationFetchCancellationStatusArgs = {
  cancellationId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationFetchMinnaWebUiArgs = {
  subscriptionId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationMarkNotificationsAsReadArgs = {
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationSaveAdministratorDealArgs = {
  SK?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSaveDealArgs = {
  input: SaveDealInput;
};


export type MutationSaveNotificationPreferencesArgs = {
  preferences: Array<NotificationChannelTypeEnum>;
};


export type MutationSavePushTokenArgs = {
  token: PustTokenInput;
};


export type MutationSaveSubscriptionArgs = {
  subscription: SaveSubscriptionInput;
};


export type MutationSendEventArgs = {
  name: Scalars['String']['input'];
};


export type MutationUpdateNotificationSettingArgs = {
  setting?: InputMaybe<UpdateNotificationSettingInput>;
};


export type MutationUpdateUserDetailsArgs = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postcode?: InputMaybe<Scalars['String']['input']>;
};

export type MutationResult = {
  __typename?: 'MutationResult';
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum NotificationChannelTypeEnum {
  EmailMoneysaving = 'EMAIL_MONEYSAVING',
  EmailSmartalerts = 'EMAIL_SMARTALERTS',
  InappMoneysaving = 'INAPP_MONEYSAVING',
  InappSmartalerts = 'INAPP_SMARTALERTS',
  PushMoneysaving = 'PUSH_MONEYSAVING',
  PushSmartalerts = 'PUSH_SMARTALERTS'
}

export type NotificationSettingType = {
  __typename?: 'NotificationSettingType';
  SK: NotificationTypeEnum;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export enum NotificationTypeEnum {
  LeftOrUnsubscribed = 'LEFT_OR_UNSUBSCRIBED',
  MonthlyAccountSummary = 'MONTHLY_ACCOUNT_SUMMARY',
  ObConnectionEndsDay_0 = 'OB_CONNECTION_ENDS_DAY_0',
  ObConnectionEndsDay_2 = 'OB_CONNECTION_ENDS_DAY_2',
  ObConnectionEndsDay_5 = 'OB_CONNECTION_ENDS_DAY_5',
  ObConnectionExpiredDay_7 = 'OB_CONNECTION_EXPIRED_DAY_7',
  PasswordReset = 'PASSWORD_RESET',
  PriceDecrease = 'PRICE_DECREASE',
  PriceIncrease = 'PRICE_INCREASE',
  Registration = 'REGISTRATION',
  RenewalDue = 'RENEWAL_DUE',
  SignedUpConnected_1Account = 'SIGNED_UP_CONNECTED_1_ACCOUNT',
  SignedUpNotConnectedDay_2 = 'SIGNED_UP_NOT_CONNECTED_DAY_2',
  SignedUpNotConnectedDay_5 = 'SIGNED_UP_NOT_CONNECTED_DAY_5',
  SignedUpNotConnectedDay_10 = 'SIGNED_UP_NOT_CONNECTED_DAY_10'
}

export type NotificationsPaginatedResult = {
  __typename?: 'NotificationsPaginatedResult';
  items: Array<GetNotificationsResult>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type NotificationsSettingsResult = {
  __typename?: 'NotificationsSettingsResult';
  items: Array<NotificationSettingType>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type ProviderData = {
  __typename?: 'ProviderData';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ProviderResult = {
  __typename?: 'ProviderResult';
  displayName: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  maintenanceStatus: Scalars['Boolean']['output'];
  providerId: Scalars['ID']['output'];
  regions: Array<Scalars['String']['output']>;
};

export enum PushTokenServiceEnum {
  Apns = 'APNS',
  ApnsSandbox = 'APNS_SANDBOX',
  Gcm = 'GCM'
}

export type PustTokenInput = {
  service: PushTokenServiceEnum;
  token: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  deleteAccount?: Maybe<Scalars['Boolean']['output']>;
  deleteBankAccount?: Maybe<Scalars['Boolean']['output']>;
  getAdministratorDeals: DynamoDbPaginationAdminResult;
  getAllDeals: Array<DealCategory>;
  getBankAccount: Array<BankAccountResultType>;
  getCategory: Array<CategoryResult>;
  getCustomerData: CustomerDataResult;
  getDeals: DynamoDbPaginationResult;
  getFeaturedDeals: Array<FeaturedDealsResult>;
  getMerchant?: Maybe<Array<MerchantResultV2>>;
  getNotifications: NotificationsPaginatedResult;
  getNotificationsSettings: NotificationsSettingsResult;
  getProviderlessUserAuthGateway?: Maybe<UserAuthGatewayResult>;
  getProviders: Array<ProviderResult>;
  getRefreshUserAuthGateway?: Maybe<UserAuthGatewayResult>;
  getStatusConnection: StatusConnectionResult;
  getSubCategory: Array<SubCategoryResult>;
  getSubscribedStatus: GetSubscribedStatusResult;
  getSubscription: SubscriptionDetails;
  getSubscriptionPeriod: GetSubscriptionPeriodResult;
  getSubscriptionSpendings: SubscriptionsSpendingsResult;
  getSubscriptions?: Maybe<GetSubscriptionsResult>;
  getSubscriptionsSummary: SubscriptionsSummaryResult;
  getTopDeals: Array<GetDealsResult>;
  getTrials: FreeTrialsResult;
  getUnreadNotificationsCount: Scalars['Int']['output'];
  getUpcomingRenewals: Array<UpcomingRenewals>;
  getUserAuthGateway: UserAuthGatewayResult;
  getUserCategories: Array<UserCategoryResult>;
  getUserLogs: UserLogsResult;
  listUsers: ListUsersResult;
  refreshTransaction?: Maybe<UserAuthGatewayResult>;
  sendWelcomeEmail?: Maybe<Scalars['Boolean']['output']>;
  setUserStatus?: Maybe<Scalars['Boolean']['output']>;
};


export type QueryDeleteAccountArgs = {
  username?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDeleteBankAccountArgs = {
  providerId: Scalars['String']['input'];
};


export type QueryGetAdministratorDealsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCategoryArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  withoutFreeTrials?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetDealsArgs = {
  category: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  subCategory: Scalars['String']['input'];
};


export type QueryGetMerchantArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  subCategory?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetNotificationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetNotificationsSettingsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<NotificationTypeEnum>;
};


export type QueryGetProvidersArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetSubCategoryArgs = {
  SK?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetSubscriptionArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSubscriptionSpendingsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  from: Scalars['String']['input'];
  to: Scalars['String']['input'];
};


export type QueryGetSubscriptionsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['Int']['input']>;
  sortKey?: InputMaybe<SubscriptionsSortKeyEnum>;
  status: SubscriptionStatusEnum;
};


export type QueryGetSubscriptionsSummaryArgs = {
  from: Scalars['String']['input'];
  to: Scalars['String']['input'];
};


export type QueryGetTrialsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserAuthGatewayArgs = {
  provider: Scalars['String']['input'];
};


export type QueryGetUserLogsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  type: EventType;
  userId: Scalars['String']['input'];
};


export type QueryListUsersArgs = {
  filter?: InputMaybe<UserFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySendWelcomeEmailArgs = {
  username?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySetUserStatusArgs = {
  status: Scalars['Boolean']['input'];
  userId: Scalars['String']['input'];
};

export type SaveAdministratorDeal = {
  __typename?: 'SaveAdministratorDeal';
  save: Scalars['Boolean']['output'];
};

export type SaveDealInput = {
  category: CategoryInput;
  freeTrial: Scalars['Boolean']['input'];
  merchant: MerchantInput;
};

export type SaveSubscriptionInput = {
  amount: Scalars['Float']['input'];
  category: CategoryInput;
  contractEndDate?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  freeTrial: Scalars['Boolean']['input'];
  merchant: MerchantInput;
  nextPaymentDate?: InputMaybe<Scalars['String']['input']>;
  renewalDate?: InputMaybe<Scalars['String']['input']>;
  subscriptionId?: InputMaybe<Scalars['ID']['input']>;
  type: SubscriptionPriceTypeEnum;
};

export type SaveSubscriptionResult = {
  __typename?: 'SaveSubscriptionResult';
  error?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type SpendingsDifference = {
  __typename?: 'SpendingsDifference';
  dataAvailable: Scalars['Boolean']['output'];
  value: Scalars['Float']['output'];
};

export type StatusConnectionResult = {
  __typename?: 'StatusConnectionResult';
  connected: ConnectedEnum;
  connectedAt: Scalars['String']['output'];
};

export type SubAccountType = {
  __typename?: 'SubAccountType';
  accountId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  indicator: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type SubCategoryResult = {
  __typename?: 'SubCategoryResult';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  name: Scalars['String']['output'];
  searchName: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  cancellationStatus?: Maybe<CancellationStatusEnum>;
  category?: Maybe<AssignedCategory>;
  dates: SubscriptionDates;
  displayName?: Maybe<Scalars['String']['output']>;
  freeTrial: Scalars['Boolean']['output'];
  merchant: Merchant;
  monthlyCost: Scalars['Float']['output'];
  paymentMethod?: Maybe<Scalars['String']['output']>;
  priceChange: Scalars['Float']['output'];
  providerName: Scalars['String']['output'];
  saveUp: Scalars['Float']['output'];
  status: SubscriptionStatusEnum;
  subscriptionId: Scalars['ID']['output'];
  type: SubscriptionPriceTypeEnum;
};

export type SubscriptionCategory = {
  __typename?: 'SubscriptionCategory';
  icon?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  share?: Maybe<Scalars['Float']['output']>;
  spent: Scalars['Float']['output'];
  usersAverage: Scalars['Float']['output'];
  usersShare: Scalars['Float']['output'];
};

export type SubscriptionCosts = {
  __typename?: 'SubscriptionCosts';
  amount: Scalars['Float']['output'];
  average_monthly?: Maybe<Scalars['Float']['output']>;
  monthly: Scalars['Float']['output'];
  priceChange: Scalars['Float']['output'];
  saveUp: Scalars['Float']['output'];
  totalRemaining?: Maybe<Scalars['Float']['output']>;
  totalSpent: Scalars['Float']['output'];
  yearly: Scalars['Float']['output'];
};

export type SubscriptionDates = {
  __typename?: 'SubscriptionDates';
  contractEndDate?: Maybe<Scalars['String']['output']>;
  endsInDays: Scalars['Int']['output'];
  endsInPercent?: Maybe<Scalars['Float']['output']>;
  lastPaymentDate: Scalars['String']['output'];
  nextPaymentDate?: Maybe<Scalars['String']['output']>;
  renewalDate: Scalars['String']['output'];
};

export type SubscriptionDetails = {
  __typename?: 'SubscriptionDetails';
  cancellationStatus?: Maybe<CancellationStatusEnum>;
  category: AssignedCategory;
  costs: SubscriptionCosts;
  dates: SubscriptionDates;
  displayName?: Maybe<Scalars['String']['output']>;
  freeTrial: Scalars['Boolean']['output'];
  isManual: Scalars['Boolean']['output'];
  merchant: Merchant;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  providerName?: Maybe<Scalars['String']['output']>;
  status: SubscriptionStatusEnum;
  subscriptionId: Scalars['ID']['output'];
  transactions?: Maybe<Array<Maybe<TransactionData>>>;
  type: SubscriptionPriceTypeEnum;
};

export enum SubscriptionPriceTypeEnum {
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  Weekly = 'weekly',
  Yearly = 'yearly'
}

export enum SubscriptionStatusEnum {
  Active = 'ACTIVE',
  AwaitPayment = 'AWAIT_PAYMENT',
  Deactive = 'DEACTIVE'
}

export type SubscriptionV2 = {
  __typename?: 'SubscriptionV2';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  categories?: Maybe<AssignedCategoryV2>;
  displayName: Scalars['String']['output'];
  merchant?: Maybe<MerchantV2>;
  period?: Maybe<SubscriptionPriceTypeEnum>;
  status?: Maybe<SubscriptionStatusEnum>;
  transactions?: Maybe<TransactionDataV2>;
};

export enum SubscriptionsSortKeyEnum {
  DealsSavings = 'DEALS_SAVINGS',
  FreeTrials = 'FREE_TRIALS',
  HighestCost = 'HIGHEST_COST',
  LowestCost = 'LOWEST_COST',
  Name = 'NAME',
  PriceIncrease = 'PRICE_INCREASE',
  RenewalDate = 'RENEWAL_DATE'
}

export type SubscriptionsSpendingsResult = {
  __typename?: 'SubscriptionsSpendingsResult';
  barChartData: BarChartData;
  cost: Cost;
  currency?: Maybe<Scalars['String']['output']>;
  lineChartData: Array<ChartData>;
  potentialSavings: Cost;
  spendingsDifference: SpendingsDifference;
  subscriptions?: Maybe<Array<Maybe<SubscriptionDetails>>>;
  subscriptionsCount: Scalars['Int']['output'];
};

export type SubscriptionsSummaryResult = {
  __typename?: 'SubscriptionsSummaryResult';
  categories: Array<SubscriptionCategory>;
  currency?: Maybe<Scalars['String']['output']>;
  totalSpent: Scalars['Float']['output'];
  usersAverageSpent?: Maybe<Scalars['Float']['output']>;
};

export type TransactionAmount = {
  __typename?: 'TransactionAmount';
  amount?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
};

export type TransactionData = {
  __typename?: 'TransactionData';
  accountID?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<TransactionAmount>;
  bookingTime?: Maybe<Scalars['String']['output']>;
  budId?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<ProviderData>;
  title?: Maybe<Scalars['String']['output']>;
  transactionId?: Maybe<Scalars['String']['output']>;
};

export type TransactionDataV2 = {
  __typename?: 'TransactionDataV2';
  account_id?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<TransactionAmount>;
  credit_debit_indicator?: Maybe<CreditDebitIndicator>;
  date?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  transaction_description?: Maybe<Scalars['String']['output']>;
  transaction_id?: Maybe<Scalars['String']['output']>;
};

export type UpcomingRenewals = {
  __typename?: 'UpcomingRenewals';
  amount: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  dates: Dates;
  merchant: Merchant;
  provider: Scalars['String']['output'];
};

export type UpdateNotificationSettingInput = {
  SK: NotificationTypeEnum;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type User = {
  __typename?: 'User';
  createdDate: Scalars['String']['output'];
  email: Scalars['String']['output'];
  enabled: Scalars['Boolean']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postcode?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type UserAuthGatewayResult = {
  __typename?: 'UserAuthGatewayResult';
  url: Scalars['String']['output'];
};

export type UserCategoryResult = {
  __typename?: 'UserCategoryResult';
  PK: Scalars['String']['output'];
  SK: Scalars['String']['output'];
  name: Scalars['String']['output'];
  searchName: Scalars['String']['output'];
};

export type UserFilter = {
  name: UserFilterType;
  value: Scalars['String']['input'];
};

export enum UserFilterType {
  Email = 'EMAIL',
  FirstName = 'FIRST_NAME',
  GroupName = 'GROUP_NAME',
  LastName = 'LAST_NAME'
}

export type UserLogResult = {
  __typename?: 'UserLogResult';
  message: Scalars['String']['output'];
  source: Scalars['String']['output'];
  stack?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['String']['output'];
  type?: Maybe<EventType>;
};

export type UserLogsResult = {
  __typename?: 'UserLogsResult';
  items: Array<UserLogResult>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type CreateMinnaUserResult = {
  __typename?: 'createMinnaUserResult';
  externalId?: Maybe<Scalars['String']['output']>;
};

export type FetchCancellationStatusResult = {
  __typename?: 'fetchCancellationStatusResult';
  status?: Maybe<Scalars['String']['output']>;
};

export type FetchMinnaWebUiResult = {
  __typename?: 'fetchMinnaWebUIResult';
  authToken?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  validTo?: Maybe<Scalars['String']['output']>;
};

export type GetSubscribedStatusResult = {
  __typename?: 'getSubscribedStatusResult';
  subscribed?: Maybe<Scalars['Boolean']['output']>;
};

export type GetSubscriptionPeriodResult = {
  __typename?: 'getSubscriptionPeriodResult';
  period?: Maybe<Scalars['String']['output']>;
};
