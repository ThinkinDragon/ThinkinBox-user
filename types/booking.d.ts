import { trip_address } from './booking.d';

export interface latLng {
  lat: number; 
  lng: number;
}

export interface BookingState {
  bookings: Booking[],
  booking: Booking,
  provider: Provider,
  chat: ChatElement[]
}

export interface items {
  items:item[];
}
export interface item {
  id:number,
  description: string,
  rate: string,
  qty: string,
  amount: number,
  edit: boolean,
}


export type trip_addresses = trip_address[]

export interface trip_address {
  id: string,
  comments: string,
  rate: string,
  qty: number,
  amount: number,
  weight: number,
  image:string,
  edit: boolean,
  pick_meta: user_address,
  drop_meta: user_address,
  address: string,
  latitude: number,
  longitude: number,
  items: Array<item>,
  status: number,
}

export interface user_address {
  name: string,
  phone: string,
  address: string,
  latitude: number,
  longitude: number,
}

export interface Track {
  route: string,
  user: Coordinates,
  provider: Coordinates,
}

export interface Coordinates {
  latitude: number,
  longitude: number,
}

export interface Booking {
  id:                    number;
  booking_id:            string;
  user_id:               number;
  braintree_nonce:       null;
  provider_id:           number;
  current_provider_id:   number;
  service_type_id:       number;
  promocode_id:          number;
  price:                 number;
  invoice_item:          null;
  geo_time:              null;
  before_image:          null;
  before_comment:        null;
  after_image:           null;
  after_comment:         null;
  driver_accept_time:    null;
  driver_reached_time:   null;
  arrival_estimate_time: null;
  eta_discount:          number;
  status:                Status | string;
  service_required:      string;
  cancelled_by:          string;
  cancel_reason:         null;
  night_fare:            string;
  payment_mode:          string;
  paid:                  number;
  is_track:              string;
  estimated_fare:        number;
  distance:              number;
  travel_time:           null;
  unit:                  string;
  otp:                   string;
  geo_fencing_distance:  number;
  geo_fencing_id:        number;
  s_address:             string;
  s_latitude:            number;
  s_longitude:           number;
  d_address:             string;
  d_latitude:            number;
  d_longitude:           number;
  track_distance:        number;
  track_latitude:        number;
  track_longitude:       number;
  destination_log:       string;
  trip_address:  trip_addresses| string;
  is_drop_location:      number;
  is_instant_ride:       number;
  is_dispute:            number;
  assigned_at:           string;
  schedule_at:           string;
  started_at:            null;
  finished_at:           null;
  is_scheduled:          string;
  user_rated:            number;
  provider_rated:        number;
  use_wallet:            number;
  surge:                 number;
  route_key:             string;
  nonce:                 null;
  broadcast:             string;
  invoice_email:         null;
  ride_option:           string;
  type:                  string;
  deleted_at:            null;
  created_at:            string;
  updated_at:            string;
  payment:               null;
  service_type:          ServiceType;
  provider:              Provider;
  user:                  User;
  rating:                null;
  chat:                 ChatElement[];
}

export interface Provider {
  id:                 number;
  first_name:         string;
  last_name:          string;
  agent_id:           null;
  email:              string;
  gender:             string;
  geo_fencing_id:     null;
  latitude:           number;
  longitude:          number;
  address:            null;
  otp:                number;
  language:           string;
  avatar:             null;
  country_code:       null;
  mobile:             string;
  password:           string;
  blocked:            string;
  verified:           string;
  status:             string;
  stripe_acc_id:      null;
  stripe_cust_id:     null;
  paypal_email:       null;
  login_by:           string;
  social_unique_id:   null;
  wallet_balance:     number;
  referral_unique_id: null;
  qrcode_url:         null;
  deleted_at:         null;
  remember_token:     null;
  created_at:         string;
  updated_at:         string;
  rating:             number;
}

