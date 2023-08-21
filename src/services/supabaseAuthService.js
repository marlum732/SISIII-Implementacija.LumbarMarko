import supabase from './supabaseClient';

export const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { user: data, error };
  };
  
export const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { user: data, error };
  };
  
