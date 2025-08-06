import { atom, useAtom } from "jotai";
import axios from "axios";
const api = "http://37.27.29.18:8001/api/to-dos";
export const dataAtom = atom([]);

export const getDataAtom = atom(null, async (get, set) => {
  let { data } = await axios.get(api);
  set(dataAtom, data?.data);
});

export const addDataAtom = atom(null, async (get, set, { formData }) => {
  await axios.post(api, formData);
  const { data } = await axios.get(api);
  set(dataAtom, data?.data);
});

export const deleteDataAtom = atom(null, async (get, set, { id }) => {
  await axios.delete(`${api}?id=${id}`);
  const current = get(dataAtom);
  const newData = current.filter((e) => e.id != id);
  set(dataAtom, newData);
});

export const editDataAtom = atom(null, async (get, set, { updated }) => {
  await axios.put(api, updated);
  const current = get(dataAtom);
  const newData = current.map((e) => {
    if (e.id === updated.id) {
      return {
        ...e,
        ...updated,
      };
    }
    return e;
  });
  set(dataAtom, newData);
});

export const addImageAtom = atom(null, async (get, set, { id, form }) => {
  await axios.post(`${api}/${id}/images`, form);
  const { data } = await axios.get(api);
  set(dataAtom, data?.data);
});

export const deleteImageAtom = atom(null, async (get, set, { id }) => {
  await axios.delete(`${api}/images/${id}`);
  const current = get(dataAtom);
  const newData = current.filter((e) => e.id != id);
  set(dataAtom, newData);
});