export interface ServiceType {
  id:          number;
  parent_id:   number;
  name:        Name;
  image:       string;
  marker:      string;
  fixed:       number;
  price:       number;
  type_price:  number;
  calculator:  string;
  description: null;
  status:      number;
  deleted_at:  null;
  created_at:  string;
  updated_at:  string;
  rating:      number;
}

enum Status {
  SETUP,SEARCHING,CANCELLED,ACCEPTED,STARTED,ARRIVED,PICKEDUP,DROPPED,COMPLETED,SCHEDULED,SCHEDULES
};

export interface Name {
  en: string;
}

export interface User {
  id:                 number;
  first_name:         string;
  last_name:          string;
  email:              string;
  payment_mode:       string;
  user_type:          string;
  gender:             string;
  country_code:       null;
  mobile:             string;
  device_token:       string;
  device_id:          string;
  device_type:        string;
  login_by:           string;
  language:           string;
  qrcode_url:         null;
  referral_unique_id: null;
  referal_count:      number;
  trial_ends_at:      null;
  avatar:             null;
  social_unique_id:   null;
  latitude:           null;
  longitude:          null;
  stripe_cust_id:     null;
  wallet_balance:     number;
  otp:                number;
  email_verified_at:  string;
  blocked:            string;
  deleted_at:         null;
  created_at:         string;
  updated_at:         string;
  rating:             number;
}

// Generated by https://quicktype.io

export interface SingleBooking {
  data:                   Data;
  sos:                    string;
  cash:                   number;
  debit_machine:          number;
  voucher:                number;
  online:                 number;
  card:                   number;
  currency:               string;
  stripe_secret_key:      string;
  stripe_publishable_key: string;
  stripe_currency:        null;
}

export interface Data {
  id:                    number;
  booking_id:            string;
  user_id:               number;
  braintree_nonce:       null;
  provider_id:           number;
  current_provider_id:   number;
  service_type_id:       number;
  promocode_id:          number;
  price:                 number;
  invoice_item:          null;
  geo_time:              null;
  before_image:          null;
  before_comment:        null;
  after_image:           null;
  after_comment:         null;
  driver_accept_time:    null;
  driver_reached_time:   null;
  arrival_estimate_time: null;
  eta_discount:          number;
  status:                string;
  service_required:      string;
  cancelled_by:          string;
  cancel_reason:         null;
  night_fare:            string;
  payment_mode:          string;
  paid:                  number;
  is_track:              string;
  estimated_fare:        number;
  distance:              number;
  travel_time:           null;
  unit:                  string;
  otp:                   string;
  geo_fencing_distance:  number;
  geo_fencing_id:        number;
  s_address:             string;
  s_latitude:            number;
  s_longitude:           number;
  d_address:             string;
  d_latitude:            number;
  d_longitude:           number;
  track_distance:        number;
  track_latitude:        number;
  track_longitude:       number;
  destination_log:       string;
  is_drop_location:      number;
  is_instant_ride:       number;
  is_dispute:            number;
  assigned_at:           string;
  schedule_at:           null;
  started_at:            null;
  finished_at:           null;
  is_scheduled:          string;
  user_rated:            number;
  provider_rated:        number;
  use_wallet:            number;
  surge:                 number;
  route_key:             string;
  nonce:                 null;
  broadcast:             string;
  invoice_email:         null;
  ride_option:           string;
  type:                  string;
  deleted_at:            null;
  created_at:            string;
  updated_at:            string;
  ride_otp:              number;
  ride_toll:             number;
  reasons:               Reason[];
}

export interface Reason {
  id:         number;
  reason:     string;
  for:        string;
  status:     string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
}

export interface ChatElement {
  id:            number;
  request_id:    number;
  chatable_type: ChatableType;
  chatable_id:   number;
  message:       string;
  url:           null;
  type:          Type;
  send_at:       string;
  delivered_at:  null;
  read_at:       null;
  created_at:    string;
  updated_at:    string;
}

export enum ChatableType {
  Provider = "provider",
  User = "user",
}

export enum Type {
  Pu = "pu",
  Up = "up",
}
