export interface Notifications {
  notification: Notification[];
}


export interface Notification {
  id:          number;
  notify_type: string;
  image:       string;
  description: string;
  click_url:   null;
  expiry_date: string;
  status:      string;
  created_at:  string;
  updated_at:  string;
}
