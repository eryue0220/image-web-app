import axios from 'axios';
import { host, messages } from '../constants';

export async function save(data) {
  try {
    const form = new FormData();
    form.append('file', data);
    const res = await axios.post(`${host}/image`, form);
    if (res.status !== 200) {
      alert(messages.uploadeError);
    }
    return res;
  } catch (e) {
    alert(messages.uploadeError);
  }
}
