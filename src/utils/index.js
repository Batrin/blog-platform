import { format } from 'date-fns';

export default class DataTransform {
  trimText(text, wordCount) {
    const textWordArr = text.split(' ');
    const shortText = textWordArr.slice(0, wordCount).join(' ');
    if (textWordArr.length < wordCount) {
      return shortText;
    }
    return `${shortText}...`;
  }

  transformDate(date) {
    const newDate = new Date(date);
    return format(newDate, 'MMMM d, yyyy');
  }
}
