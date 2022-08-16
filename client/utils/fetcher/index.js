import axios from "axios";

export const getData = async (url) => {
  return await axios.get(url, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      // authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const addData = async (url, token) => {
  return await axios.post(url, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const updateData = async (url, token) => {
  return await axios.patch(url, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const upsertData = async (url, token) => {
  return await axios.post(url, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
  });
};

export const deleteData = async (url, token) => {
  return await axios.delete(url, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
