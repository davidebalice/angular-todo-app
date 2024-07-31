// Invoice Widget Model
export interface InvoiceWidgetModel {
  id: any;
  count: string;
  title: string;
  img: string;
  bg_color: string;
}

// Invoice List Model
export interface InvoiceListModel {
  id: any;
  invoice_no: string;
  profile: string;
  name: string;
  date: string;
  amount: string;
  status: string;
}

