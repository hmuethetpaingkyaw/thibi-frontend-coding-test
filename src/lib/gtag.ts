// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export interface IEvent {
  action: any;
  category: string;
  label: string;
  value?: string;
}
export const pageview = (url: URL): void => {
  window.gtag('config', `${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: IEvent): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
