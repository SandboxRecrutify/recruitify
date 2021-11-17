export interface Feedback {
  textFeedback: string;
  rating: number;
  userId: string;
  type: number;
  isRecommended: boolean;
  createdOn: Date | string;
}
