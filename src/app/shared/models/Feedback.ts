export interface Feedback {
  textFeedback: string;
  rating: number;
  userId: string;
  type: string;
  isRecommended: boolean;
  createdOn: Date | string;
}
