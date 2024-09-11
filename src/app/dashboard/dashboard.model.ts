// Recent Problems Model
export interface problemsModel {
  id: any;
  img: string;
  title: string;
  link: string;
  btn: string;
  btn_color: string;
}

// Last Activity Model
export interface activityModel {
  id: any;
  title: string;
  content: string;
}

// User Review Model
export interface userReviewModel {
  id: any;
  img: string;
  author: string;
  duration: string;
  content: string;
  status?: string;
}
