import { defineNuxtPlugin } from '#app';
import {Rate,Popup , Calendar, Row, Col, Icon, Image, CouponCell, CouponList, Cell, CellGroup, Swipe, SwipeItem, ShareSheet, PullRefresh, NavBar, Grid, GridItem, Uploader, Step, Tab, Tabs, Steps, DatetimePicker, Overlay  } from 'vant';
import { Locale } from 'vant';
import enUS from 'vant/es/locale/lang/en-US';
import Notifications from 'notiwind'
import { defineCustomElements } from '@stripe-elements/stripe-elements/loader';
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

export default defineNuxtPlugin((nuxtApp) => {
  defineCustomElements();
  Locale.use('en-US', enUS);
  nuxtApp.vueApp
    .use(Row).use(Swipe).use(SwipeItem).use(Popup).use(CouponCell).use(CouponList)
    .use(Col).use(NavBar).use(Step).use(Notifications).use(Overlay).use(Rate)
    .use(Icon).use(GridItem).use(Tab).use(DatetimePicker).use(ShareSheet).use(VueTelInput)
    .use(Cell).use(Uploader).use(Tabs).use(Calendar);
});