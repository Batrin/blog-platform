import { format } from 'date-fns';

export default class DataTransform {
  trimText(text, wordCount) {
    if (text) {
      const textWordArr = text.split(' ');
      const shortText = textWordArr.slice(0, wordCount).join(' ');
      if (textWordArr.length < wordCount) {
        return shortText;
      }
      return `${shortText}...`;
    }
    return text;
  }

  transformDate(date) {
    const newDate = new Date(date);
    return format(newDate, 'MMMM d, yyyy');
  }
}
